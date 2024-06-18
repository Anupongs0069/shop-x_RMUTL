using Microsoft.Extensions.DependencyInjection;
using ShopXPress.Api.Services;
using ShopXPress.Api.Services.Interfaces;
using ShopXPress.Api.Settings;

namespace ShopXPress.Api.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services.AddScoped<IUserService, UserService>()
            .AddScoped<IProductService, ProductService>()
            .AddScoped<ICartService, CartService>()
            .AddScoped<IProductCategoryService, ProductCategoryService>();
    }

    public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<JwtSetting>(configuration.GetSection(JwtSetting.SECTION));
    }
}
