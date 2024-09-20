using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;
using COMTUR.Models.Relational;

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

		[Column("statusavaliacao")]
		public TipoStatus Status { get; set; }

        [Column("idusuario")]
        [ForeignKey("idusuario")]
        public int IdUsuario { get; set; }


        [JsonIgnore]
        public UsuarioModel? UsuarioModel { get; set; }

        [JsonIgnore]
        public ICollection<AvaliacaoAtracaoModel>? AvaliacaoAtracoes { get; set; }

        [JsonIgnore]
        public ICollection<AvaliacaoEmpresaModel>? AvaliacaoEmpresaModels { get; set; }

        [JsonIgnore]
        public ICollection<AvaliacaoTurismoModel>? AvaliacaoTurismoModels { get; set; }



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
