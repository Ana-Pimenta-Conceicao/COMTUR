using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

		[Column("data")]
		public DateTime Data { get; set; }
    }
}