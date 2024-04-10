using EmployeesServer.Core.Entities;
using EmployeesServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Data.Repositories
{
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Role> AddAsync(Role role)
        {
            if (_context.Roles.Any(r => r.Name == role.Name))
            {
                throw new Exception("Role with the same name already exists.");
            }
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        public async Task DeleteByIdAsync(int id)
        {
            Role role = await GetByIdAsync(id);
            if (role == null)
                throw new Exception("Role isn't exist in the DB");
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            Role role = await _context.Roles.FirstAsync(r => r.Id == id);
            if (role == null)
                throw new Exception("Role is not exist in the DB");
            return role;
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            if (_context.Roles.Any(r => r.Name == role.Name))
            {
                throw new Exception("Role with the same name already exists.");
            }
            var existRole = await _context.Roles.FirstAsync(r => r.Id == id);
            if (role == null)
                throw new Exception("Role isn't exist in the DB");
            if (existRole != null)
            {
                existRole.Name = role.Name;
                await _context.SaveChangesAsync();
                return existRole;
            }
            return null;
        }
    }
}
