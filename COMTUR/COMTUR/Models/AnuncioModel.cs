using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using COMTUR.Models.Enum;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("anuncio")]
	public class AnuncioModel
	{
		[Key]
		[Column("anuncioid")]
		public int Id { get; set; }

		[Column("nomeEmpresa")]
		public string NomeEmpresa { get; set; }

		[Column("imagemAnuncio")]
		public string? Imagem { get; set; }

		[Column("legendaAnuncio")]
		public string? Legenda { get; set; }

		[Column("DescricaoAnuncio")]
		public string DescricaoAnuncio { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipoStatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		// Relacionamento com tipoTurismo e Anuncio
		[JsonIgnore]
		public TipoTurismoModel? TipoTurismoModel { get; set; }

		[ForeignKey("idtipoturismo")]
		public int IdTipoTurismo { get; set; }

		// Relacionamento com Empresa e Anuncio
		[JsonIgnore]
		public EmpresaModel? EmpresaModel { get; set; }

		[ForeignKey("idempresa")]
		public int IdEmpresa { get; set; }
	}
}
