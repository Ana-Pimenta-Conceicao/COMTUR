using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
    [Table("imagemnoticia")]
    public class ImagemNoticiaModel
    {
        [Key]
        [Column("imagemnoticiaid")]
        public int Id { get; set; }

        [Column("legendaimagem")]
        public string LegendaImagem { get; set; }

        [Column("imagem")]
        public string Imagem { get; set; }

        // relação com Noticia
        [JsonIgnore]
        public NoticiaModel NoticiaModel { get; set; }

		[Column("idnoticia")]
		[ForeignKey("idnoticia")]
        public int IdNoticia { get; set; }

		[JsonIgnore]
		public UsuarioModel? UsuarioModel { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]
		public int IdUsuario { get; set; }
	}
}
