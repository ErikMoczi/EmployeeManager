using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeManagement.Models;
using EmployeeManagement.Repositories;
using EmployeeManagement.Repositories.Interfaces;

namespace EmployeeManagement.Controllers
{
    public class EmployeePositionController : ApiController
    {
        private IEmployeePositionRepository employeePositionRepository = new EmployeePositionRepository();

        // GET: api/EmployeePosition
        public IQueryable<EmployeePosition> GetEmployeePositions()
        {
            return employeePositionRepository.Get();
        }

        // GET: api/EmployeePosition/5
        [ResponseType(typeof(EmployeePosition))]
        public IHttpActionResult GetEmployeePosition(int id)
        {
            EmployeePosition employeePosition = employeePositionRepository.GetById(id);
            if (employeePosition == null)
            {
                return NotFound();
            }

            return Ok(employeePosition);
        }

        // PUT: api/EmployeePosition/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployeePosition(int id, EmployeePosition employeePosition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employeePosition.Id)
            {
                return BadRequest();
            }

            employeePositionRepository.Update(employeePosition);

            try
            {
                employeePositionRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!employeePositionRepository.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeePositionRepository);
        }

        // POST: api/EmployeePosition
        [ResponseType(typeof(EmployeePosition))]
        public IHttpActionResult PostEmployeePosition(EmployeePosition employeePosition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            employeePositionRepository.Insert(employeePosition);
            employeePositionRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employeePosition.Id }, employeePosition);
        }

        // DELETE: api/EmployeePosition/5
        [ResponseType(typeof(EmployeePosition))]
        public IHttpActionResult DeleteEmployeePosition(int id)
        {
            EmployeePosition employeePosition = employeePositionRepository.GetById(id);
            if (employeePosition == null)
            {
                return NotFound();
            }

            employeePositionRepository.Delete(employeePosition);
            employeePositionRepository.SaveChanges();

            return Ok(employeePosition);
        }
    }
}