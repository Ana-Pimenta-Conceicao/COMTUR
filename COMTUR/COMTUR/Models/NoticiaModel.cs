using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
    [Table("noticia")]
    public class NoticiaModel
    {
        private string _caminhoImagem;
        private IFormFile _criarArquivoImagem;

        [Key]
        [Column("noticiaid")]
        public int Id { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("subtitulo")]
        public string Subtitulo { get; set; }

        [Column("conteudo")]
        public string Conteudo { get; set; }

        [Column("datapublicacao")]
        public DateOnly DataPublicacao { get; set; }

        [Column("horaPublicacao")]
        public string HoraPublicacao { get; set; }

        [Column("caminhoImagem")]
        public string? CaminhoImagem { get; set; }

        [JsonIgnore]
        [NotMapped]
        public IFormFile? ArquivoImagem // Permitindo que o usuário não informe uma imagem
        {
            get
            {
                return _criarArquivoImagem;
            }
            set
            {
                _criarArquivoImagem = value;
                _caminhoImagem = value.FileName;
            }
        }
    }
}