using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using System.ComponentModel.DataAnnotations.Schema;


namespace EmployeesServer.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }

        //[Index(IsUnique = true)]
        public string Name { get; set; }
    }
}
