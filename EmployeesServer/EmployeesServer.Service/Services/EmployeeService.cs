using EmployeesServer.Core.Entities;
using EmployeesServer.Core.Repositories;
using EmployeesServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            foreach (var role in employee.Roles)
            {
                if (employee.StartDate > role.DateEntryOffice)
                    throw new Exception("The date of entry office cann't be before the start date of working!");
            }
            foreach (var role in employee.Roles)
            {
                foreach (var role2 in employee.Roles)
                {
                    if (role != role2)
                    {
                        if (role.Role.Name == role2.Role.Name)
                        {
                           throw new Exception("Each role can only be held once");
                        }
                    }
                }
            }
            await _employeeRepository.AddAsync(employee);
            return employee;
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _employeeRepository.DeleteByIdAsync(id);
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            foreach (var role in employee.Roles)
            {
                if (employee.StartDate > role.DateEntryOffice)
                    throw new Exception("The date of entry office cann't be before the start date of working!");
            }
            foreach (var role in employee.Roles)
            {
                foreach (var role2 in employee.Roles)
                {
                    if (role != role2)
                    {
                        if (role.Role.Name == role2.Role.Name)
                        {
                            throw new Exception("Each role can only be held once");
                        }
                    }
                }
            }

            await _employeeRepository.UpdateAsync(id, employee);
            return employee;
        }
    }
}
