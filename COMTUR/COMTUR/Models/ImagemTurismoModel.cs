using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("imagemturismo")]
	public class ImagemTurismoModel
	{
		[Key]
		[Column("imagemTurismoid")]
		public int Id { get; set; }

		[Column("imagem")]
		public string Imagem { get; set; }

		[Column("legendaImagem")]
		public string LegendaImagem { get; set; }

		[JsonIgnore]
		public TurismoModel TurismoModel { get; set; }

		[ForeignKey("idTurismo")]
		public int IdTurismo { get; set; }
	}
}