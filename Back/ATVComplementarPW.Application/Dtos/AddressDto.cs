namespace ATVComplementarPW.Application.Dtos;

public class AddressDto : BaseEntity
{
    public string StreetAvenue { get; set; }
    public string District { get; set; }
    public string ZipCode { get; set; }
    public string? Number { get; set; }
    public string? Complement { get; set; }
    public string State { get; set; }
    public string City { get; set; }
}
