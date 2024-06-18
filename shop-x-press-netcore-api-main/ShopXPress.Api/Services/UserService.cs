using ShopXPress.Api.Contracts;
using ShopXPress.Api.Entities.Database;
using ShopXPress.Api.Services.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using ShopXPress.Api.Settings;
using System.Text;
using ShopXPress.Api.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ShopXPress.Api.Extensions;

namespace ShopXPress.Api.Services;

#nullable disable
public class UserService : IUserService
{
    private readonly ApplicationDBContext _dbContext;
    private readonly JwtSetting _jwtSetting;

    public UserService(ApplicationDBContext dbContext, IOptions<JwtSetting> jwtSetting)
    {
        _dbContext = dbContext;
        _jwtSetting = jwtSetting.Value;
    }

    public async Task<AuthContract> AuthenticateUser(string email, string password)
    {
        var hashPassword = HashPassword(password, _jwtSetting.Salt);
        var user = await _dbContext.Users.FirstOrDefaultAsync(c => c.Email == email && c.HashPassword == hashPassword);
        if (user == null)
        {
            throw new InvalidActionException("Invalid email or password.");
        }

        var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, user.UserType == Entities.Enums.UserType.Admin ? "Admin" : "User"),
                new Claim(ApplicationClaim.UserIdentity, user.UserId.ToString()),
            };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSetting.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var jwtToken = new JwtSecurityToken(
            issuer: _jwtSetting.Issuer,
            audience: _jwtSetting.Audience,
            claims: claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: creds);

       string token =  new JwtSecurityTokenHandler().WriteToken(jwtToken);

        return new AuthContract
        {
            Email = email,
            Token = token
        };

    }

    public async Task<List<UserContract>> GetAllUsers()
    {
        return await _dbContext.Users.SelectTo<UserContract>().ToListAsync();
    }

    public async Task<UserContract> GetUserById(int userId)
    {
        return await _dbContext.Users.SelectTo<UserContract>().FirstOrDefaultAsync(c => c.UserId == userId);
    }

    #region Private Methods

    private string HashPassword(string password, string salt)
    {
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
           password: password,
           salt: Encoding.UTF8.GetBytes(salt),
           prf: KeyDerivationPrf.HMACSHA256,
           iterationCount: 100000,
           numBytesRequested: 256 / 8));
        return hashed;
    }

    #endregion
}
