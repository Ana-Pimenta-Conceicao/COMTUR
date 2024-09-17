using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
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
		public string CNPJ { get; set; }

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


		// relação com Avaliacao
		[JsonIgnore]
		public ICollection<AvaliacaoModel>? Avaliacao { get; set; }

		// relação com Empresario

		[JsonIgnore]
    public UsuarioModel? UsuarioModel { get; set; }

		// relação com ImagemEmpresa
		public ICollection<ImagemEmpresaModel>? ImagemEmpresa { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]



		public int IdUsuario { get; set; }

		[Column("statusatracao")]
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