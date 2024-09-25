namespace SchoolAdminPortalReactApp.Server.Dtos.Student
{
    public class StudentRequestDTO : DTOBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearGroup { get; set; }
        public string EmergencyContact { get; set; }

        public StudentRequestDTO(SchoolAdminPortalReactApp.Server.Entities.Student student)
        {
            Id = student.Id;
            Created = student.Created;
            CreatedBy = student.CreatedBy;
            FirstName = student.FirstName;
            LastName = student.LastName;
            YearGroup = student.YearGroup;
            EmergencyContact = student.EmergencyContact;
        }
    }
}
