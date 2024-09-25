namespace SchoolAdminPortalReactApp.Server.Dtos.Student
{
    public class StudentUpdateDTO : DTOBase
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearGroup { get; set; }
        public string EmergencyContact { get; set; }
    }
}
