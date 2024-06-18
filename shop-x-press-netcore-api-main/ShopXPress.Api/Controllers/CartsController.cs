using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Controller;
using ShopXPress.Api.Exceptions;
using ShopXPress.Api.Services.Interfaces;

namespace ShopXPress.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "User")]
    public class CartsController : AuthorizedControllerBase
    {
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("User")]
        public async Task<CartContract> GetUserCart()
        {
            return await _cartService.GetUserActiveCart(CurrentUserId);
        }

        [HttpPost("AddProduct")]
        public async Task AddProduct([FromBody] ProductInCartContract cartDetail)
        {
            await _cartService.AddProductToCart(CurrentUserId, cartDetail);
        }

        [HttpPost("Checkout/{cartId}")]
        public async Task CheckoutCart([FromRoute]int cartId)
        {
            await _cartService.CheckoutCart(cartId, CurrentUserId);
        }

        [HttpPost("RemoveProduct/{cartId}/")]
        public async Task RemoveProductFromCart([FromRoute] int cartId, [FromBody] ProductInCartContract product)
        {
            if(product.Quantity <= 0)
            {
                throw new InvalidActionException("Quantity must more than 1.");
            }
            await _cartService.RemoveProductFromCart(CurrentUserId, cartId, product.ProductId, product.Quantity);
        }

    }
}
