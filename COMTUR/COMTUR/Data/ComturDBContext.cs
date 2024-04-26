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
		public DbSet<ImagemTurismoModel> ImagemTurismo { get; set; }
		public DbSet<AnuncioModel> Anuncio { get; set; }
		public DbSet<SessaoModel> Sessao { get; set; }

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
			modelBuilder.ApplyConfiguration(new ImagemTurismoMap());
			modelBuilder.ApplyConfiguration(new AnuncioMap());
			modelBuilder.ApplyConfiguration(new  SessaoMap());

			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<UsuarioModel>().HasData(
		
			new UsuarioModel { Id = 1, Nome = "Usuário", Telefone = "(11) 11111-1111", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Usuario },
			new UsuarioModel { Id = 2, Nome = "Funcionário", Telefone = "(22) 22222-2222", EmailUsuario = "funcionario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Funcionario },
			new UsuarioModel { Id = 3, Nome = "Empresário", Telefone = "(33) 33333-3333", EmailUsuario = "empresario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Empresario },
			new UsuarioModel { Id = 4, Nome = "Administrador", Telefone = "(44) 44444-4444", EmailUsuario = "administrador@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Administrador }
			);
		}
	}
}