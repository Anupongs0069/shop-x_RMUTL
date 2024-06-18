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
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly ApplicationDBContext _dbContext;

        public ProductCategoryService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateCategory(ProductCategoryContract category)
        {
            var newCategory = category.MapToEntity<ProductCategory>();
            await _dbContext.ProductCategories.AddAsync(newCategory);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _dbContext.ProductCategories.FirstOrDefaultAsync(c => c.ProductCategoryId == id);
            if(category == null)
            {
                throw new InvalidActionException("Product category could not be found.");
            }

            category.Deleted = true;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<ProductCategoryContract>> GetAllCategories()
        {
            return await _dbContext.ProductCategories.Where(c => !c.Deleted).AsNoTracking().SelectTo<ProductCategoryContract>().ToListAsync();
        }

        public async Task<ProductCategoryContract> GetCateGoryById(int id)
        {
            var category = await _dbContext.ProductCategories.Where(c => c.ProductCategoryId == id).SelectTo<ProductCategoryContract>().FirstOrDefaultAsync();
            if(category == null)
            {
                throw new NotFoundException("Product category could not be found.");
            }
            return category;
        }

        public async Task UpdateCategory(int id, ProductCategoryContract category)
        {
            var existingCategory = await _dbContext.ProductCategories.FirstOrDefaultAsync(c => c.ProductCategoryId == id);
            if (existingCategory == null)
            {
                throw new InvalidActionException("Product category could not be found.");
            }

            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;
            await _dbContext.SaveChangesAsync();
        }
    }
}
