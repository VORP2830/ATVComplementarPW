using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;

namespace ATVComplementarPW.Application.Services;

public class ReportService : IReportService
{
    private readonly IUnitOfWork _unitOfWork;

    public ReportService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<TransportReport> GenerateTransportReport(DateTime startDate, DateTime endDate)
    {
        return await _unitOfWork.ReportsRepository.GenerateTransportReport(startDate, endDate);
    }
}
