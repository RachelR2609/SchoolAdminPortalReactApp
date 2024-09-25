namespace SchoolAdminPortalReactApp.Server.Entities
{
    public class EntityBase
    {
        public string Id = Guid.NewGuid().ToString();
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? Deleted { get; set; }
        public string ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
