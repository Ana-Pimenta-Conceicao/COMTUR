using Microsoft.EntityFrameworkCore;
using COMTUR.Models;
using COMTUR.Data.Map;
using COMTUR.Models.Enum;

namespace COMTUR.Data
{
	public class ComturDBContext : DbContext
	{
		public ComturDBContext(DbContextOptions<ComturDBContext> options) : base(options)
		{}
		public DbSet<TipoTurismoModel> TipoTurismo { get; set; }
		public DbSet<TipoAtracaoModel> TipoAtracao { get; set; }
		public DbSet<NoticiaModel> Noticia { get; set; }
		public DbSet<AtracaoModel> Atracao { get; set; }
		public DbSet<EmpresaModel> Empresa { get; set; }
		public DbSet<UsuarioModel> Usuario { get; set; }
		public DbSet<ImagemNoticiaModel> ImagemNoticia { get; set; }
		public DbSet<ImagemAtracaoModel> ImagemAtracao { get; set; }
		public DbSet<ImagemEmpresaModel> ImagemEmpresa { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new TipoTurismoMap());
			modelBuilder.ApplyConfiguration(new TipoAtracaoMap());
			modelBuilder.ApplyConfiguration(new NoticiaMap());
			modelBuilder.ApplyConfiguration(new AtracaoMap());
			modelBuilder.ApplyConfiguration(new EmpresaMap());
			modelBuilder.ApplyConfiguration(new UsuarioMap());
			modelBuilder.ApplyConfiguration(new ImagemNoticiaMap());
			modelBuilder.ApplyConfiguration(new ImagemAtracaoMap());
			modelBuilder.ApplyConfiguration(new ImagemEmpresaMap());

			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<UsuarioModel>().HasData(
		
			new UsuarioModel { Id = 1, Nome = "usuario", Telefone = "123456", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "usuario", TipoUsuario = TipoUsuario.Usuario },
			new UsuarioModel { Id = 2, Nome = "funcionario", Telefone = "123456", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "funcionario", TipoUsuario = TipoUsuario.Funcionario },
			new UsuarioModel { Id = 3, Nome = "empresario", Telefone = "123456", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "empresario", TipoUsuario = TipoUsuario.Empresario },
			new UsuarioModel { Id = 4, Nome = "administrador", Telefone = "123456", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "administrador", TipoUsuario = TipoUsuario.Administrador }
			);
		}
	}
}