using AutoMapper;
using SchoolAdminPortalReactApp.Server.Dtos;
using SchoolAdminPortalReactApp.Server.Dtos.Student;
using SchoolAdminPortalReactApp.Server.Entities;

namespace SchoolAdminPortalReactApp.Server.Configurations
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Student, StudentRequestDTO>().ReverseMap();
            CreateMap<Student, StudentUpdateDTO>().ReverseMap();
            CreateMap<Teacher, TeacherDTO>().ReverseMap();
            CreateMap<Class, ClassDTO>().ReverseMap();
        }
    }
}
