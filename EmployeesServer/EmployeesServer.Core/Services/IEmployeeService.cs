using EmployeesServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.Services
{
    public interface IEmployeeService
    {
        public Task<List<Employee>> GetAllAsync();
        public Task<Employee> GetByIdAsync(int id);
        public Task<Employee> AddAsync(Employee employee);
        public Task<Employee> UpdateAsync(int id, Employee employee);
        public Task DeleteByIdAsync(int id);
    }
}
