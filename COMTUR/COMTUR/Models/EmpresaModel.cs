using COMTUR.Models.Enum;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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

		[Column("descricao")]
		public string Descricao { get; set; }

		// Relacionamento com tipoTurismo e Empresa
		[JsonIgnore]
		public TipoTurismoModel? TipoTurismoModel { get; set; }

		[Column("tipoturismoid")]
		[ForeignKey("tipoturismoid")]
		public int IdTipoTurismo { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipostatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		// relação com empresario
		[JsonIgnore]
        public UsuarioModel? UsuarioModel { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]
		public int IdUsuario { get; set; }

		// relação com ImagemEmpresa
		public ICollection<ImagemEmpresaModel>? ImagemEmpresa { get; set; }

	}
}







