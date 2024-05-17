using Newtonsoft.Json;
using System;

namespace COMTUR.Models
{
    public class AuditoriaModel
    {
        public Guid Id { get; set; }
        public string Data { get; set; }
        public string Hora { get; set; }
        public string Operacao { get; set; }
        public string NomeEntidade { get; set; }
        public string? ValoresAntigos { get; set; }
        public string? NovosValores { get; set; }
        public int IdUsuario { get; set; }

        public object DeserializeValoresAntigos()
        {
            return JsonConvert.DeserializeObject<Dictionary<string, object>>(this.ValoresAntigos);
        }

        public object DeserializeNovosValores()
        {
            return JsonConvert.DeserializeObject<Dictionary<string, object>>(this.NovosValores);
        }

        public void ObterData()
        {
            DateTime data = DateTime.UtcNow;
            this.Data = data.ToString("dd/MM/yyyy");
        }

        public void ObterHora()
        {
            DateTime data = DateTime.UtcNow;
            this.Hora = data.ToString("HH:mm");
        }
    }
}