namespace ATVComplementarPW.Domain.Interfaces;

public interface IUnitOfWork
{
    //IUserRepository UserRepository { get; }
    Task<bool> SaveChangesAsync();
}
