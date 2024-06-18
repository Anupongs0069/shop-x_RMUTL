using Microsoft.EntityFrameworkCore;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Entities;
using ShopXPress.Api.Entities.Database;
using ShopXPress.Api.Exceptions;
using ShopXPress.Api.Extensions;
using ShopXPress.Api.Services.Interfaces;

#nullable disable
namespace ShopXPress.Api.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDBContext _dbContext;

        public CartService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CheckoutCart(int cartId, int userId)
        {
            var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(c => c.UserId == userId);
            if (user == null)
            {
                throw new InvalidActionException("User could not be found.");
            }

            var cart = await _dbContext.Carts
                .Include(c => c.CartProducts)
                    .ThenInclude(c => c.Product)
                    .FirstOrDefaultAsync(c => c.UserId == userId && !c.Deleted);
            if (cart == null)
            {
                throw new InvalidActionException("Invalid cart checkout.");
            }
            cart.Deleted = true;

            var maxOrder = await _dbContext.Orders.AsNoTracking().OrderByDescending(c => c.OrderId).FirstOrDefaultAsync();
            string orderNumber = maxOrder != null ? (maxOrder.OrderId + 1).ToString().PadLeft(6, '0') : "1".PadLeft(6, '0');
            // Create an order from cart.
            var order = new Order
            {
                UserId = userId,
                OrderNumber = orderNumber,
                OrderProducts = cart.CartProducts.Select(c => new OrderProduct
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity
                }).ToList()
            };

            var payment = new OrderPayment
            {
                Order = order,
                TotalAmount = cart.CartProducts.Sum(c => c.Quantity * c.Product.Price)
            };

            var products = await _dbContext.Products.Where(c => cart.CartProducts.Select(p => p.ProductId).Contains(c.ProductId)).ToListAsync();
            foreach (var product in products)
            {
                // Reduce stock.
                product.InStock -= cart.CartProducts.FirstOrDefault(c => c.ProductId == product.ProductId)?.Quantity ?? 0;
            }

            _dbContext.OrdersPayments.Add(payment);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddProductToCart(int userId, ProductInCartContract cartDetail)
        {
            var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(c => c.UserId == userId);
            if(user == null)
            {
                throw new InvalidActionException("User could not be found.");
            }

            var cart = await _dbContext.Carts.Include(c => c.CartProducts).FirstOrDefaultAsync(c => c.UserId == userId && !c.Deleted);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CartProducts = new List<CartProduct>()
                };
                await _dbContext.Carts.AddAsync(cart);
            }

            if (cart.CartProducts.Any(c => c.ProductId == cartDetail.ProductId))
            {
                var product = cart.CartProducts.First(c => c.ProductId == cartDetail.ProductId);
                product.Quantity += cartDetail.Quantity;
            }
            else
            {
                cart.CartProducts.Add(new CartProduct { Quantity = cartDetail.Quantity, ProductId = cartDetail.ProductId });
            }

            await _dbContext.SaveChangesAsync();

        }

        public async Task<CartContract> GetUserActiveCart(int userId)
        {
            return await _dbContext.Carts.AsNoTracking().Where(c => c.UserId == userId && !c.Deleted).SelectTo<CartContract>().FirstOrDefaultAsync();
        }

        public async Task RemoveProductFromCart(int userId, int cartId, int productId, int quantity)
        {
            var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(c => c.UserId == userId);
            if (user == null)
            {
                throw new InvalidActionException("User could not be found.");
            }

            var cart = await _dbContext.CartProducts.FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId && c.Cart.UserId == userId && !c.Cart.Deleted);
            if (cart == null)
            {
                throw new InvalidActionException("Invalid cart checkout.");
            }
            cart.Quantity -= quantity;
            if (cart.Quantity <= 0)
            {
                _dbContext.CartProducts.Remove(cart);
            }

            // Restore stock back
            var product = await _dbContext.Products.FirstAsync(c => c.ProductId == productId);
            product.InStock += quantity;

            await _dbContext.SaveChangesAsync();
        }
    }
}
