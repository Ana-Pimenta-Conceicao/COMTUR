using Microsoft.EntityFrameworkCore;
using COMTUR.Models;
using COMTUR.Data.Map;
using COMTUR.Models.Enum;

namespace COMTUR.Data
{
    public class ComturDBContext : DbContext
    {
        public ComturDBContext(DbContextOptions<ComturDBContext> options) : base(options)
        { }
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
        public DbSet<AuditoriaModel> Auditoria { get; set; }

        public override int SaveChanges()
        {
           // RegistrarAuditoria();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //RegistrarAuditoria(); 
            return base.SaveChangesAsync(cancellationToken);
        }

        private void RegistrarAuditoria()
        {
            var entidadesModificadas = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified || e.State == EntityState.Deleted)
                .Select(e => new
                {
                    NomeEntidade = e.Metadata.Name,
                    Operacao = e.State.ToString(),
                    ValoresAntigos = e.State != EntityState.Added ? e.OriginalValues.Properties.ToDictionary(p => p.Name, p => e.OriginalValues[p]) : null,
                    NovosValores = e.State != EntityState.Deleted ? e.CurrentValues.Properties.ToDictionary(p => p.Name, p => e.CurrentValues[p]) : null,


                });

            var modificações = new List<AuditoriaModel>();

            string TraduzirOperacao(string estado)
            {
                switch (estado)
                {
                    case nameof(EntityState.Added):
                        return "Adicionado";
                    case nameof(EntityState.Modified):
                        return "Modificado";
                    case nameof(EntityState.Deleted):
                        return "Excluído";
                    default:
                        return "Desconhecido";
                }
            }

            string ExtrairNomeEntidade(string nomeCompleto)
            {
                // Obtém apenas o nome da classe removendo o namespace e o sufixo "Model"
                var nomeSemNamespace = nomeCompleto.Split('.').LastOrDefault();
                return nomeSemNamespace?.Replace("Model", string.Empty);
            }

            foreach (var entidadeModificada in entidadesModificadas)
            {
                // Criar uma instância de Auditoria
                Console.WriteLine($"Operação: {entidadeModificada.Operacao}, Entidade: {entidadeModificada.NomeEntidade}, Valores Antigos: {entidadeModificada.ValoresAntigos}, Novos Valores: {entidadeModificada.NovosValores}");
                var auditoria = new AuditoriaModel
                {
                    Operacao = TraduzirOperacao(entidadeModificada.Operacao),
                    NomeEntidade = ExtrairNomeEntidade(entidadeModificada.NomeEntidade),
                    ValoresAntigos = entidadeModificada.ValoresAntigos != null ? Newtonsoft.Json.JsonConvert.SerializeObject(entidadeModificada.ValoresAntigos) : null,
                    NovosValores = Newtonsoft.Json.JsonConvert.SerializeObject(entidadeModificada.NovosValores),
                    IdUsuario = (int) (entidadeModificada.Operacao == EntityState.Added.ToString() || entidadeModificada.Operacao == EntityState.Modified.ToString()
                    ? entidadeModificada.NovosValores["IdUsuario"]
                    : entidadeModificada.Operacao == EntityState.Deleted.ToString()
                        ? entidadeModificada.ValoresAntigos["IdUsuario"]
                        : 0)
                }; auditoria.ObterData(); auditoria.ObterHora();

                modificações.Add(auditoria);
            }

            foreach (var modificação in modificações)
            {
                this.Auditoria.Add(modificação);
            }
        }

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
            new TipoTurismoModel { Id = 1, Nome = "Expo", IdUsuario = 4 }
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