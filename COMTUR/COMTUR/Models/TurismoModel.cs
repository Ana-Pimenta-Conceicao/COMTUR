using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace COMTUR.Models
{
	[Table("turismo")]
	public class TurismoModel
	{
		[Key]
		[Column("turismoid")]
		public int Id { get; set; }

		[Column("nome")]
		public string Nome { get; set; }

		[Column("descricao")]
		public string Descricao { get; set; }

		[Column("horario")]
		public string Horario { get; set; }

		[Column("qrcode")]
		public string QRCode { get; set; }

		[Column("local")]
		public string Local { get; set; }

		[Column("diafuncionamento")]
		public string DiaFuncionamento { get; set; }

		// Mapear o campo tipoStatus como enum
		/*[Column("tipostatus")]
		[EnumDataType(typeof(TipoStatus))]
		public TipoStatus TipoStatus { get; set; }*/

		// relação com funcionario/admin
		[JsonIgnore]
		public UsuarioModel? UsuarioModel { get; set; }

		[Column("usuarioid")]
		[ForeignKey("usuarioid")]
		public int IdUsuario { get; set; }

		// relaçao com TipoTurismo
		[JsonIgnore]
		public TipoTurismoModel? TipoTurismoModel { get; set; }

		[Column("idtipoturismo")]
		[ForeignKey("idtipoturismo")]
		public int IdTipoTurismo { get; set; }

		// relação com ImagemTurismo
		public ICollection<ImagemTurismoModel>? ImagemTurismo { get; set; }

		// relação com Atracao
		[JsonIgnore]
		public ICollection<AtracaoModel>? Atracao { get; set; }

		// relação com Noticia
		[JsonIgnore]
		public ICollection<NoticiaModel>? Noticia { get; set; }

		// relaçao com Avaliacao
		public ICollection<AvaliacaoModel>? Avaliacao { get; set; }
	}
}
