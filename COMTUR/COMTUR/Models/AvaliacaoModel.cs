using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
	}
}
