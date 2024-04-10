using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.Entities
{
    public class RoleOfEmployee
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public Employee Employee { get; set; }
        public Role Role { get; set; }
        public bool IsManageRole { get; set; }
        public DateTime DateEntryOffice { get; set; }
    }
}
