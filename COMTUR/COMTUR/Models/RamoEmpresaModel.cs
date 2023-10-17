using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models;

[Table("ramoempresa")]

public class RamoEmpresaModel
{

	[Key]
	[Column("ramoempresaid")]
	public int Id { get; set; }
	[Column("nome")]
	public string? Nome { get; set; }
}
