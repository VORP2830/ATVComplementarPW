
namespace ATVComplementarPW.Domain.Entities;

public abstract class Person : BaseEntity
{
    public string Name { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string CPF { get; set; }
    public Address Address { get; set; }
    protected Person()
    {
        Active = true;
    }
}
