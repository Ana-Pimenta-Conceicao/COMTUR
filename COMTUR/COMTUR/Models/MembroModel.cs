using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
    [Table("membros")]
    public class MembroModel
    {
        [Key]
        [Column("membroid")]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }
       
        [Column("cargo")]
        public string Cargo { get; set; }
      
        [Column("imagem")]
        public string Imagem { get; set; }


    }
}
