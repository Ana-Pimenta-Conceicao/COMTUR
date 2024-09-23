using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;

namespace COMTUR.Models
{
    [Table("noticia")]
	public class NoticiaModel
	{
		[Key]
		[Column("noticiaid")]
		public int Id { get; set; }

		[Column("titulo")]
		public string Titulo { get; set; }

		[Column("subtitulo")]
		public string Subtitulo { get; set; }

		[Column("conteudo")]
		public string Conteudo { get; set; }

		[Column("datapublicacao")]
		public DateOnly DataPublicacao { get; set; }


		[Column("horapublicacao")]
		public string HoraPublicacao { get; set; }

		// relação com ImagemNoticia
		public ICollection<ImagemNoticiaModel>? ImagemNoticia { get; set; }

		// relação com funcionario/admin
		[JsonIgnore]
		public UsuarioModel? UsuarioModel { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]
		public int IdUsuario { get; set; }

		// relaçao com Turismo
		[JsonIgnore]
		public TurismoModel? TurismoModel { get; set; }

		[Column("idturismo")]
		[ForeignKey("idturismo")]
		public int? IdTurismo { get; set; }

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