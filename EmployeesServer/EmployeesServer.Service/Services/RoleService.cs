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
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<Role> AddAsync(Role role)
        {
            await _roleRepository.AddAsync(role);
            return role;
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _roleRepository.DeleteByIdAsync(id);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleRepository.GetAllAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            await _roleRepository.UpdateAsync(id, role);
            return role;
        }
    }
}
