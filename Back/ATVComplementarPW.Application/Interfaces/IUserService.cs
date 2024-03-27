using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Domain.Entities;

namespace ATVComplementarPW.Application.Interfaces;

public interface IUserService
{
    Task<Object> Login(UserLoginDto model);
    Task<Object> Create(UserDto model);
    Task<UserDto> Update(UserDto model, int userId);
    Task<UserDto> GetById(int id);
}
