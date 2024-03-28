using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class VehicleRepository : GenericRepository<Vehicle>, IVehicleRepository
{
    private readonly ApplicationDbContext _context;
    public VehicleRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<PageList<Vehicle>> GetAll(PageParams pageParams)
    {
        var query = _context.Vehicles
                                .AsNoTracking()
                                .Include(p => p.Driver)
                                .Where(p => p.Active);

        var totalCount = await query.CountAsync();

        var items = await query.Skip((pageParams.PageNumber - 1) * pageParams.PageSize)
                            .Take(pageParams.PageSize)
                            .ToListAsync();

        return new PageList<Vehicle>(items, totalCount, pageParams.PageNumber, pageParams.PageSize);
    }

    public async Task<Vehicle> GetByPlate(string plate)
    {
        return await _context.Vehicles
                                .AsNoTracking()
                                .FirstOrDefaultAsync(v => v.Active &&
                                                            v.Plate == plate);
    }

    public async Task<Vehicle> GetById(int id)
    {
        return await _context.Vehicles
                                .AsNoTracking()
                                .FirstOrDefaultAsync(v => v.Active && 
                                                            v.Id == id);
    }
}
