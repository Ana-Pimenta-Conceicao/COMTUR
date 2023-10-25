using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
	[Table("empresario")]
    [Keyless]
    public class EmpresarioModel
	{
		[Key]
		[Column("empresarioid")]
		public int Id { get; set; }

        [Column(TypeName = "citext")]
        public string Nome { get; set; }

		[Column("emailempresario")]
		public string EmailEmpresario { get; set; }

		[Column("senhaempresario")]
		public string SenhaEmpresario { get; set; }

		[Column("telefoneempresario")]
		public string TelefoneEmpresario { get; set; }
	}
}