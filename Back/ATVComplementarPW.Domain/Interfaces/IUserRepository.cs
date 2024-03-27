using ATVComplementarPW.Domain.Entities;

namespace ATVComplementarPW.Domain.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User> GetByCPF(string cpf);
    Task<User> GetByLogin(string login);
    Task<User> GetById(int id);
}
