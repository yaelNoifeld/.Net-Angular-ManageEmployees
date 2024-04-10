using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.Entities
{
    public enum Gender { Male, Female }

    [Table("Employees")]
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdCard { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public IEnumerable<RoleOfEmployee> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}
    