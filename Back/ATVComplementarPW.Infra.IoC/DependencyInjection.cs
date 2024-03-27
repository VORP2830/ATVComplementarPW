using System.Text.Json.Serialization;
using ATVComplementarPW.Application.Dtos.Mapping;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Application.Services;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Infra.Data.Context;
using ATVComplementarPW.Infra.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ATVComplementarPW.Infra.IoC;

public static class DependecyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection service, IConfiguration configuration)
    {
        service.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));
        
        service.AddControllers().AddJsonOptions(options =>
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

        service.AddAutoMapper(typeof(MappingProfile));

        service.AddScoped<IUnitOfWork, UnitOfWork>();

        service.AddScoped<ITokenService, TokenService>();
        service.AddScoped<IUserService, UserService>();
        service.AddScoped<IDriverService, DriverService>();
        service.AddScoped<IPassengerService, PassengerService>();
        service.AddScoped<IVehicleService, VehicleService>();

        return service;
    }
}
