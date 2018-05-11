using EmployeeManagement.Models;

namespace EmployeeManagement.Repositories.Interfaces
{
    interface IEmployeePositionRepository: IRepository<EmployeePosition>
    {
        bool Exists(int id);
    }
}
