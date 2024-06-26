using ATVComplementarPW.Domain.Entities;

namespace ATVComplementarPW.Domain.Interfaces;

public interface IReportsRepository
{
    Task<TransportReport> GenerateTransportReport(DateTime startDate, DateTime endDate);
}
