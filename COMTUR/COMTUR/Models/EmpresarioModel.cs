using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("empresario")]
    public class EmpresarioModel
	{
		[Key]
		[Column("empresarioid")]
		public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

		[Column("emailempresario")]
		public string EmailEmpresario { get; set; }

		[Column("senhaempresario")]
		public string SenhaEmpresario { get; set; }

		[Column("telefoneempresario")]
		public string TelefoneEmpresario { get; set; }

		[JsonIgnore]
		public ICollection<EmpresaModel>? Empresa { get; set; }
	}
}