using ATVComplementarPW.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ATVComplementarPW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet]
    public async Task<IActionResult> GetById(DateTime dateStart, DateTime dateEnd)
    {
        var result = await _reportService.GenerateTransportReport(dateStart, dateEnd);
        return Ok(result);
    }
}
