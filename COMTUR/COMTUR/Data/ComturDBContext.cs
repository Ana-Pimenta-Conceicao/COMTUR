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
        public DbSet<TipoAtracaoModel> TipoAtracao { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new TipoTurismoMap());
            modelBuilder.ApplyConfiguration(new TipoAtracaoMap());

            base.OnModelCreating(modelBuilder);
		}
	}
}
