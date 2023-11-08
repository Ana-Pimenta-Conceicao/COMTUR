using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace COMTUR.Migrations
{
    /// <inheritdoc />
    public partial class teste23 : Migration
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
                    titulo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    subtitulo = table.Column<string>(type: "text", nullable: false),
                    conteudo = table.Column<string>(type: "text", nullable: false),
                    dataHora = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "administrador");

            migrationBuilder.DropTable(
                name: "empresario");

            migrationBuilder.DropTable(
                name: "noticia");

            migrationBuilder.DropTable(
                name: "tipoatracao");

            migrationBuilder.DropTable(
                name: "tipoturismo");
        }
    }
}
