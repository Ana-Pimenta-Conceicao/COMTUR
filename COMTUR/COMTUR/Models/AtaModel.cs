using System.ComponentModel.DataAnnotations;
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
		[Required]
		[MaxLength(200)] 
		public string TituloAta { get; set; }

		[Column("documentoata")]
		[Required]
		public byte[] DocumentoAta
		{
			get => Convert.FromBase64String(DocumentoBase64);
			set => DocumentoBase64 = Convert.ToBase64String(value);
		}
		private string DocumentoBase64 { get; set; }

		[Column("dataata")]
		public DateOnly DataAta { get; set; }
	}
}
