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
    public class AppointmentController : ControllerBase
    {
        private ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Appointment> Get()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Appointment[] appointments = null;
            _context.Appointments.Where(a => a.UserId == userId).ToArray();

            return appointments;
        }
        [HttpPost]
        public Appointment Post([FromBody] Appointment appointment)
        {
            appointment.UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return appointment;
        }
    }
}
