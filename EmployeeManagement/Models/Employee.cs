namespace EmployeeManagement.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    [JsonObject(IsReference = false, ItemReferenceLoopHandling = ReferenceLoopHandling.Ignore)]
    [Table("Employee")]
    public partial class Employee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Employee()
        {
            EmployeePositions = new HashSet<EmployeePosition>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        [StringLength(20)]
        public string Surname { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        [Column(TypeName = "date")]
        public DateTime? BirthDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? EntryDate { get; set; }

        public int Salary { get; set; }

        [JsonProperty(IsReference = false)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeePosition> EmployeePositions { get; set; }
    }
}
