using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransportController : ControllerBase
{
    private readonly ITransportService _transportService;

    public TransportController(ITransportService transportService)
    {
        _transportService = transportService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _transportService.GetById(id);
        return Ok(result);
    }
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
    {
        var result = await _transportService.GetAll(pageParams);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Post(TransportDto model)
    {
        var result = await _transportService.Create(model);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> Put(TransportDto model)
    {
        var result = await _transportService.Update(model);
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _transportService.Delete(id);
        return Ok(result);
    }
}
