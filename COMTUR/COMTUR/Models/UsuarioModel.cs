using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using COMTUR.Models.Enum;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("usuario")]
	public class UsuarioModel
	{
		[Key]
		[Column("usuarioid")]
		public int Id { get; set; }

		[Column("nome")]
		public string Nome { get; set; }

		[Column("telefone")]
		public string Telefone { get; set; }

		[Column("emailUsuario")]
		public string EmailUsuario { get; set; }

		[Column("senhaUsuario")]
		public string SenhaUsuario { get; set; }

		// Mapear o campo tipoUsuario como enum
		[Column("tipoUsuario")]
		[EnumDataType(typeof(TipoUsuario))]
		public TipoUsuario TipoUsuario { get; set; }

		// Mapear o campo tipoStatus como enum
		[Column("tipoStatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }

		[Column("imagemPerfilUsuario")]
		public string? ImagemPerfilUsuario { get; set; }

		// Relacionamento com empresa para o empresário
        [JsonIgnore]
        public ICollection<EmpresaModel>? Empresas { get; set; }
    }
}
