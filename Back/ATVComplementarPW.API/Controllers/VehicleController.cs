using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _vehicleService.GetById(id);
        return Ok(result);
    }
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
    {
        var result = await _vehicleService.GetAll(pageParams);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Post(VehicleDto model)
    {
        var result = await _vehicleService.Create(model);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> Put(VehicleDto model)
    {
        var result = await _vehicleService.Update(model);
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _vehicleService.Delete(id);
        return Ok(result);
    }
}
