using AutoMapper;
using EmployeesServer.API.Models;
using EmployeesServer.Core.DTOs;
using EmployeesServer.Core.Entities;
using EmployeesServer.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RolesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = await _roleService.GetAllAsync();
            var rolesDto = _mapper.Map<IEnumerable<RoleDto>>(roles);
            return Ok(rolesDto);
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                var role = await _roleService.GetByIdAsync(id);
                var roleDto = _mapper.Map<RoleDto>(role);
                return Ok(roleDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<RolesController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            try
            {
                var newRole = await _roleService.AddAsync(_mapper.Map<Role>(role));
                return Ok(_mapper.Map<RoleDto>(newRole));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel role)
        {
            try
            {
                var updatedRole = await _roleService.UpdateAsync(id, _mapper.Map<Role>(role));
                return Ok(_mapper.Map<RoleDto>(updatedRole));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Delete(int id)
        {
            try
            {
                await _roleService.DeleteByIdAsync(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
    }
}
