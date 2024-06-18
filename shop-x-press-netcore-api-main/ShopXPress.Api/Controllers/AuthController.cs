using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Services.Interfaces;
using ShopXPress.Api.Settings;

namespace ShopXPress.Api.Controller;

[Route("api/[controller]")]
[ApiController]
public class AuthController
{
    private readonly IUserService _userService;
    private readonly JwtSetting _jwtSetting;
    public AuthController(IOptions<JwtSetting> jwtSetting, IUserService userService)
    {
        _jwtSetting = jwtSetting.Value;
        _userService = userService;
    }

    [HttpPost("Login")]
    public async Task<AuthContract> Login([FromBody] LoginContract loginContract)
    {
       return await _userService.AuthenticateUser(loginContract.Email, loginContract.Password);
    }

}
