using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("imagemempresa")]
	public class ImagemEmpresaModel
	{
		[Key]
		[Column("imagemempresaid")]
		public int Id { get; set; }

		[Column("legendaimagem")]
		public string LegendaImagem { get; set; }

		[Column("imagem")]
		public string Imagem { get; set; }

		// relação com empresa
		[JsonIgnore]
		public EmpresaModel EmpresaModel { get; set; }

		[Column("idempresa")]
		[ForeignKey("idempresa")]
		public int IdEmpresa { get; set; }
	}
}
