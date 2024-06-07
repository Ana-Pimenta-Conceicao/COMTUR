using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace COMTUR.Migrations
{
    /// <inheritdoc />
    public partial class teste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Auditoria",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Data = table.Column<string>(type: "text", nullable: false),
                    Hora = table.Column<string>(type: "text", nullable: false),
                    Operacao = table.Column<string>(type: "text", nullable: false),
                    NomeEntidade = table.Column<string>(type: "text", nullable: false),
                    ValoresAntigos = table.Column<string>(type: "text", nullable: true),
                    NovosValores = table.Column<string>(type: "text", nullable: true),
                    IdUsuario = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auditoria", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idusuario = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    telefone = table.Column<string>(type: "text", nullable: false),
                    emailusuario = table.Column<string>(type: "text", nullable: false),
                    senhausuario = table.Column<string>(type: "text", nullable: false),
                    tipousuario = table.Column<int>(type: "integer", nullable: false),
                    imagemperfilusuario = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.usuarioid);
                });

            migrationBuilder.CreateTable(
                name: "sessao",
                columns: table => new
                {
                    idssessao = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tokensessao = table.Column<string>(type: "text", nullable: false),
                    statussessao = table.Column<bool>(type: "boolean", nullable: false),
                    emailusuario = table.Column<string>(type: "text", nullable: false),
                    nomeusuario = table.Column<string>(type: "text", nullable: false),
                    nivelacesso = table.Column<string>(type: "text", nullable: false),
                    UsuarioModelId = table.Column<int>(type: "integer", nullable: true),
                    idusuario = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sessao", x => x.idssessao);
                    table.ForeignKey(
                        name: "FK_sessao_usuario_UsuarioModelId",
                        column: x => x.UsuarioModelId,
                        principalTable: "usuario",
                        principalColumn: "usuarioid");
                });

            migrationBuilder.CreateTable(
                name: "tipoatracao",
                columns: table => new
                {
                    tipoatracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoatracao", x => x.tipoatracaoid);
                    table.ForeignKey(
                        name: "FK_tipoatracao_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tipoturismo",
                columns: table => new
                {
                    tipoturismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    imagemtipoturismo = table.Column<string>(type: "text", nullable: true),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoturismo", x => x.tipoturismoid);
                    table.ForeignKey(
                        name: "FK_tipoturismo_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "empresa",
                columns: table => new
                {
                    empresaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cnpj = table.Column<string>(type: "text", nullable: false),
                    endereco = table.Column<string>(type: "text", nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: false),
                    tipoturismoid = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false),
                    TipoTurismoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empresa", x => x.empresaid);
                    table.ForeignKey(
                        name: "FK_empresa_tipoturismo_TipoTurismoModelId",
                        column: x => x.TipoTurismoModelId,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid");
                    table.ForeignKey(
                        name: "FK_empresa_tipoturismo_tipoturismoid",
                        column: x => x.tipoturismoid,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_empresa_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "turismo",
                columns: table => new
                {
                    turismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: false),
                    horario = table.Column<string>(type: "text", nullable: false),
                    qrcode = table.Column<string>(type: "text", nullable: false),
                    local = table.Column<string>(type: "text", nullable: false),
                    diafuncionamento = table.Column<string>(type: "text", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false),
                    idtipoturismo = table.Column<int>(type: "integer", nullable: false),
                    TipoTurismoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_turismo", x => x.turismoid);
                    table.ForeignKey(
                        name: "FK_turismo_tipoturismo_TipoTurismoModelId",
                        column: x => x.TipoTurismoModelId,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid");
                    table.ForeignKey(
                        name: "FK_turismo_tipoturismo_idtipoturismo",
                        column: x => x.idtipoturismo,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_turismo_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagemempresa",
                columns: table => new
                {
                    imagemempresaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    idempresa = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemempresa", x => x.imagemempresaid);
                    table.ForeignKey(
                        name: "FK_imagemempresa_empresa_idempresa",
                        column: x => x.idempresa,
                        principalTable: "empresa",
                        principalColumn: "empresaid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_imagemempresa_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "atracao",
                columns: table => new
                {
                    atracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: false),
                    qrcode = table.Column<string>(type: "text", nullable: false),
                    idtipoatracao = table.Column<int>(type: "integer", nullable: false),
                    idturismo = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false),
                    TipoAtracaoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_atracao", x => x.atracaoid);
                    table.ForeignKey(
                        name: "FK_atracao_tipoatracao_TipoAtracaoModelId",
                        column: x => x.TipoAtracaoModelId,
                        principalTable: "tipoatracao",
                        principalColumn: "tipoatracaoid");
                    table.ForeignKey(
                        name: "FK_atracao_tipoatracao_idtipoatracao",
                        column: x => x.idtipoatracao,
                        principalTable: "tipoatracao",
                        principalColumn: "tipoatracaoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_atracao_turismo_idturismo",
                        column: x => x.idturismo,
                        principalTable: "turismo",
                        principalColumn: "turismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_atracao_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagemturismo",
                columns: table => new
                {
                    imagemturismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    idturismo = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemturismo", x => x.imagemturismoid);
                    table.ForeignKey(
                        name: "FK_imagemturismo_turismo_idturismo",
                        column: x => x.idturismo,
                        principalTable: "turismo",
                        principalColumn: "turismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_imagemturismo_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "noticia",
                columns: table => new
                {
                    noticiaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    titulo = table.Column<string>(type: "text", nullable: false),
                    subtitulo = table.Column<string>(type: "text", nullable: false),
                    conteudo = table.Column<string>(type: "text", nullable: false),
                    datapublicacao = table.Column<DateOnly>(type: "date", nullable: false),
                    horapublicacao = table.Column<string>(type: "text", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false),
                    idturismo = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_noticia", x => x.noticiaid);
                    table.ForeignKey(
                        name: "FK_noticia_turismo_idturismo",
                        column: x => x.idturismo,
                        principalTable: "turismo",
                        principalColumn: "turismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_noticia_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagematracao",
                columns: table => new
                {
                    imagematracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    idatracao = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagematracao", x => x.imagematracaoid);
                    table.ForeignKey(
                        name: "FK_imagematracao_atracao_idatracao",
                        column: x => x.idatracao,
                        principalTable: "atracao",
                        principalColumn: "atracaoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_imagematracao_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagemnoticia",
                columns: table => new
                {
                    imagemnoticiaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    idnoticia = table.Column<int>(type: "integer", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemnoticia", x => x.imagemnoticiaid);
                    table.ForeignKey(
                        name: "FK_imagemnoticia_noticia_idnoticia",
                        column: x => x.idnoticia,
                        principalTable: "noticia",
                        principalColumn: "noticiaid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_imagemnoticia_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "usuarioid", "emailusuario", "idusuario", "imagemperfilusuario", "nome", "senhausuario", "telefone", "tipousuario" },
                values: new object[,]
                {
                    { 1, "usuario@gmail.com", 0, null, "Usuário", "123456", "(11) 11111-1111", 1 },
                    { 2, "funcionario@gmail.com", 0, null, "Funcionário", "123456", "(22) 22222-2222", 2 },
                    { 3, "empresario@gmail.com", 0, null, "Empresário", "123456", "(33) 33333-3333", 3 },
                    { 4, "administrador@gmail.com", 0, null, "Administrador", "123456", "(44) 44444-4444", 4 },
                    { 5, "ana@gmail.com", 0, null, "Ana", "123456", "(55) 5555-5555", 3 },
                    { 6, "atendimento@lojatropicale.com.br", 0, null, "Tropicale", "123456", "(17) 3632-0117", 3 }
                });

            migrationBuilder.InsertData(
                table: "noticia",
                columns: new[] { "noticiaid", "conteudo", "datapublicacao", "horapublicacao", "idturismo", "usuarioid", "subtitulo", "titulo" },
                values: new object[,]
                {
                    { 1, "Hoje, a cidade de Jales testemunhou um marco na cena da moda local com a grandiosa inauguração da AnaStore, a mais recente empreitada da renomada empresária Ana Carolina. Situada no coração da área comercial, a loja promete revolucionar o estilo dos moradores locais com suas coleções exclusivas e uma abordagem única para moda e estilo.\r\n\r\nCom uma cerimônia de inauguração repleta de glamour e entusiasmo, a Sra. Ana Carolina expressou sua gratidão pela calorosa recepção que a comunidade de Jales ofereceu à sua mais recente iniciativa empresarial. \"A AnaStore não é apenas uma loja de roupas, é um espaço onde a moda encontra a expressão pessoal. Queremos ser mais do que apenas uma opção de compras, queremos ser uma fonte de inspiração para todos aqueles que desejam expressar sua individualidade através do estilo\", afirmou a visionária empresária.\r\n\r\nOs clientes que compareceram ao evento de inauguração foram recebidos com um desfile de moda exclusivo, apresentando as últimas tendências e peças selecionadas cuidadosamente pela equipe da AnaStore. De vestuário casual a trajes de gala, a loja oferece uma ampla variedade de opções para atender a todos os gostos e ocasiões.\r\n\r\nAlém de oferecer uma experiência de compra excepcional, a AnaStore também se compromete com a sustentabilidade ambiental e social. \"Estamos empenhados em promover práticas comerciais éticas e sustentáveis, desde a escolha dos materiais até as condições de trabalho em nossas fábricas parceiras. Queremos que nossos clientes se sintam bem não apenas com suas escolhas de moda, mas também com o impacto positivo que estão causando no mundo\", ressaltou Ana Carolina.\r\n\r\nA AnaStore já se destaca como um destino imperdível para os amantes da moda em Jales, e sua inauguração promete ser apenas o começo de uma jornada emocionante rumo ao sucesso e à inovação na indústria da moda local. ", new DateOnly(2024, 5, 15), "10:30", null, 2, "A cidade de Jales recebeu hoje um novo marco na indústria da moda com a inauguração triunfante da AnaStore, uma loja que promete revolucionar o cenário fashion local.", "Grande Inauguração da AnaStore: Uma Celebração de Estilo e Elegância!" },
                    { 2, "Os aficionados por sorvete têm motivos para comemorar com o mais recente lançamento da Tropicale, uma das principais marcas de sorvetes do país. Hoje, a empresa revelou seu mais novo sabor de dar água na boca: \"Laravi\", uma deliciosa combinação de frescor e doçura inspirada na laranja.\r\n\r\nCom a chegada do verão, a Tropicale decidiu elevar a experiência dos consumidores com uma criação que captura o sabor vibrante e refrescante da fruta cítrica favorita de muitos. O sabor \"Laravi\" promete oferecer uma explosão de sabor a cada colherada, combinando o suculento aroma da laranja com a suavidade e cremosidade característica dos sorvetes da marca.\r\n\r\nEm uma entrevista exclusiva, o diretor de desenvolvimento de produtos da Tropicale, Carlos Mendes, compartilhou insights sobre a inspiração por trás do novo sabor. \"Queríamos criar algo verdadeiramente único que despertasse a nostalgia do verão e proporcionasse uma experiência memorável aos nossos clientes. O 'Laravi' é uma homenagem à simplicidade e à autenticidade da laranja, e estamos confiantes de que será um sucesso entre os amantes de sorvete de todas as idades\", afirmou Mendes.\r\n\r\nAlém de seu irresistível sabor, o \"Laravi\" também se destaca por sua composição de alta qualidade, feita com ingredientes naturais e frescos. A Tropicale reiterou seu compromisso com a excelência e a inovação, garantindo que cada porção de sorvete seja uma experiência verdadeiramente indulgente e satisfatória.\r\n\r\nO lançamento do sabor \"Laravi\" já está gerando grande expectativa entre os consumidores, que mal podem esperar para experimentar essa nova criação da Tropicale. Com sua promessa de refrescar os dias quentes de verão com uma explosão de sabor, o \"Laravi\" está pronto para se tornar o novo favorito entre os apreciadores de sorvete em todo o país.", new DateOnly(2024, 5, 27), "08:30", null, 2, "Combinando a refrescância da laranja com a suavidade do sorvete, \"Laravi\" promete ser uma verdadeira explosão cítrica de sabor que cativará os paladares de todos.", "Tropicale Lança Novo Sabor chamado Laravi: Uma Explosão Cítrica de Sabor!" }
                });

            migrationBuilder.InsertData(
                table: "tipoatracao",
                columns: new[] { "tipoatracaoid", "usuarioid", "nome" },
                values: new object[,]
                {
                    { 1, 4, "Show" },
                    { 2, 4, "Monumento" }
                });

            migrationBuilder.InsertData(
                table: "tipoturismo",
                columns: new[] { "tipoturismoid", "usuarioid", "imagemtipoturismo", "nome" },
                values: new object[,]
                {
                    { 1, 4, null, "Expo" },
                    { 2, 4, null, "Varejo" },
                    { 3, 4, null, "Alimento" }
                });

            migrationBuilder.InsertData(
                table: "empresa",
                columns: new[] { "empresaid", "cnpj", "descricao", "endereco", "tipoturismoid", "usuarioid", "nome", "TipoTurismoModelId" },
                values: new object[,]
                {
                    { 1, "12.345.678/9012-34", "Em AnaStore, acreditamos que cada pessoa tem sua própria história para contar, e é por isso que oferecemos uma seleção cuidadosamente analisada de roupas e acessórios que abraçam uma variedade de estilos, desde o casual chic até o elegante e sofisticado. Nossas coleções são atualizadas regularmente para garantir que nossos clientes sempre encontrem algo novo e empolgante a cada visita.", "Rua Ana Carolina, 0902 - Jardim Aana, Jales - SP, 15700-123", 2, 5, "AnaStore", null },
                    { 2, " 30.475.124/0001-94 ", "A Tropicale oferece uma experiência única ao priorizar a qualidade em todas as etapas, desde a seleção dos ingredientes até o armazenamento dos sorvetes. Equipada com tecnologia de ponta, proporciona um ambiente acolhedor para famílias e amigos desfrutarem momentos especiais juntos. O cardápio diversificado inclui sorvetes de massa, picolés de fruta e ao leite, picolés gourmet e opções sem lactose.", "Rua Prof. Rubião Meira, 4120 - Jardim Paulista, Jales - SP, 15700-426", 3, 6, "Tropicale Brasil Sorvetes", null }
                });

            migrationBuilder.InsertData(
                table: "turismo",
                columns: new[] { "turismoid", "descricao", "diafuncionamento", "horario", "idtipoturismo", "usuarioid", "local", "nome", "qrcode", "TipoTurismoModelId" },
                values: new object[] { 1, "Praça da Fonte", "Todos os dias", "18:00", 1, 2, "Praça da Fonte", "Praça da Fonte", "123456", null });

            migrationBuilder.InsertData(
                table: "atracao",
                columns: new[] { "atracaoid", "descricao", "idtipoatracao", "idturismo", "usuarioid", "nome", "qrcode", "TipoAtracaoModelId" },
                values: new object[,]
                {
                    { 1, "Show da Ana Castela", 1, 1, 4, "Ana Castela", "123456", null },
                    { 2, "Show do Gustavo Perdido", 1, 1, 4, "Gustavo Perdido", "123456", null },
                    { 3, "Show do Fernando Lima", 1, 1, 4, "Fernando Lima", "123456", null },
                    { 4, "Show do Gustavo Perdido", 2, 1, 4, "Juliana Freitas", "123456", null },
                    { 5, "Show do Gustavo Perdido", 2, 1, 4, "José Louco", "123456", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_atracao_idtipoatracao",
                table: "atracao",
                column: "idtipoatracao");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_idturismo",
                table: "atracao",
                column: "idturismo");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_TipoAtracaoModelId",
                table: "atracao",
                column: "TipoAtracaoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_usuarioid",
                table: "atracao",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_empresa_tipoturismoid",
                table: "empresa",
                column: "tipoturismoid");

            migrationBuilder.CreateIndex(
                name: "IX_empresa_TipoTurismoModelId",
                table: "empresa",
                column: "TipoTurismoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_empresa_usuarioid",
                table: "empresa",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagematracao_idatracao",
                table: "imagematracao",
                column: "idatracao");

            migrationBuilder.CreateIndex(
                name: "IX_imagematracao_usuarioid",
                table: "imagematracao",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagemempresa_idempresa",
                table: "imagemempresa",
                column: "idempresa");

            migrationBuilder.CreateIndex(
                name: "IX_imagemempresa_usuarioid",
                table: "imagemempresa",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagemnoticia_idnoticia",
                table: "imagemnoticia",
                column: "idnoticia");

            migrationBuilder.CreateIndex(
                name: "IX_imagemnoticia_usuarioid",
                table: "imagemnoticia",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagemturismo_idturismo",
                table: "imagemturismo",
                column: "idturismo");

            migrationBuilder.CreateIndex(
                name: "IX_imagemturismo_usuarioid",
                table: "imagemturismo",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_noticia_idturismo",
                table: "noticia",
                column: "idturismo");

            migrationBuilder.CreateIndex(
                name: "IX_noticia_usuarioid",
                table: "noticia",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_sessao_UsuarioModelId",
                table: "sessao",
                column: "UsuarioModelId");

            migrationBuilder.CreateIndex(
                name: "IX_tipoatracao_usuarioid",
                table: "tipoatracao",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_tipoturismo_usuarioid",
                table: "tipoturismo",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_turismo_idtipoturismo",
                table: "turismo",
                column: "idtipoturismo");

            migrationBuilder.CreateIndex(
                name: "IX_turismo_TipoTurismoModelId",
                table: "turismo",
                column: "TipoTurismoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_turismo_usuarioid",
                table: "turismo",
                column: "usuarioid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Auditoria");

            migrationBuilder.DropTable(
                name: "imagematracao");

            migrationBuilder.DropTable(
                name: "imagemempresa");

            migrationBuilder.DropTable(
                name: "imagemnoticia");

            migrationBuilder.DropTable(
                name: "imagemturismo");

            migrationBuilder.DropTable(
                name: "sessao");

            migrationBuilder.DropTable(
                name: "atracao");

            migrationBuilder.DropTable(
                name: "empresa");

            migrationBuilder.DropTable(
                name: "noticia");

            migrationBuilder.DropTable(
                name: "tipoatracao");

            migrationBuilder.DropTable(
                name: "turismo");

            migrationBuilder.DropTable(
                name: "tipoturismo");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
