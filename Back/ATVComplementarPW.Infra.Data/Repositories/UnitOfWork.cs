using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Infra.Data.Context;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    //public IUserRepository UserRepository => new UserRepository(_context);

    public async Task<bool> SaveChangesAsync()
    {
        return (await _context.SaveChangesAsync()) > 0;
    }
}
