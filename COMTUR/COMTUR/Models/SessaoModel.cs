using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
    [Table("sessao")]
    public class SessaoModel
    {
        [Column("idssessao")]
        public int Id { get; set; }

        [Column("tokensessao")]
        public string TokenSessao { get; set; }

        [Column("statussessao")]
        public bool StatusSessao { get; set; }

        [Column("emailusuario")]
        public string EmailUsuario { get; set; }

        [Column("nomeusuario")]
        public string NomeUsuario { get; set; }

        [Column("nivelacesso")]
        public string NivelAcesso { get; set; }

        public UsuarioModel? UsuarioModel { get; set; }

		[Column("idusuario")]
		[ForeignKey("idusuario")]
        public int IdUsuario { get; set; }
    }
}
