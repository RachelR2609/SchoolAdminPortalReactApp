using SchoolAdminPortalReactApp.Server.Dtos.Student;
using SchoolAdminPortalReactApp.Server.Enums;

namespace SchoolAdminPortalReactApp.Server.Dtos
{
    public class ClassDTO
    {
        public Subject Subject { get; set; }
        public string ClassRoom { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public TeacherDTO Teacher { get; set; }
        public List<StudentRequestDTO> Students { get; set; }
    }
}
