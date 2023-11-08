using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
    [Table("administrador")]
    public class AdministradorModel
    {
        [Key]
        [Column("administradorid")]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("cargoadministrador")]
        public string CargoAdministrador { get; set; }

        [Column("cpfadministrador")]
        public string CpfAdministrador { get; set; }

        [Column("telefoneadministrador")]
        public string TelefoneAdministrador { get; set; }

        [Column("emailadministrador")]
        public string EmailAdministrador { get; set; }

        [Column("senhaadministrador")]
        public string SenhaAdministrador { get; set; }
    }
}