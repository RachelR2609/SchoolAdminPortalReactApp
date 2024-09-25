using Microsoft.EntityFrameworkCore;
using SchoolAdminPortalReactApp.Server.Enums;

namespace SchoolAdminPortalReactApp.Server.Entities
{
    [PrimaryKey("Id")]
    public class Teacher : EntityBase
    {
        public Title Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Subject Subject { get; set; }
    }
}
