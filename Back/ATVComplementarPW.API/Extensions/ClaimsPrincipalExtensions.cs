using System.Security.Claims;

namespace ATVComplementarPW.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst("UserId").Value);
    }
}
