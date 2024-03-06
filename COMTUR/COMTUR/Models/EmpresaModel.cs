using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("empresa")]
	public class EmpresaModel
	{
		[Key]
		[Column("empresaid")]
		public int Id { get; set; }

		[Column("nome")]
		public string Nome { get; set; }

		[Column("cnpj")]
		public long CNPJ { get; set; }

		[Column("endereco")]
		public string Endereco { get; set; }

		[Column("imagem")]
		public string? Imagem { get; set; }

		[Column("legendaImagem")]
		public string LegendaImagem { get; set; }

		[Column("descricao")]
		public string Descricao { get; set; }

		[JsonIgnore]
		public EmpresarioModel? EmpresarioModel { get; set; }

		[ForeignKey("idempresario")]
		public int IdEmpresario { get; set; }

	}
}
