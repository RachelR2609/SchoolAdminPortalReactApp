using Microsoft.EntityFrameworkCore;
using SchoolAdminPortalReactApp.Server.Entities;

namespace SchoolAdminPortalReactApp.Server.Data
{
    public class AdminPortalDBContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Class> Classes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=PINGURACH; Initial Catalog=AdminPortalDB; Persist Security Info=True; Integrated Security=SSPI; Trust Server Certificate=True");
        }
    }
}
