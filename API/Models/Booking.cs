namespace API.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal Price { get; set; }
        public string RoomImage { get; set; }
        public string RoomTitle { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
    }
}
