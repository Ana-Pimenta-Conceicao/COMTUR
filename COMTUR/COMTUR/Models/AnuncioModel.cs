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

		[Column("nomeempresa")]
		public string NomeEmpresa { get; set; }

		[Column("imagemanuncio")]
		public string? Imagem { get; set; }

		[Column("legendaanuncio")]
		public string? Legenda { get; set; }

		[Column("descricaoanuncio")]
		public string DescricaoAnuncio { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipostatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		// Relacionamento com tipoTurismo e Anuncio
		[JsonIgnore]
		public TipoTurismoModel? TipoTurismoModel { get; set; }

		[Column("idtipoturismo")]
		[ForeignKey("idtipoturismo")]
		public int IdTipoTurismo { get; set; }

		// Relacionamento com Empresa e Anuncio
		[JsonIgnore]
		public EmpresaModel? EmpresaModel { get; set; }

		[Column("idempresa")]
		[ForeignKey("idempresa")]
		public int IdEmpresa { get; set; }
	}
}
