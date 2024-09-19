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

		[Column("idusuario")]
		public int IdUsuario { get; set; }

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

		// Relacionamento com atracao para o funcionario/admin
		[JsonIgnore]
		public ICollection<AtracaoModel>? Atracao { get; set; }

		// Relacionamento com tipoatracao para o funcionario/admin
		[JsonIgnore]
		public ICollection<TipoAtracaoModel>? TipoAtracao { get; set; }

		// Relacionamento com tipoturismo para o funcionario/admin
		[JsonIgnore]
		public ICollection<TipoTurismoModel>? TipoTurismo { get; set; }

		// Relacionamento com avaliacao para o usuario
		[JsonIgnore]
		public ICollection<AvaliacaoModel>? Avaliacao { get; set; }

		[Column("statustipoatracao")]
		public TipoStatus Status { get; set; }
		public void Approved() => Status = StatusEnumExtensions.Approved();
		public void Inactive() => Status = StatusEnumExtensions.Inactive();
		public void Disapproved() => Status = StatusEnumExtensions.Disapproved();
		public void Analyzing() => Status = StatusEnumExtensions.Analyzing();

		public string GetState() => IStatusStateExtensions.GetState(this.Status);
		public bool CanInactive() => IStatusStateExtensions.CanInactive(this.Status);
		public bool CanAnalyzing() => IStatusStateExtensions.CanAnalyzing(this.Status);
		public bool CanApproved() => IStatusStateExtensions.CanApproved(this.Status);
		public bool CanDisapproved() => IStatusStateExtensions.CanDisapproved(this.Status);

	}
}
