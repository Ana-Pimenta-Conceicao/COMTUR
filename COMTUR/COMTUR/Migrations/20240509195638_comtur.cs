using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace COMTUR.Migrations
{
    /// <inheritdoc />
    public partial class comtur : Migration
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
                    emailUsuario = table.Column<string>(type: "text", nullable: false),
                    senhaUsuario = table.Column<string>(type: "text", nullable: false),
                    tipoUsuario = table.Column<int>(type: "integer", nullable: false),
                    imagemPerfilUsuario = table.Column<string>(type: "text", nullable: true)
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
                    IdUsuario = table.Column<int>(type: "integer", nullable: false)
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
                    diafuncionmento = table.Column<string>(type: "text", nullable: false),
                    usuarioid = table.Column<int>(type: "integer", nullable: false),
                    IdTipoTurismo = table.Column<int>(type: "integer", nullable: false),
                    TipoTurismoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_turismo", x => x.turismoid);
                    table.ForeignKey(
                        name: "FK_turismo_tipoturismo_IdTipoTurismo",
                        column: x => x.IdTipoTurismo,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_turismo_tipoturismo_TipoTurismoModelId",
                        column: x => x.TipoTurismoModelId,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid");
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
                    nomeEmpresa = table.Column<string>(type: "text", nullable: false),
                    imagemAnuncio = table.Column<string>(type: "text", nullable: true),
                    legendaAnuncio = table.Column<string>(type: "text", nullable: true),
                    DescricaoAnuncio = table.Column<string>(type: "text", nullable: false),
                    IdTipoTurismo = table.Column<int>(type: "integer", nullable: false),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: false),
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
                        name: "FK_anuncio_empresa_IdEmpresa",
                        column: x => x.IdEmpresa,
                        principalTable: "empresa",
                        principalColumn: "empresaid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_anuncio_tipoturismo_IdTipoTurismo",
                        column: x => x.IdTipoTurismo,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_anuncio_tipoturismo_TipoTurismoModelId",
                        column: x => x.TipoTurismoModelId,
                        principalTable: "tipoturismo",
                        principalColumn: "tipoturismoid");
                });

            migrationBuilder.CreateTable(
                name: "imagemempresa",
                columns: table => new
                {
                    imagemempresaid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    legendaImagem = table.Column<string>(type: "text", nullable: false),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemempresa", x => x.imagemempresaid);
                    table.ForeignKey(
                        name: "FK_imagemempresa_empresa_IdEmpresa",
                        column: x => x.IdEmpresa,
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
                    IdTipoAtracao = table.Column<int>(type: "integer", nullable: false),
                    IdTurismo = table.Column<int>(type: "integer", nullable: true),
                    TipoAtracaoModelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_atracao", x => x.atracaoid);
                    table.ForeignKey(
                        name: "FK_atracao_tipoatracao_IdTipoAtracao",
                        column: x => x.IdTipoAtracao,
                        principalTable: "tipoatracao",
                        principalColumn: "tipoatracaoid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_atracao_tipoatracao_TipoAtracaoModelId",
                        column: x => x.TipoAtracaoModelId,
                        principalTable: "tipoatracao",
                        principalColumn: "tipoatracaoid");
                    table.ForeignKey(
                        name: "FK_atracao_turismo_IdTurismo",
                        column: x => x.IdTurismo,
                        principalTable: "turismo",
                        principalColumn: "turismoid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagemturismo",
                columns: table => new
                {
                    imagemTurismoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    legendaImagem = table.Column<string>(type: "text", nullable: false),
                    IdTurismo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemturismo", x => x.imagemTurismoid);
                    table.ForeignKey(
                        name: "FK_imagemturismo_turismo_IdTurismo",
                        column: x => x.IdTurismo,
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
                    horaPublicacao = table.Column<string>(type: "text", nullable: false),
                    TurismoModelId = table.Column<int>(type: "integer", nullable: true),
                    IdTurismo = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_noticia", x => x.noticiaid);
                    table.ForeignKey(
                        name: "FK_noticia_turismo_TurismoModelId",
                        column: x => x.TurismoModelId,
                        principalTable: "turismo",
                        principalColumn: "turismoid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imagematracao",
                columns: table => new
                {
                    imagematracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    legendaImagem = table.Column<string>(type: "text", nullable: false),
                    IdAtracao = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagematracao", x => x.imagematracaoid);
                    table.ForeignKey(
                        name: "FK_imagematracao_atracao_IdAtracao",
                        column: x => x.IdAtracao,
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
                    legendaImagem = table.Column<string>(type: "text", nullable: false),
                    imagem = table.Column<string>(type: "text", nullable: false),
                    IdNoticia = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagemnoticia", x => x.imagemnoticiaid);
                    table.ForeignKey(
                        name: "FK_imagemnoticia_noticia_IdNoticia",
                        column: x => x.IdNoticia,
                        principalTable: "noticia",
                        principalColumn: "noticiaid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "usuarioid", "emailUsuario", "imagemPerfilUsuario", "nome", "senhaUsuario", "telefone", "tipoUsuario" },
                values: new object[,]
                {
                    { 1, "usuario@gmail.com", null, "Usuário", "123456", "(11) 11111-1111", 1 },
                    { 2, "funcionario@gmail.com", null, "Funcionário", "123456", "(22) 22222-2222", 2 },
                    { 3, "empresario@gmail.com", null, "Empresário", "123456", "(33) 33333-3333", 3 },
                    { 4, "administrador@gmail.com", null, "Administrador", "123456", "(44) 44444-4444", 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_EmpresaModelId",
                table: "anuncio",
                column: "EmpresaModelId");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_IdEmpresa",
                table: "anuncio",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_IdTipoTurismo",
                table: "anuncio",
                column: "IdTipoTurismo");

            migrationBuilder.CreateIndex(
                name: "IX_anuncio_TipoTurismoModelId",
                table: "anuncio",
                column: "TipoTurismoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_IdTipoAtracao",
                table: "atracao",
                column: "IdTipoAtracao");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_IdTurismo",
                table: "atracao",
                column: "IdTurismo");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_TipoAtracaoModelId",
                table: "atracao",
                column: "TipoAtracaoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_empresa_usuarioid",
                table: "empresa",
                column: "usuarioid");

            migrationBuilder.CreateIndex(
                name: "IX_imagematracao_IdAtracao",
                table: "imagematracao",
                column: "IdAtracao");

            migrationBuilder.CreateIndex(
                name: "IX_imagemempresa_IdEmpresa",
                table: "imagemempresa",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_imagemnoticia_IdNoticia",
                table: "imagemnoticia",
                column: "IdNoticia");

            migrationBuilder.CreateIndex(
                name: "IX_imagemturismo_IdTurismo",
                table: "imagemturismo",
                column: "IdTurismo");

            migrationBuilder.CreateIndex(
                name: "IX_noticia_TurismoModelId",
                table: "noticia",
                column: "TurismoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_sessao_UsuarioModelId",
                table: "sessao",
                column: "UsuarioModelId");

            migrationBuilder.CreateIndex(
                name: "IX_turismo_IdTipoTurismo",
                table: "turismo",
                column: "IdTipoTurismo");

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
