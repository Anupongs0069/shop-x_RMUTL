namespace ShopXPress.Api.Settings;

public class JwtSetting
{
    public const string SECTION = "JwtSetting";
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string Secret { get; set; }
    public string Salt { get; set; }
}
