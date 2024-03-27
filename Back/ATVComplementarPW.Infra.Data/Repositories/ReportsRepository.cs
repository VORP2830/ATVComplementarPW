using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Infra.Data.Context;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class ReportsRepository : IReportsRepository
{
    private readonly ApplicationDbContext _context;
    public ReportsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

}
