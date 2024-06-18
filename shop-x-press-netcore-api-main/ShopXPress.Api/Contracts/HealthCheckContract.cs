namespace ShopXPress.Api;

public class HealthCheckContract
{
    public string DatabaseStatus { get; set; }
    public string Environment { get; set; }
    public string Version { get; set; }
}
