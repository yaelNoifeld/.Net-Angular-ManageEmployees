using EmployeesServer.Core.Entities;
using EmployeesServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            var rolsOfEmployee = new List<RoleOfEmployee> { };
            employee.IsActive = true;
            foreach (var role in employee.Roles)
            {
                var existRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name.Equals(role.Role.Name));
                if (existRole == null)
                {
                    Console.WriteLine("Role not found.");
                    throw new Exception("Role not found.");
                }

                RoleOfEmployee roleOfEmployee = new RoleOfEmployee
                {
                    Role = existRole,
                    IsManageRole = false,
                    DateEntryOffice = DateTime.Now
                };
                rolsOfEmployee.Add(roleOfEmployee);
            }

            employee.Roles = rolsOfEmployee;

            _context.Employees.Add(employee);

            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteByIdAsync(int id)
        {
            var e = (await _context.Employees.FirstOrDefaultAsync(e => e.Id == id));
            if (e == null)
                throw new Exception("Employee isn't exist in the DB");
            e.IsActive = false;
            await _context.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.Where(e => e.IsActive).Include(e => e.Roles)
                .ThenInclude(r => r.Role).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {

            var employee = await _context.Employees.Include(e => e.Roles).ThenInclude(r=>r.Role)
                .FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                throw new Exception("Employee is not exist in the DB");
            return employee;
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            var existEmployee = await _context.Employees.FirstAsync(e => e.Id == id);

            if (existEmployee != null)
            {
                existEmployee.FirstName = employee.FirstName;
                existEmployee.LastName = employee.LastName;
                existEmployee.IdCard = employee.IdCard;
                existEmployee.StartDate = employee.StartDate;
                existEmployee.DateBirth = employee.DateBirth;
                existEmployee.Gender = employee.Gender;
                existEmployee.IsActive = true;

                var rolsOfEmployee = new List<RoleOfEmployee> { };
                employee.IsActive = true;
                foreach (var role in employee.Roles)
                {
                    var existRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name.Equals(role.Role.Name));
                    if (existRole == null)
                    {
                        Console.WriteLine("Role not found.");
                        throw new Exception("Role not found.");
                    }

                    RoleOfEmployee roleOfEmployee = new RoleOfEmployee
                    {
                        Role = existRole,
                        IsManageRole = false,
                        DateEntryOffice = DateTime.Now
                    };
                    rolsOfEmployee.Add(roleOfEmployee);
                }

                employee.Roles = rolsOfEmployee;

                await _context.SaveChangesAsync();
                return existEmployee;
            }
            throw new Exception("Employee is not exist");
        }
    }
}
