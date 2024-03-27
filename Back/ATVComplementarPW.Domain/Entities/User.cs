
namespace ATVComplementarPW.Domain.Entities;

public class User : Person
{
    public string Login { get; set; }
    public string Password { get; set; }
    protected User()
    {
        Active = true;
    }
    public void SetPassword(string password)
    {
        Password = password;
    }
}
