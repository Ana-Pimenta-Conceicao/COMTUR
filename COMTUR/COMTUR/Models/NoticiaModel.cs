using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
    [Table("noticia")]
    public class NoticiaModel
    {
        [Key]
        [Column("noticiaid")]
        public int Id { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("subtitulo")]
        public string Subtitulo { get; set; }

        [Column("conteudo")]
        public string Conteudo { get; set; }

        [Column("datapublicacao")]
        public DateOnly DataPublicacao { get; set; }


        [Column("horaPublicacao")]
        public string HoraPublicacao { get; set; }


        [Column("legendaImagem")]
        public string LegendaImagem { get; set; }

		[JsonIgnore]
		public ICollection<ImagemNoticiaModel>? ImagemNoticia { get; set; }

	}
}