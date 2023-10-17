using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models;

[Table("tipoatracao")]

public class TipoAtracaoModel
{

	[Key]
	[Column("tipoatracaoid")]
	public int Id { get; set; }
	[Column("nome")]
	public string? Nome { get; set; }
}