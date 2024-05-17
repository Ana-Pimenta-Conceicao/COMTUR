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
		public DbSet<SessaoModel> Sessao { get; set; }
		public DbSet<TurismoModel> Turismo { get; set; }

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
			modelBuilder.ApplyConfiguration(new SessaoMap());
			modelBuilder.ApplyConfiguration(new TurismoMap());

			base.OnModelCreating(modelBuilder);

			//Adicionando Usuario para teste
			modelBuilder.Entity<UsuarioModel>().HasData(
			new UsuarioModel { Id = 1, Nome = "Usuário", Telefone = "(11) 11111-1111", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Usuario },
			new UsuarioModel { Id = 2, Nome = "Funcionário", Telefone = "(22) 22222-2222", EmailUsuario = "funcionario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Funcionario },
			new UsuarioModel { Id = 3, Nome = "Empresário", Telefone = "(33) 33333-3333", EmailUsuario = "empresario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Empresario },
			new UsuarioModel { Id = 4, Nome = "Administrador", Telefone = "(44) 44444-4444", EmailUsuario = "administrador@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Administrador }
			);

			//Adicionando TipoTurismo para teste
			modelBuilder.Entity<TipoTurismoModel>().HasData(
			new TipoTurismoModel { Id = 1, Nome = "Expo" }
			);

			//Adicionando TipoAtracao para teste
			modelBuilder.Entity<TipoAtracaoModel>().HasData(
			new TipoAtracaoModel { Id = 1, Nome = "Show" }
			);

			//Adicionando Empresa para teste
			modelBuilder.Entity<EmpresaModel>().HasData(
			new EmpresaModel { Id = 1, Nome = "AnaStore", CNPJ = 123456, Endereco = "Rua das Maravilhas", Descricao = "Ana Rainha o resto NADINHA", IdUsuario = 3, IdTipoTurismo = 1 }
			);

			//Adicionando Atracao para teste
			modelBuilder.Entity<AtracaoModel>().HasData(
			new AtracaoModel { Id = 1, Nome = "Ana Castela", Descricao = "Show da Ana Castela", QRCode = "123456", IdTipoAtracao = 1, IdTurismo = 1, IdUsuario = 4 }
			);

			//Adicionando Turismo para teste
			modelBuilder.Entity<TurismoModel>().HasData(
			new TurismoModel { Id = 1, Nome = "Praça da Fonte", Descricao = "Praça da Fonte", Horario = "18:00", QRCode = "123456", Local = "Praça da Fonte", DiaFuncionamento = "Todos os dias", IdUsuario = 2, IdTipoTurismo = 1 }
			);

			//Adicionando noticia para teste
			modelBuilder.Entity<NoticiaModel>().HasData(
			new NoticiaModel { Id = 1, Titulo = "AnaStore finalmente é inaugurada", Subtitulo = "A loja mais divonica agora está em espaço fisíco", Conteudo = "O fenomeno das redes sociais, AnaStore, agora conta com uma loja fisica", DataPublicacao = new DateOnly(2024, 5, 15), HoraPublicacao = "10:30", IdUsuario = 2 }
			);
		}
	}
}