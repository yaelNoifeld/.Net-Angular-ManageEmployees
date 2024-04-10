namespace EmployeesServer.API.Models
{
    public class RoleOfEmployeePostModel
    {
        public RolePostModel Role { get; set; }
        public bool IsManageRole { get; set; }
        public DateTime DateEntryOffice { get; set; }
    }
}
