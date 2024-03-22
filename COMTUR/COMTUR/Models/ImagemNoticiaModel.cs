using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
    [Table("imagemnoticia")]
    public class ImagemNoticiaModel
    {
        [Key]
        [Column("imagemnoticiaid")]
        public int Id { get; set; }

        [Column("legendaImagem")]
        public string LegendaImagem { get; set; }

        [Column("imagem")]
        public string Imagem { get; set; }

        [JsonIgnore]
        public NoticiaModel NoticiaModel { get; set; }

        [ForeignKey("idnoticia")]
        public int IdNoticia { get; set; }
    }
}
