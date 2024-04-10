using AutoMapper;
using EmployeesServer.API.Models;
using EmployeesServer.Core.DTOs;
using EmployeesServer.Core.Entities;
using EmployeesServer.Core.Services;
using EmployeesServer.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            var employeesDto = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
            return Ok(employeesDto);
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                var employee = await _employeeService.GetByIdAsync(id);
                var employeeDto = _mapper.Map<EmployeeDto>(employee);
                return Ok(employeeDto);
            }
            catch(Exception ex)
            {
                return NotFound();
            }
        }

        // POST api/<EmployeesController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            try
            {
                var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(employee));
                return Ok(_mapper.Map<EmployeeDto>(newEmployee));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            try
            {
                var updatedEmployee = await _employeeService.UpdateAsync(id, _mapper.Map<Employee>(employee));
                if (updatedEmployee == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<EmployeeDto>(updatedEmployee));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Delete(int id)
        {
            try
            {
                await _employeeService.DeleteByIdAsync(id);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
