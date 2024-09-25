using Microsoft.EntityFrameworkCore;
using SchoolAdminPortalReactApp.Server.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolAdminPortalReactApp.Server.Entities
{
    [PrimaryKey("Id")]
    public class Class : EntityBase
    {
        public Subject Subject { get; set; }
        public string ClassRoom { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [ForeignKey("Teacher")]
        public string TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; }
        public List<Student> Students { get; set; }
    }
}
