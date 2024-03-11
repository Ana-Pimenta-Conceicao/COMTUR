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

	[Column("arquivoImagem")]
	public string[] ArquivoImagem { get; set; }

	[JsonIgnore]
	public TipoAtracaoModel? TipoAtracaoModel { get; set; }

	[ForeignKey("idtipoatracao")]
	public int IdTipoAtracao { get; set; }

	[JsonIgnore]
	public ICollection<ImagemAtracaoModel>? ImagemAtracao { get; set; }

}

