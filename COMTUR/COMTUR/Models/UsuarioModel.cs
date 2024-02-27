using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
	[Table("Usuario")]
	public class UsuarioModel
	{
		[Key]
		[Column("Usuarioid")]
		public int Id { get; set; }

		[Column("nome")]
		public string Nome { get; set; }

		[Column("emailUsuario")]
		public string EmailUsuario { get; set; }

		[Column("senhaUsuario")]
		public string SenhaUsuario { get; set; }
	}
}