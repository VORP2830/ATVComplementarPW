using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class TransportRepository : GenericRepository<Transport>, ITransportRepository
{
    private readonly ApplicationDbContext _context;
    public TransportRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<PageList<Transport>> GetAll(PageParams pageParams)
    {
        var query = _context.Transports
                                .AsNoTracking()
                                .Where(p => p.Active);

        var totalCount = await query.CountAsync();

        var items = await query.Skip((pageParams.PageNumber - 1) * pageParams.PageSize)
                            .Take(pageParams.PageSize)
                            .ToListAsync();

        return new PageList<Transport>(items, totalCount, pageParams.PageNumber, pageParams.PageSize);
    }

    public async Task<Transport> GetById(int id)
    {
        return await _context.Transports
                                .AsNoTracking()
                                .FirstOrDefaultAsync(t => t.Active && 
                                                            t.Id == id);
    }
}
