using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace COMTUR.Migrations
{
    /// <inheritdoc />
    public partial class inserindoatributolegenda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "administrador",
                columns: table => new
                {
                    administradorid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    cargoadministrador = table.Column<string>(type: "text", nullable: false),
                    cpfadministrador = table.Column<string>(type: "text", nullable: false),
                    telefoneadministrador = table.Column<string>(type: "text", nullable: false),
                    emailadministrador = table.Column<string>(type: "text", nullable: false),
                    senhaadministrador = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_administrador", x => x.administradorid);
                });

            migrationBuilder.CreateTable(
                name: "empresario",
                columns: table => new
                {
                    empresarioid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    emailempresario = table.Column<string>(type: "text", nullable: false),
                    senhaempresario = table.Column<string>(type: "text", nullable: false),
                    telefoneempresario = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empresario", x => x.empresarioid);
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
                    legendaImagem = table.Column<string>(type: "text", nullable: false),
                    caminhoImagem = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_noticia", x => x.noticiaid);
                });

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
                name: "atracao",
                columns: table => new
                {
                    atracaoid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    descricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    qrcode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IdTipoAtracao = table.Column<int>(type: "integer", nullable: false),
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
                });

            migrationBuilder.CreateIndex(
                name: "IX_atracao_IdTipoAtracao",
                table: "atracao",
                column: "IdTipoAtracao");

            migrationBuilder.CreateIndex(
                name: "IX_atracao_TipoAtracaoModelId",
                table: "atracao",
                column: "TipoAtracaoModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "administrador");

            migrationBuilder.DropTable(
                name: "atracao");

            migrationBuilder.DropTable(
                name: "empresario");

            migrationBuilder.DropTable(
                name: "noticia");

            migrationBuilder.DropTable(
                name: "tipoturismo");

            migrationBuilder.DropTable(
                name: "tipoatracao");
        }
    }
}
