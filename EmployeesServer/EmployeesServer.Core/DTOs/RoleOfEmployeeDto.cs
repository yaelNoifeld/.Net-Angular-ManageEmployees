using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.DTOs
{
    public class RoleOfEmployeeDto
    {
        public int Id { get; set; }
        public RoleDto Role { get; set; }
        public bool IsManageRole { get; set; }
        public DateTime DateEntryOffice { get; set; }
    }
}
