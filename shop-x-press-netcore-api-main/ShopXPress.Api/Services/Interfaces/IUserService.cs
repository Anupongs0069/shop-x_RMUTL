using ShopXPress.Api.Contracts;

namespace ShopXPress.Api.Services.Interfaces;

public interface IUserService
{
    Task<AuthContract> AuthenticateUser(string email, string password);

    Task<List<UserContract>> GetAllUsers();
    Task<UserContract> GetUserById(int userId);
}
