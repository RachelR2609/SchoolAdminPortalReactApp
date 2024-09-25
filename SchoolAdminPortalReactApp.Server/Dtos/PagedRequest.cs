namespace SchoolAdminPortalReactApp.Server.Dtos
{
    public class PagedRequest<T>
    {
        public T Data { get; set; }
        public int TotalItems { get; set; }
    }
}
