using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeManagement.Models;
using EmployeeManagement.Repositories;
using EmployeeManagement.Repositories.Interfaces;

namespace EmployeeManagement.Controllers
{
    public class PositionController : ApiController
    {
        private IPositionRepository positionRepository = new PositionRepository();

        // GET: api/Position
        public IQueryable<Position> GetPositions()
        {
            return positionRepository.Get();
        }

        // GET: api/Position/5
        [ResponseType(typeof(Position))]
        public IHttpActionResult GetPosition(int id)
        {
            Position position = positionRepository.GetById(id);
            if (position == null)
            {
                return NotFound();
            }

            return Ok(position);
        }

        // PUT: api/Position/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPosition(int id, Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != position.Id)
            {
                return BadRequest();
            }

            positionRepository.Update(position);

            try
            {
                positionRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!positionRepository.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(position);
        }

        // POST: api/Position
        [ResponseType(typeof(Position))]
        public IHttpActionResult PostPosition(Position position)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            positionRepository.Insert(position);
            positionRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = position.Id }, position);
        }

        // DELETE: api/Position/5
        [ResponseType(typeof(Position))]
        public IHttpActionResult DeletePosition(int id)
        {
            Position position = positionRepository.GetById(id);
            if (position == null)
            {
                return NotFound();
            }

            positionRepository.Delete(position);
            positionRepository.SaveChanges();

            return Ok(position);
        }
    }
}