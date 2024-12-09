using COMTUR.Models.Enum;
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

	// relação com funcionario/admin
	[JsonIgnore]
	public UsuarioModel? UsuarioModel { get; set; }

	[Column("usuarioid")]
	[ForeignKey("usuarioid")]
	public int IdUsuario { get; set; }

	// relaçao com Avaliacao
	public ICollection<AvaliacaoAtracaoModel>? AvaliacoesAtracao { get; set; }

	[Column("statusatracao")]
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

