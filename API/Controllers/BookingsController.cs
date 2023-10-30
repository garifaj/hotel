using API.Data;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        public BookingsController (ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpGet ("bookings")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            return await _context.Bookings.ToListAsync();
        }

        [HttpPost("bookings")]
        // Requires authentication to access this endpoint
        public IActionResult CreateBooking( Booking booking)
        {
            try
            {
                // Retrieve the user's ID from the JWT token
                var jwt = Request.Cookies["jwt"];

                // Verify the JWT token and extract the user's ID
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);

                // You can access the booking data here, including UserId, RoomId, CheckInDate, CheckOutDate.
                // Perform validation and business logic as needed.

                // Example: Saving the booking to the database
                booking.UserId = userId; // Set the UserId based on the authenticated user
                _context.Bookings.Add(booking);
                _context.SaveChanges();

                return Ok("Booking created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest("Booking creation failed. " + ex.Message);
            }
        }
        [HttpDelete("bookings/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
