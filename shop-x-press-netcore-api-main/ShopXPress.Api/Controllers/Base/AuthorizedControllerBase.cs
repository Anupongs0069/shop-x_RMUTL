using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Exceptions;
using System.Security.Claims;

namespace ShopXPress.Api.Controller;

[Authorize]
[ApiController]
public class AuthorizedControllerBase : ControllerBase
{
    protected int CurrentUserId
    {
        get
        {
            string? userId = User?.Claims?.FirstOrDefault(c => c.Type == ApplicationClaim.UserIdentity)?.Value;
            if (int.TryParse(userId, out int id))
            {
                return id;
            }
            throw new InvalidActionException("No user is rpresent in the context.");
        }
    }

   
}
