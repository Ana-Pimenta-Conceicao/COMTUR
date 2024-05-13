using COMTUR.Models.Enum;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models;

[Table("atracao")]

public class AtracaoModel
{
	[Key]
	[Column("atracaoid")]
	public int Id { get; set; }

	[Column("nome")]
	public string Nome { get; set; }

	[Column("descricao")]
	public string Descricao { get; set; }

	[Column("qrcode")]
	public string QRCode { get; set; }

	// Mapear o campo tipoStatus como enum
	/*[Column("tipostatus")]
	[EnumDataType(typeof(TipoStatus))]
	public TipoStatus TipoStatus { get; set; }*/

	// relaçao com TipoAtracao
	[JsonIgnore]
	public TipoAtracaoModel? TipoAtracaoModel { get; set; }

	[Column("idtipoatracao")]
	[ForeignKey("idtipoatracao")]
	public int IdTipoAtracao { get; set; }

	// relaçao com ImagemAtracao
	public ICollection<ImagemAtracaoModel>? ImagemAtracao { get; set; }

	// relaçao com Turismo
	[JsonIgnore]
	public TurismoModel? TurismoModel { get; set; }

	[Column("idturismo")]
	[ForeignKey("idturismo")]
	public int IdTurismo { get; set; }

}

