using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeManagement.Models;
using EmployeeManagement.Repositories;
using EmployeeManagement.Repositories.Interfaces;

namespace EmployeeManagement.Controllers
{
    public class EmployeeController : ApiController
    {
        private IEmployeeRepository employeeRepository = new EmployeeRepository();

        // GET: api/Employee
        public IQueryable<Employee> GetEmployees()
        {
            return employeeRepository.Get();
        }

        // GET: api/Employee/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            Employee employee = employeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employee/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            employeeRepository.Update(employee);            

            try
            {
                employeeRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!employeeRepository.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee);
        }

        // POST: api/Employee
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            employeeRepository.Insert(employee);
            employeeRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employee/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = employeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }

            employeeRepository.Delete(employee);
            employeeRepository.SaveChanges();

            return Ok(employee);
        }
    }
}