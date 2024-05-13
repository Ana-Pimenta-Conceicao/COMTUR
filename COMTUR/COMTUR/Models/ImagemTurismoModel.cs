using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("imagemturismo")]
	public class ImagemTurismoModel
	{
		[Key]
		[Column("imagemturismoid")]
		public int Id { get; set; }

		[Column("imagem")]
		public string Imagem { get; set; }

		[Column("legendaimagem")]
		public string LegendaImagem { get; set; }

		[JsonIgnore]
		public TurismoModel TurismoModel { get; set; }

		[Column("idturismo")]
		[ForeignKey("idturismo")]
		public int IdTurismo { get; set; }
	}
}