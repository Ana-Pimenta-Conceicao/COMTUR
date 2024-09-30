using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace COMTUR.Models
{
    [Table("parametro")]
    public class ParametroModel
    {
        [Key]
        [Column("parametroid")]
        public int Id { get; set; }

        [Column("definicaoTurismo")]
        public string DefinicaoTurismo { get; set; }

        [Column("beneficios")]
        public string Beneficios { get; set; }

        [Column("datafundacao")]
        public DateOnly DataFundacao { get; set; }

        [Column("areaTerritorial")]
        public string AreaTerritorial { get; set; }

        [Column("distanciaCapital")]
        public string DistanciaCapital { get; set; }

        [Column("habitantes")]
        public string Habitantes { get; set; }
        
        [Column("descricaoentrerios")]
        public string DescricaoEntreRios { get; set; }

        [Column("imagementrerios")]
        public string ImagemEntreRios { get; set; }

        [Column("descricaoit")]
        public string DescricaoIT { get; set; }

        [Column("imagemit")]
        public string ImagemIT { get; set; }

    }
}
