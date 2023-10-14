using System.ComponentModel.DataAnnotations.Schema;

namespace COMTUR.Models
{
    public class NoticiaModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string Conteudo { get; set; }
        public DateTime Data { get; set; }
    }
}
