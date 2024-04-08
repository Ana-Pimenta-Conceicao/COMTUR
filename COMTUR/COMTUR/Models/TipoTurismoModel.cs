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

	[JsonIgnore]
	public ICollection<AnuncioModel>? Anuncios { get; set; }
}
