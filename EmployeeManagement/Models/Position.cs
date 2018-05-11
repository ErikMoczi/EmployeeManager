namespace EmployeeManagement.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    [JsonObject(IsReference = false, ItemReferenceLoopHandling = ReferenceLoopHandling.Ignore)]
    [Table("Position")]
    public partial class Position
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Position()
        {
            EmployeePositions = new HashSet<EmployeePosition>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Name { get; set; }

        [JsonProperty(IsReference = false)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeePosition> EmployeePositions { get; set; }
    }
}
