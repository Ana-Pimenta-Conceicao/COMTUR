using Microsoft.EntityFrameworkCore;
using COMTUR.Models;
using COMTUR.Data.Map;

namespace COMTUR.Data
{
	public class ComturDBContext : DbContext
	{
		public ComturDBContext(DbContextOptions<ComturDBContext> options) : base(options)
		{
		}

		public DbSet<TipoTurismoModel> TipoTurismo { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new TipoTurismoMap());

			base.OnModelCreating(modelBuilder);
		}
	}
}
