using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Exceptions;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using AutoMapper;

namespace ATVComplementarPW.Application.Services;

public class PassengerService : IPassengerService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public PassengerService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<PageList<PassengerDto>> GetAll(PageParams pageParams)
    {
        var passengerPage = await _unitOfWork.PassengerRepository.GetAll(pageParams);
        if (passengerPage == null) return null;
        var passengerPageDtos = _mapper.Map<IEnumerable<PassengerDto>>(passengerPage.Items);
        return new PageList<PassengerDto>(passengerPageDtos.ToList(), passengerPage.TotalCount, passengerPage.CurrentPage, passengerPage.PageSize);
    }

    public async Task<PassengerDto> GetById(int id)
    {
        Passenger passenger = await _unitOfWork.PassengerRepository.GetById(id);
        return _mapper.Map<PassengerDto>(passenger);
    }

    public async Task<PassengerDto> Create(PassengerDto model)
    {
        Passenger passenger = await _unitOfWork.PassengerRepository.GetByCPF(model.CPF);
        if (passenger is not null)
        {
            throw new ATVComplementarPWException("CPF já cadastrado");
        }
        passenger = _mapper.Map<Passenger>(model);
        _unitOfWork.PassengerRepository.Add(passenger);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<PassengerDto>(passenger);
    }

    public async Task<PassengerDto> Update(PassengerDto model)
    {
        Passenger passengerCpf = await _unitOfWork.PassengerRepository.GetByCPF(model.CPF);
        if (passengerCpf is not null)
        {
            throw new ATVComplementarPWException("CPF já cadastrado");
        }
        Passenger passenger = await _unitOfWork.PassengerRepository.GetById(model.Id);
        if (passenger is null)
        {
            throw new ATVComplementarPWException("Passageiro não cadastrado");
        }
        passenger = _mapper.Map<Passenger>(model);
        _unitOfWork.PassengerRepository.Update(passenger);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<PassengerDto>(passenger);
    }
    public async Task<PassengerDto> Delete(int id)
    {
        Passenger passenger = await _unitOfWork.PassengerRepository.GetById(id);
        if (passenger is null)
        {
            throw new ATVComplementarPWException("Passageiro não cadastrado");
        }
        passenger.SetActive(false);
        _unitOfWork.PassengerRepository.Update(passenger);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<PassengerDto>(passenger);
    }
}
