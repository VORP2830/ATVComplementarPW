using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DriverController : ControllerBase
{
    private readonly IDriverService _driverService;

    public DriverController(IDriverService driverService)
    {
        _driverService = driverService;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _driverService.GetById(id);
        return Ok(result);
    }
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
    {
        var result = await _driverService.GetAll(pageParams);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Post(DriverDto model)
    {
        var result = await _driverService.Create(model);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> Put(DriverDto model)
    {
        var result = await _driverService.Update(model);
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _driverService.Delete(id);
        return Ok(result);
    }
}
