using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using ShopXPress.Api.Entities.Database;

namespace ShopXPress.Api;

[ApiController]
[Route("api/[controller]")]
public class HealthCheckController : ControllerBase
{
    private readonly ApplicationDBContext _dbContext;

    public HealthCheckController(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("Ready")]
    public HealthCheckContract Ready()
    {
        return new HealthCheckContract
        {
            DatabaseStatus = _dbContext.Database.CanConnect() ? "Active" : "Down",
            Version = Assembly.GetEntryAssembly()!.GetCustomAttribute<AssemblyInformationalVersionAttribute>()!.InformationalVersion,
            Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")!
        };
    }
}
