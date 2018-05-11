using System.Linq;
using EmployeeManagement.Models;

namespace EmployeeManagement.Repositories.Interfaces
{
    interface IPositionRepository: IRepository<Position>
    {
        bool Exists(int id);
    }
}
