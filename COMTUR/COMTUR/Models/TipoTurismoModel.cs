using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models;

[Table("tipoturismo")]

public class TipoTurismoModel
{

	[Key]
	[Column("tipoturismoid")]
	public int Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

	[Column("imagemtipoturismo")]
	public string? Imagem { get; set; }

	// relação com Empresa
	[JsonIgnore]
	public ICollection<EmpresaModel>? Empresa { get; set; }

	// relação com Turismo
	[JsonIgnore]
	public ICollection<TurismoModel>? Turismo { get; set; }

}
