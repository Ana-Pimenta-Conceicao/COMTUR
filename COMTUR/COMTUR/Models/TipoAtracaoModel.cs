using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models;

[Table("tipoatracao")]
[Keyless]

public class TipoAtracaoModel
{

	[Key]
	[Column("tipoatracaoid")]
	public int Id { get; set; }
    [Column(TypeName = "citext")]
    public string Nome { get; set; }
}