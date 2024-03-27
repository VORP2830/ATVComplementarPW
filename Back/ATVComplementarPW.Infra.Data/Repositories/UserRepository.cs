using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ATVComplementarPW.Infra.Data.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    private readonly ApplicationDbContext _context;
    public UserRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<User> GetByCPF(string cpf)
    {
        return await _context.Users
                                .AsNoTracking()
                                .FirstOrDefaultAsync(u => u.Active &&
                                                            u.CPF == cpf);
    }

    public async Task<User> GetByLogin(string login)
    {
        return await _context.Users 
                                .AsNoTracking()
                                .FirstOrDefaultAsync(u => u.Active &&
                                                            u.Login == login);
    }

    public async Task<User> GetById(int id)
    {
        return await _context.Users
                                .AsNoTracking()
                                .Include(u => u.Address)
                                .FirstOrDefaultAsync(d => d.Active && 
                                                            d.Id == id);
    }
}
