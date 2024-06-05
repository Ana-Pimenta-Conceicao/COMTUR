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
           RegistrarAuditoria();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            RegistrarAuditoria(); 
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

            //Adicionando Tipos de Usuario para teste
            modelBuilder.Entity<UsuarioModel>().HasData(
            new UsuarioModel { Id = 1, Nome = "Usuário", Telefone = "(11) 11111-1111", EmailUsuario = "usuario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Usuario },
            new UsuarioModel { Id = 2, Nome = "Funcionário", Telefone = "(22) 22222-2222", EmailUsuario = "funcionario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Funcionario },
            new UsuarioModel { Id = 3, Nome = "Empresário", Telefone = "(33) 33333-3333", EmailUsuario = "empresario@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Empresario },
            new UsuarioModel { Id = 4, Nome = "Administrador", Telefone = "(44) 44444-4444", EmailUsuario = "administrador@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Administrador }
            );

			//Adicionando Empresarios para teste
			modelBuilder.Entity<UsuarioModel>().HasData(
			new UsuarioModel { Id = 5, Nome = "Ana", Telefone = "(55) 5555-5555", EmailUsuario = "ana@gmail.com", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Empresario },
			new UsuarioModel { Id = 6, Nome = "Tropicale", Telefone = "(17) 3632-0117", EmailUsuario = "atendimento@lojatropicale.com.br", SenhaUsuario = "123456", TipoUsuario = TipoUsuario.Empresario }
			);

			//Adicionando TipoTurismo para teste
			modelBuilder.Entity<TipoTurismoModel>().HasData(
            new TipoTurismoModel { Id = 1, Nome = "Expo", IdUsuario = 4 }
            );

			//Adicionando TipoTurismo para teste
			modelBuilder.Entity<TipoTurismoModel>().HasData(
			new TipoTurismoModel { Id = 2, Nome = "Varejo", IdUsuario = 4 }
			);

			//Adicionando TipoTurismo para teste
			modelBuilder.Entity<TipoTurismoModel>().HasData(
			new TipoTurismoModel { Id = 3, Nome = "Alimento", IdUsuario = 4 }
			);

			//Adicionando TipoAtracao para teste
			modelBuilder.Entity<TipoAtracaoModel>().HasData(
            new TipoAtracaoModel { Id = 1, Nome = "Show", IdUsuario = 4 }
            );

            //Adicionando Empresa para teste
            modelBuilder.Entity<EmpresaModel>().HasData(
            new EmpresaModel { Id = 1, Nome = "AnaStore", CNPJ = "12.345.678/9012-34", Endereco = "Rua Ana Carolina, 0902 - Jardim Aana, Jales - SP, 15700-123", Descricao = "Em AnaStore, acreditamos que cada pessoa tem sua própria história para contar, e é por isso que oferecemos uma seleção cuidadosamente analisada de roupas e acessórios que abraçam uma variedade de estilos, desde o casual chic até o elegante e sofisticado. Nossas coleções são atualizadas regularmente para garantir que nossos clientes sempre encontrem algo novo e empolgante a cada visita.", IdUsuario = 5, IdTipoTurismo = 2 }
            );

			//Adicionando Empresa para teste
			modelBuilder.Entity<EmpresaModel>().HasData(
			new EmpresaModel { Id = 2, Nome = "Tropicale Brasil Sorvetes", CNPJ = " 30.475.124/0001-94 ", Endereco = "Rua Prof. Rubião Meira, 4120 - Jardim Paulista, Jales - SP, 15700-426", Descricao = "A Tropicale oferece uma experiência única ao priorizar a qualidade em todas as etapas, desde a seleção dos ingredientes até o armazenamento dos sorvetes. Equipada com tecnologia de ponta, proporciona um ambiente acolhedor para famílias e amigos desfrutarem momentos especiais juntos. O cardápio diversificado inclui sorvetes de massa, picolés de fruta e ao leite, picolés gourmet e opções sem lactose.", IdUsuario = 6, IdTipoTurismo = 3 }
			);

			//Adicionando Atracao para teste
			modelBuilder.Entity<AtracaoModel>().HasData(
            new AtracaoModel { Id = 1, Nome = "Ana Castela", Descricao = "Show da Ana Castela", QRCode = "123456", IdTipoAtracao = 1, IdTurismo = 1, IdUsuario = 4 }
            );
            //Adicionando Atracao para teste
            modelBuilder.Entity<AtracaoModel>().HasData(
            new AtracaoModel { Id = 3, Nome = "Fernando Lima", Descricao = "Show do Fernando Lima", QRCode = "123456", IdTipoAtracao = 1, IdTurismo = 1, IdUsuario = 4 }
            );
            //Adicionando Atracao para teste
            modelBuilder.Entity<AtracaoModel>().HasData(
            new AtracaoModel { Id = 2, Nome = "Gustavo Perdido", Descricao = "Show do Gustavo Perdido", QRCode = "123456", IdTipoAtracao = 1, IdTurismo = 1, IdUsuario = 4 }
            );
            //Adicionando Turismo para teste
            modelBuilder.Entity<TurismoModel>().HasData(
            new TurismoModel { Id = 1, Nome = "Praça da Fonte", Descricao = "Praça da Fonte", Horario = "18:00", QRCode = "123456", Local = "Praça da Fonte", DiaFuncionamento = "Todos os dias", IdUsuario = 2, IdTipoTurismo = 1 }
            );

            //Adicionando noticia para teste
            modelBuilder.Entity<NoticiaModel>().HasData(
            new NoticiaModel { Id = 1, Titulo = "Grande Inauguração da AnaStore: Uma Celebração de Estilo e Elegância!", Subtitulo = "A cidade de Jales recebeu hoje um novo marco na indústria da moda com a inauguração triunfante da AnaStore, uma loja que promete revolucionar o cenário fashion local.", Conteudo = "Hoje, a cidade de Jales testemunhou um marco na cena da moda local com a grandiosa inauguração da AnaStore, a mais recente empreitada da renomada empresária Ana Carolina. Situada no coração da área comercial, a loja promete revolucionar o estilo dos moradores locais com suas coleções exclusivas e uma abordagem única para moda e estilo.\r\n\r\nCom uma cerimônia de inauguração repleta de glamour e entusiasmo, a Sra. Ana Carolina expressou sua gratidão pela calorosa recepção que a comunidade de Jales ofereceu à sua mais recente iniciativa empresarial. \"A AnaStore não é apenas uma loja de roupas, é um espaço onde a moda encontra a expressão pessoal. Queremos ser mais do que apenas uma opção de compras, queremos ser uma fonte de inspiração para todos aqueles que desejam expressar sua individualidade através do estilo\", afirmou a visionária empresária.\r\n\r\nOs clientes que compareceram ao evento de inauguração foram recebidos com um desfile de moda exclusivo, apresentando as últimas tendências e peças selecionadas cuidadosamente pela equipe da AnaStore. De vestuário casual a trajes de gala, a loja oferece uma ampla variedade de opções para atender a todos os gostos e ocasiões.\r\n\r\nAlém de oferecer uma experiência de compra excepcional, a AnaStore também se compromete com a sustentabilidade ambiental e social. \"Estamos empenhados em promover práticas comerciais éticas e sustentáveis, desde a escolha dos materiais até as condições de trabalho em nossas fábricas parceiras. Queremos que nossos clientes se sintam bem não apenas com suas escolhas de moda, mas também com o impacto positivo que estão causando no mundo\", ressaltou Ana Carolina.\r\n\r\nA AnaStore já se destaca como um destino imperdível para os amantes da moda em Jales, e sua inauguração promete ser apenas o começo de uma jornada emocionante rumo ao sucesso e à inovação na indústria da moda local. ", DataPublicacao = new DateOnly(2024, 5, 15), HoraPublicacao = "10:30", IdUsuario = 2 }
            );

			//Adicionando noticia para teste
			modelBuilder.Entity<NoticiaModel>().HasData(
			new NoticiaModel { Id = 2, Titulo = "Tropicale Lança Novo Sabor chamado Laravi: Uma Explosão Cítrica de Sabor!", Subtitulo = "Combinando a refrescância da laranja com a suavidade do sorvete, \"Laravi\" promete ser uma verdadeira explosão cítrica de sabor que cativará os paladares de todos.", Conteudo = "Os aficionados por sorvete têm motivos para comemorar com o mais recente lançamento da Tropicale, uma das principais marcas de sorvetes do país. Hoje, a empresa revelou seu mais novo sabor de dar água na boca: \"Laravi\", uma deliciosa combinação de frescor e doçura inspirada na laranja.\r\n\r\nCom a chegada do verão, a Tropicale decidiu elevar a experiência dos consumidores com uma criação que captura o sabor vibrante e refrescante da fruta cítrica favorita de muitos. O sabor \"Laravi\" promete oferecer uma explosão de sabor a cada colherada, combinando o suculento aroma da laranja com a suavidade e cremosidade característica dos sorvetes da marca.\r\n\r\nEm uma entrevista exclusiva, o diretor de desenvolvimento de produtos da Tropicale, Carlos Mendes, compartilhou insights sobre a inspiração por trás do novo sabor. \"Queríamos criar algo verdadeiramente único que despertasse a nostalgia do verão e proporcionasse uma experiência memorável aos nossos clientes. O 'Laravi' é uma homenagem à simplicidade e à autenticidade da laranja, e estamos confiantes de que será um sucesso entre os amantes de sorvete de todas as idades\", afirmou Mendes.\r\n\r\nAlém de seu irresistível sabor, o \"Laravi\" também se destaca por sua composição de alta qualidade, feita com ingredientes naturais e frescos. A Tropicale reiterou seu compromisso com a excelência e a inovação, garantindo que cada porção de sorvete seja uma experiência verdadeiramente indulgente e satisfatória.\r\n\r\nO lançamento do sabor \"Laravi\" já está gerando grande expectativa entre os consumidores, que mal podem esperar para experimentar essa nova criação da Tropicale. Com sua promessa de refrescar os dias quentes de verão com uma explosão de sabor, o \"Laravi\" está pronto para se tornar o novo favorito entre os apreciadores de sorvete em todo o país.", DataPublicacao = new DateOnly(2024, 5, 27), HoraPublicacao = "08:30", IdUsuario = 2 }
			);
		}
    }
}