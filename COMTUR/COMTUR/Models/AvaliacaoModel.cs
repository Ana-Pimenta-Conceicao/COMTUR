using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models
{

	[Table("avaliacao")]

	public class AvaliacaoModel
	{
		[Key]
		[Column("avaliacaoid")]
		public int Id { get; set; }

		[Column("notaAvaliacao")]

		public string Nota { get; set; }

		[Column("dataAvaliacao")]
		public DateOnly DataAvaliacao { get; set; }

		[Column("comentarioAvaliacao")]
		public string Comentario { get; set; }

		// relaçao com Turismo
		[JsonIgnore]
		public TurismoModel? TurismoModel { get; set; }

		[Column("idturismo")]
		[ForeignKey("idturismo")]
		public int IdTurismo { get; set; }

		// relaçao com Atracao
		[JsonIgnore]
		public AtracaoModel? AtracaoModel { get; set; }

		[Column("idatracao")]
		[ForeignKey("idatracao")]
		public int IdAtracao { get; set; }

		// relação com usuario
		[JsonIgnore]
		public UsuarioModel? UsuarioModel { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]
		public int IdUsuario { get; set; }


		// relação com empresa
		[JsonIgnore]
		public EmpresaModel? EmpresaModel { get; set; }

		[Column("empresaid")]
		[ForeignKey("empresaid")]
		public int IdEmpresa { get; set; }


		[Column("statusavaliacao")]
		public TipoStatus Status { get; set; }

		public void Approved() => Status = StatusEnumExtensions.Approved();
		public void Inactive() => Status = StatusEnumExtensions.Inactive();
		public void Disapproved() => Status = StatusEnumExtensions.Disapproved();
		public void Analyzing() => Status = StatusEnumExtensions.Analyzing();

		public string GetState() => IStatusStateRepositorioExtensions.GetState(this.Status);
		public bool CanInactive() => IStatusStateRepositorioExtensions.CanInactive(this.Status);
		public bool CanAnalyzing() => IStatusStateRepositorioExtensions.CanAnalyzing(this.Status);
		public bool CanApproved() => IStatusStateRepositorioExtensions.CanApproved(this.Status);
		public bool CanDisapproved() => IStatusStateRepositorioExtensions.CanDisapproved(this.Status);
	}
}
