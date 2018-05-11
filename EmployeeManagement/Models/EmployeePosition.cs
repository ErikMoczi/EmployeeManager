namespace EmployeeManagement.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    [JsonObject(IsReference = false, ItemReferenceLoopHandling = ReferenceLoopHandling.Ignore)]
    [Table("EmployeePosition")]
    public partial class EmployeePosition
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        [ForeignKey("Position")]
        public int PositionId { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime FromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ToDate { get; set; }

        [JsonIgnore]
        [JsonProperty(IsReference = false)]
        public virtual Employee Employee { get; set; }

        [JsonProperty(IsReference = false)]
        public virtual Position Position { get; set; }
    }
}
