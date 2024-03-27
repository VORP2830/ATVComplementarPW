using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class PassengerRepository : GenericRepository<Passenger>, IPassengerRepository
{
    private readonly ApplicationDbContext _context;
    public PassengerRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<PageList<Passenger>> GetAll(PageParams pageParams)
    {
        var query = _context.Passengers
                                .AsNoTracking()
                                .Where(p => p.Active);

        query = query.OrderBy(e => e.Name);

        var totalCount = await query.CountAsync();

        var items = await query.Skip((pageParams.PageNumber - 1) * pageParams.PageSize)
                            .Take(pageParams.PageSize)
                            .ToListAsync();

        return new PageList<Passenger>(items, totalCount, pageParams.PageNumber, pageParams.PageSize);
    }

    public async Task<Passenger> GetByCPF(string cpf)
    {
        return await _context.Passengers
                                .AsNoTracking()
                                .FirstOrDefaultAsync(u => u.Active &&
                                                            u.CPF == cpf);
    }

    public async Task<Passenger> GetById(int id)
    {
        return await _context.Passengers
                                .AsNoTracking()
                                .Include(p => p.Address)
                                .FirstOrDefaultAsync(p => p.Active &&
                                                            p.Id == id);
    }
}
