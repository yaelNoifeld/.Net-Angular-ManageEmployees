using EmployeesServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesServer.Core.Repositories
{
    public interface IRoleRepository
    {
        public Task<IEnumerable<Role>> GetAllAsync();
        public Task<Role> GetByIdAsync(int id);
        public Task<Role> AddAsync(Role role);
        public Task<Role> UpdateAsync(int id, Role role);
        public Task DeleteByIdAsync(int id);
    }
}
