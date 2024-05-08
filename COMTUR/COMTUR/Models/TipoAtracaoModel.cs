using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models;

[Table("tipoatracao")]

public class TipoAtracaoModel
{

	[Key]
	[Column("tipoatracaoid")]
	public int Id { get; set; }
	[Column("nome")]
	public string Nome { get; set; }

	// relação com Atracao
	[JsonIgnore]
	public ICollection<AtracaoModel>? Atracao { get; set; }
}