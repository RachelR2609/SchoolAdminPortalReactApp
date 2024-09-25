using SchoolAdminPortalReactApp.Server.Data;
using SchoolAdminPortalReactApp.Server.Entities;
using SchoolAdminPortalReactApp.Server.Enums;

namespace SchoolAdminPortalReactApp.Server
{
    public class Test
    {
        public static void Testdb()
        {
            var context = new AdminPortalDBContext();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            List<Teacher> teachers = new List<Teacher>()
            {
                new Teacher()
                {
                    Title = Title.Mr,
                    FirstName = "Allen",
                    LastName = "Jones",
                    Subject = Subject.Geography,
                    Created = DateTime.UtcNow,
                    CreatedBy = "System"

                },
                 new Teacher()
                {
                    Title = Title.Mrs,
                    FirstName = "Katherine",
                    LastName = "Carter",
                    Subject = Subject.Mathematics,
                    Created = DateTime.UtcNow,
                    CreatedBy = "System"

                }
            };

            List<Student> students = new List<Student>()
            {
                new Student()
                {
                    FirstName = "Josie",
                    LastName = "Apple",
                    YearGroup = 7,
                    EmergencyContact = "07898765655",
                    Created = DateTime.UtcNow,
                    CreatedBy = "System"
                },
                new Student()
                {
                    FirstName = "Luke",
                    LastName = "Forbes",
                    YearGroup = 7,
                    EmergencyContact = "07865637664",
                    Created = DateTime.UtcNow,
                    CreatedBy = "System"
                }
            };

            context.Teachers.AddRange(teachers);

            context.SaveChanges();
        }
    }
}
