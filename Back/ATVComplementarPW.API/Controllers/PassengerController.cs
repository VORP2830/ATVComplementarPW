using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PassengerController : ControllerBase
{
    private readonly IPassengerService _passengerService;

    public PassengerController(IPassengerService passengerService)
    {
        _passengerService = passengerService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _passengerService.GetById(id);
        return Ok(result);
    }
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
    {
        var result = await _passengerService.GetAll(pageParams);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Post(PassengerDto model)
    {
        var result = await _passengerService.Create(model);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> Put(PassengerDto model)
    {
        var result = await _passengerService.Update(model);
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _passengerService.Delete(id);
        return Ok(result);
    }
}
