using System.Data.Entity;
using System.Linq;
using EmployeeManagement.Models;
using EmployeeManagement.Repositories.Interfaces;

namespace EmployeeManagement.Repositories
{
    public class PositionRepository : Repository<Position>, IPositionRepository
    {
        public bool Exists(int id)
        {
            return DbSet.Count(e => e.Id == id) > 0;
        }        
    }
}