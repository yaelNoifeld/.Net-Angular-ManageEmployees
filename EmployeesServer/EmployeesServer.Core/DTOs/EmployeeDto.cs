using EmployeesServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdCard { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public IEnumerable<RoleOfEmployeeDto> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}
