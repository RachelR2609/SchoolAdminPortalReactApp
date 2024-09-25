using Microsoft.EntityFrameworkCore;

namespace SchoolAdminPortalReactApp.Server.Entities
{
    [PrimaryKey("Id")]
    public class Student : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearGroup { get; set; }
        public string EmergencyContact { get; set; }
    }
}
