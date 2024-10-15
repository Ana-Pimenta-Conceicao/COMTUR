using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
	[Table("ata")]
	public class AtaModel
	{
		[Column("idata")]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid Id { get; set; } 

		[Column("tituloata")]
		public string TituloAta { get; set; }

		[Column("documentoata")]
		public string DocumentoAta { get; set; }

		[Column("dataata")]
		public DateOnly DataAta { get; set; }
	}
}
