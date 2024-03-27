namespace ATVComplementarPW.Domain.Pagination;
public class PageParams
{
    public const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int pageSize = 15;
    public int PageSize
    {
        get { return pageSize; }
        set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }
}
