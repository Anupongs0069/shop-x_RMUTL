using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Controller;
using ShopXPress.Api.Services.Interfaces;

namespace ShopXPress.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : AuthorizedControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Profile")]
        public async Task<UserContract> GetProfile()
        {
            return await _userService.GetUserById(CurrentUserId);
        }
    }
}
