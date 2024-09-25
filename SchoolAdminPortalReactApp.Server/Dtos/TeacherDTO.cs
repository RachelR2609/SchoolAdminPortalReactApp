using SchoolAdminPortalReactApp.Server.Enums;

namespace SchoolAdminPortalReactApp.Server.Dtos
{
    public class TeacherDTO
    {
        public Title Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Subject Subject { get; set; }
    }
}
