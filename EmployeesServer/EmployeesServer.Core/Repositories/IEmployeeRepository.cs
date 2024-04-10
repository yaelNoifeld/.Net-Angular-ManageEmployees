using EmployeesServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<List<Employee>> GetAllAsync();
        public Task<Employee> GetByIdAsync(int id);
        public Task<Employee> AddAsync(Employee employee);
        public Task<Employee> UpdateAsync(int id, Employee emploee);
        public Task DeleteByIdAsync(int id);
    }
}
