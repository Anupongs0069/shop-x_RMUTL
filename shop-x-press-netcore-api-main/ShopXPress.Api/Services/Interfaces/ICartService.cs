using ShopXPress.Api.Contracts;

namespace ShopXPress.Api.Services.Interfaces;

public interface ICartService
{
    Task<CartContract> GetUserActiveCart(int userId);
    Task CheckoutCart(int cartId, int userId);
    Task AddProductToCart(int userId, ProductInCartContract cartDetail);
    Task RemoveProductFromCart(int userId, int cartId, int productId, int quantity);
}
