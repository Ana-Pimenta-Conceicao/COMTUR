using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models;

[Table("tipoturismo")]

public class TipoTurismoModel
{

	[Key]
	[Column("tipoturismoid")]
	public int Id { get; set; }
	[Column("nome")]
	public string? Nome { get; set; }
}
