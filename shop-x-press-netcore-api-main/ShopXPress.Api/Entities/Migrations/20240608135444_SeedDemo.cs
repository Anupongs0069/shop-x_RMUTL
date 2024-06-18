using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopXPress.Api.Entities.Migrations
{
    /// <inheritdoc />
    public partial class SeedDemo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Seed Product Categories
            migrationBuilder.InsertData(
                table: "ProductCategory",
                columns: new[] { "ProductCategoryId", "Name", "Description" },
                values: new object[,]
                {
                { 1, "Electronics", "Devices and gadgets" },
                { 2,  "Books", "Printed and digital books" },
                { 3,  "Clothing", "Apparel and accessories" },
                { 4,  "Home & Kitchen", "Home appliances and kitchenware" },
                { 5,  "Sports & Outdoors", "Sports equipment and outdoor gear" }
                });

            // Seed Products
            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "ProductId", "Name", "Description", "InStock", "Price", "ProductCategoryId" },
                values: new object[,]
                {
                { 1, "Smartphone", "Latest model with 6.5-inch display", 50, 699.99m, 1 },
                { 2, "Laptop", "Lightweight laptop with 16GB RAM", 30, 999.99m, 1 },
                { 3, "Smart TV", "55-inch 4K UHD Smart TV", 20, 599.99m, 1 },
                { 4, "Wireless Earbuds", "Noise-cancelling wireless earbuds", 100, 199.99m, 1 },
                { 5, "Smartwatch", "Fitness tracker with heart rate monitor", 75, 149.99m, 1 }
                });

            // Admin User
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "FirstName", "LastName", "Age", "Email", "HashPassword", "UserType" },
                values: new object[,]
                {
                { "Admin", "ShopXPress", 28, "admin@shopxpress.com", "aeylY50avPqYc28cmHAodpHu5375j/12kc71CzuG5o4=", 1 },
                { "John", "Doe", 28, "johndoe@abc.com", "aeylY50avPqYc28cmHAodpHu5375j/12kc71CzuG5o4=", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Product");
            migrationBuilder.Sql("DELETE FROM ProductCategory");
            migrationBuilder.Sql("DELETE FROM User");
        }
    }
}
