using AutoMapper;
using EmployeesServer.API.Models;
using EmployeesServer.Core.Entities;

namespace EmployeesServer.API.Mapping
{
    public class PostModelMappingProfile:Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<RoleOfEmployeePostModel, RoleOfEmployee>().ReverseMap();
        }
    }
}
