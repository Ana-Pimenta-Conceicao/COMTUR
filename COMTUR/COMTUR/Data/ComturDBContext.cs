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
		public DbSet<NoticiaModel> Noticia { get; set; }
		public DbSet<EmpresarioModel> Empresario { get; set; }
		public DbSet<AdministradorModel> Administrador { get; set; }
		public DbSet<AtracaoModel> Atracao { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new TipoTurismoMap());
			modelBuilder.ApplyConfiguration(new TipoAtracaoMap());
			modelBuilder.ApplyConfiguration(new NoticiaMap());
			modelBuilder.ApplyConfiguration(new EmpresarioMap());
			modelBuilder.ApplyConfiguration(new AdministradorMap());
			modelBuilder.ApplyConfiguration(new AtracaoMap());

			base.OnModelCreating(modelBuilder);

		}
	}
}