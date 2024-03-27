using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class DriverRepository : GenericRepository<Driver>, IDriverRepository
{
    private readonly ApplicationDbContext _context;
    public DriverRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<PageList<Driver>> GetAll(PageParams pageParams)
    {
        var query = _context.Drivers
                                .AsNoTracking()
                                .Where(p => p.Active);

        query = query.OrderBy(e => e.Name);

        var totalCount = await query.CountAsync();

        var items = await query.Skip((pageParams.PageNumber - 1) * pageParams.PageSize)
                            .Take(pageParams.PageSize)
                            .ToListAsync();

        return new PageList<Driver>(items, totalCount, pageParams.PageNumber, pageParams.PageSize);
    }

    public async Task<Driver> GetByCPF(string cpf)
    {
        return await _context.Drivers
                                .AsNoTracking()
                                .FirstOrDefaultAsync(u => u.Active &&
                                                            u.CPF == cpf);
    }

    public async Task<Driver> GetById(int id)
    {
        return await _context.Drivers
                                .AsNoTracking()
                                .Include(d => d.Address)
                                .FirstOrDefaultAsync(d => d.Id == id);
    }
}
