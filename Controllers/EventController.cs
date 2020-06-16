using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace capstone.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EventController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Event[] events = null;
            events = _context.Events.Where(a => a.UserId == userId).ToArray();

            return events;
        }
        [HttpPost]
        public Event Post([FromBody] Event calendarEvent)
        {
            calendarEvent.UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _context.Events.Add(calendarEvent);
            _context.SaveChanges();
            return calendarEvent;
        }

        [HttpDelete("{id}")]
        public async Task<Event> Delete(int id)
        {
            var del = await _context.Events.FindAsync(id);

            if (del != null)
                _context.Remove(del);

            await _context.SaveChangesAsync();

            return del;
        }

    }
}