namespace EmployeeManagement.Models
{
    using System.Data.Entity;

    public partial class EmployeeDB : DbContext
    {
        public EmployeeDB()
            : base("name=EmployeeDB")
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeePosition> EmployeePositions { get; set; }
        public virtual DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasKey(e => e.Id)
                .HasMany(e => e.EmployeePositions)
                .WithRequired(e => e.Employee)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Position>()
                .HasKey(e => e.Id)
                .HasMany(e => e.EmployeePositions)
                .WithRequired(e => e.Position)
                .WillCascadeOnDelete(false);
        }
    }
}
