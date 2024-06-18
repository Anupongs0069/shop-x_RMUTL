using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Controller;
using ShopXPress.Api.Services.Interfaces;

namespace ShopXPress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : AuthorizedControllerBase
    {

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [AllowAnonymous]
        [HttpGet("TopNew")]
        public async Task<List<ProductContract>> GetTopNewProducts(int maxRecord = 10)
        {
            return await _productService.GetTopNewProducts(maxRecord);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<List<ProductContract>> GetProducts(string? name, int? categoryId)
        {
            return await _productService.GetProducts(name, categoryId);
        }

        [HttpGet("{productId}")]
         [AllowAnonymous]
        public async Task<ProductContract> GetProductById([FromRoute] int productId)
        {
            return await _productService.GetProductById(productId);
        }

        [HttpPost("CreateProduct")]
        [Authorize(Roles = "Admin")]
        public async Task CreateProduct([FromBody] ProductContract product)
        {
            await _productService.CreateProduct(product);
        }

        [HttpPut("UpdateProduct/{productId}")]
         [Authorize(Roles = "Admin")]
        public async Task UpdateProduct([FromRoute] int productId, [FromBody] ProductContract product)
        {
            await _productService.UpdateProduct(productId, product);
        }

        [HttpDelete("DeleteProduct/{productId}")]
         [Authorize(Roles = "Admin")]
        public async Task DeleteProduct([FromRoute] int productId)
        {
            await _productService.DeleteProduct(productId);
        }

        [HttpGet("TopSpending")]
         [AllowAnonymous]
        public async Task<List<ProductContract>> GetTopSpendingProducts(int maxRecord = 10)
        {
            return await _productService.GetTopSpendingProducts(maxRecord);
        }
    }
}
