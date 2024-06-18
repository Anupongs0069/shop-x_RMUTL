using System.ComponentModel;

namespace ShopXPress.Api.Entities.Enums;

public enum UserType
{
    [Description("User")]
    User = 2,
    [Description("Admin")]
    Admin = 1
}

public static class UserTypeExtension
{
    public static string GetDescription(this UserType status)
    {
        var enumType = status.GetType();
        var name = Enum.GetName(enumType, status);
        var attr = enumType.GetField(name).GetCustomAttributes(false).OfType<DescriptionAttribute>().Single();
        return attr.Description;
    }
}


