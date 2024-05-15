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
                name: "tipoatracao",
                columns: table => new
                {
                    tipoatracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoatracao", x => x.tipoatracaoid);
                });

            migrationBuilder.CreateTable(
                name: "tipoturismo",
                columns: table => new
                {
                    tipoturismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoturismo", x => x.tipoturismoid);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
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
                name: "empresa",
                columns: table => new
                {
                    empresaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cnpj = table.Column<long>(type: "bigint", nullable: false),
                    endereco = table.Column<string>(type: "text", nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empresa", x => x.empresaid);
                    table.ForeignKey(
                        name: "FK_empresa_usuario_usuarioid",
                        column: x => x.usuarioid,
                        principalTable: "usuario",
                        principalColumn: "usuarioid",
                        onDelete: ReferentialAction.Cascade);
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
                name: "anuncio",
                columns: table => new
                {
                    anuncioid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomeempresa = table.Column<string>(type: "text", nullable: false),
                    imagemanuncio = table.Column<string>(type: "text", nullable: true),
                    legendaanuncio = table.Column<string>(type: "text", nullable: true),
                    descricaoanuncio = table.Column<string>(type: "text", nullable: false),
                    idtipoturismo = table.Column<int>(type: "integer", nullable: false),
                    idempresa = table.Column<int>(type: "integer", nullable: false),
                    EmpresaModelId = table.Column<int>(type: "integer", nullable: true),
                    TipoTurismoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_anuncio", x => x.anuncioid);
                    table.ForeignKey(
                        name: "FK_anuncio_empresa_EmpresaModelId",
                        column: x => x.EmpresaModelId,
                        principalTable: "empresa",
                        principalColumn: "empresaid");
                    table.ForeignKey(
                        name: "FK_anuncio_empresa_idempresa",
                        column: x => x.idempresa,
                        principalTable: "empresa",
                        principalColumn: "empresaid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_anuncio_tipoturismo_TipoTurismoModelId",
                        column: x => x.TipoTurismoModelId,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid");
                    table.ForeignKey(
                        name: "FK_anuncio_tipoturismo_idtipoturismo",
                        column: x => x.idtipoturismo,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid",
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
                    idempresa = table.Column<int>(type: "integer", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "imagemturismo",
                columns: table => new
                {
                    imagemturismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    idturismo = table.Column<int>(type: "integer", nullable: false)
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
                    idatracao = table.Column<int>(type: "integer", nullable: false)
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
                });

            migrationBuilder.CreateTable(
                name: "imagemnoticia",
                columns: table => new
                {
                    imagemnoticiaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    legendaimagem = table.Column<string>(type: "text", nullable: false),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    idnoticia = table.Column<int>(type: "integer", nullable: false)
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
                });

            migrationBuilder.InsertData(
                table: "tipoatracao",
                columns: new[] { "tipoatracaoid", "nome" },
                values: new object[] { 1, "Show" });

            migrationBuilder.InsertData(
                table: "tipoturismo",
                columns: new[] { "tipoturismoid", "nome" },
                values: new object[] { 1, "Expo" });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "usuarioid", "emailusuario", "imagemperfilusuario", "nome", "senhausuario", "telefone", "tipousuario" },
                values: new object[,]
                {
                    { 1, "usuario@gmail.com", null, "Usuário", "123456", "(11) 11111-1111", 1 },
                    { 2, "funcionario@gmail.com", null, "Funcionário", "123456", "(22) 22222-2222", 2 },
                    { 3, "empresario@gmail.com", null, "Empresário", "123456", "(33) 33333-3333", 3 },
                    { 4, "administrador@gmail.com", null, "Administrador", "123456", "(44) 44444-4444", 4 }
                });

            migrationBuilder.InsertData(
                table: "empresa",
                columns: new[] { "empresaid", "cnpj", "descricao", "endereco", "usuarioid", "nome" },
                values: new object[] { 1, 123456L, "Ana Rainha o resto NADINHA", "Rua das Maravilhas", 3, "AnaStore" });

            migrationBuilder.InsertData(
                table: "noticia",
                columns: new[] { "noticiaid", "conteudo", "datapublicacao", "horapublicacao", "idturismo", "usuarioid", "subtitulo", "titulo" },
                values: new object[] { 1, "O fenomeno das redes sociais, AnaStore, agora conta com uma loja fisica", new DateOnly(2024, 5, 15), "10:30", null, 2, "A loja mais divonica agora está em espaço fisíco", "AnaStore finalmente é inaugurada" });

            migrationBuilder.InsertData(
                table: "turismo",
                columns: new[] { "turismoid", "descricao", "diafuncionamento", "horario", "idtipoturismo", "usuarioid", "local", "nome", "qrcode", "TipoTurismoModelId" },
                values: new object[] { 1, "Praça da Fonte", "Todos os dias", "18:00", 1, 2, "Praça da Fonte", "Praça da Fonte", "123456", null });

            migrationBuilder.InsertData(
                table: "anuncio",
                columns: new[] { "anuncioid", "descricaoanuncio", "EmpresaModelId", "idempresa", "idtipoturismo", "imagemanuncio", "legendaanuncio", "nomeempresa", "TipoTurismoModelId" },
                values: new object[] { 1, "Não existe mulher feia, existe mulher que não conhece a AnaStore", null, 1, 1, null, null, "AnaStore", null });

            migrationBuilder.InsertData(
                table: "atracao",
                columns: new[] { "atracaoid", "descricao", "idtipoatracao", "idturismo", "nome", "qrcode", "TipoAtracaoModelId" },
                values: new object[] { 1, "Show da Ana Castela", 1, 1, "Ana Castela", "123456", null });

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_EmpresaModelId",
                table: "anuncio",
                column: "EmpresaModelId");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_idempresa",
                table: "anuncio",
                column: "idempresa");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_idtipoturismo",
                table: "anuncio",
                column: "idtipoturismo");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_TipoTurismoModelId",
                table: "anuncio",
                column: "TipoTurismoModelId");

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
                name: "IX_empresa_usuarioid",
                table: "empresa",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagematracao_idatracao",
                table: "imagematracao",
                column: "idatracao");

            migrationBuilder.CreateIndex(
                name: "IX_imagemempresa_idempresa",
                table: "imagemempresa",
                column: "idempresa");

            migrationBuilder.CreateIndex(
                name: "IX_imagemnoticia_idnoticia",
                table: "imagemnoticia",
                column: "idnoticia");

            migrationBuilder.CreateIndex(
                name: "IX_imagemturismo_idturismo",
                table: "imagemturismo",
                column: "idturismo");

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
                name: "anuncio");

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
