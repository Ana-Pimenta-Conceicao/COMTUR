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

		[Column("emailusuario")]
		public string EmailUsuario { get; set; }

		[Column("senhausuario")]
		public string SenhaUsuario { get; set; }

		// Mapear o campo tipoUsuario como enum
		[Column("tipousuario")]
		[EnumDataType(typeof(TipoUsuario))]
		public TipoUsuario TipoUsuario { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipostatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		[Column("imagemperfilusuario")]
		public string? ImagemPerfilUsuario { get; set; }

		// Relacionamento com empresa para o empresário
        [JsonIgnore]
        public ICollection<EmpresaModel>? Empresas { get; set; }

		// Relacionamento com noticia para o funcionario
		[JsonIgnore]
		public ICollection<NoticiaModel>? Noticia { get; set; }

		// Relacionamento com turismo para o funcionario/admin
		[JsonIgnore]
		public ICollection<TurismoModel>? Turismos { get; set; }
	}
}
