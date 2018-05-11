using EmployeeManagement.Models;

namespace EmployeeManagement.Repositories.Interfaces
{
    interface IEmployeeRepository: IRepository<Employee>
    {
        bool Exists(int id);
    }
}
