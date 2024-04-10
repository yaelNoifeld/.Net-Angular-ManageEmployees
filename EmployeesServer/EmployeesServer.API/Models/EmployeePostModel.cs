using EmployeesServer.Core.Entities;

namespace EmployeesServer.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdCard { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public IEnumerable<RoleOfEmployeePostModel> Roles { get; set; }
    }
}
