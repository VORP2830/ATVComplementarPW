using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Enum;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class ReportsRepository : IReportsRepository
{
    private readonly ApplicationDbContext _context;
    public ReportsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TransportReport> GenerateTransportReport(DateTime startDate, DateTime endDate)
    {
        var transportCounts = await _context.Transports
            .Where(t => t.DateHourTransport >= startDate && t.DateHourTransport <= endDate)
            .GroupBy(t => t.Vehicle.VehicleType)
            .Select(g => new
            {
                VehicleType = g.Key,
                Count = g.Count(),
                TotalRevenue = g.Sum(t => t.Price)
            })
            .ToListAsync();

        var report = new TransportReport();

        foreach (var transportCount in transportCounts)
        {
            switch (transportCount.VehicleType)
            {
                case VehicleType.Car:
                    report.CarCount = transportCount.Count;
                    report.CarRevenue = transportCount.TotalRevenue;
                    break;
                case VehicleType.Bus:
                    report.BusCount = transportCount.Count;
                    report.BusRevenue = transportCount.TotalRevenue;
                    break;
                case VehicleType.VAN:
                    report.VanCount = transportCount.Count;
                    report.VanRevenue = transportCount.TotalRevenue;
                    break;
            }
        }

        return report;
    }
}