using ATVComplementarPW.Domain.Entities;

namespace ATVComplementarPW.Application.Interfaces;

public interface IReportService
{
    Task<TransportReport> GenerateTransportReport(DateTime startDate, DateTime endDate);
}
