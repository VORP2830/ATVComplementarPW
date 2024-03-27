namespace ATVComplementarPW.Domain.Entities;

public abstract class BaseEntity
{
    public int Id { get; protected set; }
    public bool Active { get; protected set; }
    public DateTime ModifiedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public void SetActive(bool active)
    {
        Active = active;
    }
}
