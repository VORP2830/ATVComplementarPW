using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Exceptions;
using ATVComplementarPW.Domain.Interfaces;
using AutoMapper;
using BCryptNet = BCrypt.Net;

namespace ATVComplementarPW.Application.Services;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenService _tokenService;

    public UserService(IMapper mapper, IUnitOfWork unitOfWork, ITokenService tokenService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _tokenService = tokenService;
    }

    public async Task<object> Login(UserLoginDto model)
    {
        User user = await _unitOfWork.UserRepository.GetByLogin(model.Login);
        if (user is null)
        {
            throw new ATVComplementarPWException("Login ou senha inválidos");
        }
        bool isSuccess = BCryptNet.BCrypt.Verify(model.Password, user.Password);
        if (!isSuccess)
        {
            throw new ATVComplementarPWException("Login ou senha inválidos");
        }
        if (isSuccess)
        {
            string token = await _tokenService.GenerateToken(user.Id, user.Login);
            return new
            {
                user.Name,
                token
            };
        }
        throw new ATVComplementarPWException("Ocorreu um erro desconhecido");
    }

    public async Task<Object> Create(UserDto model)
    {
        User user = await _unitOfWork.UserRepository.GetByCPF(model.CPF);
        if (user is not null)
        {
            throw new ATVComplementarPWException("CPF já cadastrado");
        }
        user = await _unitOfWork.UserRepository.GetByLogin(model.Login);
        if (user is not null)
        {
            throw new ATVComplementarPWException("Login já em uso");
        }
        user = _mapper.Map<User>(model);
        user.SetPassword(BCryptNet.BCrypt.HashPassword(model.Password));
        user.SetActive(true);
        _unitOfWork.UserRepository.Add(user);
        await _unitOfWork.SaveChangesAsync();
        string token = await _tokenService.GenerateToken(user.Id, user.Login);
        return new
        {
            user.Name,
            token
        };
    }

    public async Task<UserDto> Update(UserDto model, int userId)
    {
        User user = await _unitOfWork.UserRepository.GetById(userId);
        if (user.CPF != model.CPF)
        {
            User existingUser = await _unitOfWork.UserRepository.GetByCPF(model.CPF);

            if (existingUser != null && existingUser.Id != userId)
            {
                throw new ATVComplementarPWException("CPF já cadastrado");
            }
        }
        if (string.IsNullOrEmpty(model.Password))
        {
            model.Password = user.Password;
        }
        else
        {
            model.Password = BCryptNet.BCrypt.HashPassword(model.Password);
        }
        _mapper.Map(model, user); 
        user.SetActive(true); 
        _unitOfWork.UserRepository.Update(user);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetById(int id)
    {
        User user = await _unitOfWork.UserRepository.GetById(id);
        user.Password = null;
        return _mapper.Map<UserDto>(user);
    }
}
