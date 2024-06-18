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
    public class ProductCategoriesController : AuthorizedControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoriesController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpGet]
        public async Task<List<ProductCategoryContract>> GetProductCategories()
        {
            return await _productCategoryService.GetAllCategories();
        }

        [HttpGet("{categoryId}")]
        public async Task<ProductCategoryContract> GetProductCategoryById([FromRoute] int categoryId)
        {
            return await _productCategoryService.GetCateGoryById(categoryId);
        }

        [HttpDelete("{categoryId}")]
        [Authorize(Roles = "Admin")]
        public async Task DeleteProductCategory([FromRoute] int categoryId)
        {
            await _productCategoryService.DeleteCategory(categoryId);
        }

        [HttpPost("CreateProductCategory")]
        [Authorize(Roles = "Admin")]
        public async Task CreateProductCategory([FromBody] ProductCategoryContract productCategoryContract)
        {
            await _productCategoryService.CreateCategory(productCategoryContract);
        }

        [HttpPut("UpdateProductCategory/{categoryId}")]
        [Authorize(Roles = "Admin")]
        public async Task UpdateProductCategory([FromRoute] int categoryId, [FromBody] ProductCategoryContract productCategoryContract)
        {
            await _productCategoryService.UpdateCategory(categoryId, productCategoryContract);
        }
    }
}
