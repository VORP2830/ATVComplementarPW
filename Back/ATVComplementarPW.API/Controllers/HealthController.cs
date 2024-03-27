using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> Get()
    {
        return Ok(new
        {
            Message = "Welcome to ATVComplementarPW API",
            AccessDate = DateTime.Now.ToLongDateString(),
        });
    }
}
