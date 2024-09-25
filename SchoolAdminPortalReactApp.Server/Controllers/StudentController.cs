using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolAdminPortalReactApp.Server.Dtos;
using SchoolAdminPortalReactApp.Server.Dtos.Student;
using SchoolAdminPortalReactApp.Server.Entities;
using SchoolAdminPortalReactApp.Server.Repository;

namespace SchoolAdminPortalReactApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        IMapper _mapper;
        IRepository<Student> _studentRepo;

        public StudentController(IMapper mapper, IRepository<Student> studentRepo)
        {
            _mapper = mapper;
            _studentRepo = studentRepo;
        }

        [HttpGet("GetAll/{page:int}/{pageSize:int}")]
        public IActionResult GetStudents(int page = 0, int pageSize = 10)
        {
            var students = _studentRepo
                .GetAll()
                .Where(s => s.Deleted == null)
                .Select(s => new StudentRequestDTO(s))
                .ToList();

            var data = students.Skip(page * pageSize).Take(pageSize);

            return Ok(new PagedRequest<List<StudentRequestDTO>>
            {
                Data = students,
                TotalItems = students.Count()
            });
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetStudent(int id)
        {
            var student = _studentRepo.GetById(id);
            return Ok(new StudentRequestDTO(student));
        }

        [HttpPost("Create")]
        public IActionResult CreateStudent(StudentUpdateDTO student)
        {
            if (student == null) return BadRequest();


            var studentToAdd = new Student
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                YearGroup = student.YearGroup,
                EmergencyContact = student.EmergencyContact,
                Created = DateTime.UtcNow,
                CreatedBy = "Admin 1"
            };

            _studentRepo.Insert(studentToAdd);
            _studentRepo.Save();
            return Ok();

        }

        [HttpPut("Update")]
        public IActionResult UpdateStudent(StudentUpdateDTO student)
        {
            if (student == null) return BadRequest();

            _studentRepo.Update(_mapper.Map<Student>(student));
            _studentRepo.Save();
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteStudent(string id)
        {
            var studentToDelete = _studentRepo.GetById(id);
            studentToDelete.Deleted = DateTime.UtcNow;
            _studentRepo.Update(studentToDelete);
            _studentRepo.Save();
            return Ok();
        }
    }
}
