using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace COMTUR.Migrations
{
    /// <inheritdoc />
    public partial class testeBanco : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TipoTurismo",
                table: "TipoTurismo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TipoAtracao",
                table: "TipoAtracao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Noticia",
                table: "Noticia");

            migrationBuilder.RenameTable(
                name: "TipoTurismo",
                newName: "tipoturismo");

            migrationBuilder.RenameTable(
                name: "TipoAtracao",
                newName: "tipoatracao");

            migrationBuilder.RenameTable(
                name: "Noticia",
                newName: "noticia");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "tipoturismo",
                newName: "nome");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tipoturismo",
                newName: "tipoturismoid");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "tipoatracao",
                newName: "nome");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tipoatracao",
                newName: "tipoatracaoid");

            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "noticia",
                newName: "titulo");

            migrationBuilder.RenameColumn(
                name: "Subtitulo",
                table: "noticia",
                newName: "subtitulo");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "noticia",
                newName: "data");

            migrationBuilder.RenameColumn(
                name: "Conteudo",
                table: "noticia",
                newName: "conteudo");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "noticia",
                newName: "noticiaid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tipoturismo",
                table: "tipoturismo",
                column: "tipoturismoid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tipoatracao",
                table: "tipoatracao",
                column: "tipoatracaoid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_noticia",
                table: "noticia",
                column: "noticiaid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tipoturismo",
                table: "tipoturismo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tipoatracao",
                table: "tipoatracao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_noticia",
                table: "noticia");

            migrationBuilder.RenameTable(
                name: "tipoturismo",
                newName: "TipoTurismo");

            migrationBuilder.RenameTable(
                name: "tipoatracao",
                newName: "TipoAtracao");

            migrationBuilder.RenameTable(
                name: "noticia",
                newName: "Noticia");

            migrationBuilder.RenameColumn(
                name: "nome",
                table: "TipoTurismo",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "tipoturismoid",
                table: "TipoTurismo",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "nome",
                table: "TipoAtracao",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "tipoatracaoid",
                table: "TipoAtracao",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "titulo",
                table: "Noticia",
                newName: "Titulo");

            migrationBuilder.RenameColumn(
                name: "subtitulo",
                table: "Noticia",
                newName: "Subtitulo");

            migrationBuilder.RenameColumn(
                name: "data",
                table: "Noticia",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "conteudo",
                table: "Noticia",
                newName: "Conteudo");

            migrationBuilder.RenameColumn(
                name: "noticiaid",
                table: "Noticia",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TipoTurismo",
                table: "TipoTurismo",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TipoAtracao",
                table: "TipoAtracao",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Noticia",
                table: "Noticia",
                column: "Id");
        }
    }
}
