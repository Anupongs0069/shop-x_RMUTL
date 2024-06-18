using Microsoft.EntityFrameworkCore;

namespace ShopXPress.Api.Entities.Database;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions options) : base(options)
    {
    }

    #region Entities
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<ProductCategory> ProductCategories { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Cart> Carts { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderPayment> OrdersPayments { get; set; }
    public virtual DbSet<CartProduct> CartProducts { get; set; }
    public virtual DbSet<OrderProduct> OrderProducts { get; set; }
    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // TODO : Config the entities properties and relations here.
        // modelBuilder.Entity<Product>()
        //     .HasMany(e => e.Carts)
        //     .WithMany(e => e.Products);

        // modelBuilder.Entity<Product>()
        //     .HasMany(e => e.Orders)
        //     .WithMany(e => e.Products);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = new())
    {
        FillEntityTracker();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        FillEntityTracker();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    private void FillEntityTracker()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is BaseEntity)
            {
                var createdAt = entry.Property(nameof(BaseEntity.CreatedAt));
                var modifiedAt = entry.Property(nameof(BaseEntity.ModifiedAt));
                switch (entry.State)
                {
                    case EntityState.Added when entry.Entity is BaseEntity:

                        if (createdAt.CurrentValue == null)
                        {
                            createdAt.CurrentValue = DateTime.Now;
                        }

                        if (modifiedAt.CurrentValue == null)
                        {
                            modifiedAt.CurrentValue = DateTime.Now;
                        }

                        break;
                    case EntityState.Modified when entry.Entity is BaseEntity:
                        if (modifiedAt.CurrentValue == null)
                        {
                            modifiedAt.CurrentValue = DateTime.Now;
                        }
                        break;
                }
            }

        }
    }
}
