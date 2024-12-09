using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;

namespace COMTUR.Models
{

    [Table("avaliacaoAtracao")]

    public class AvaliacaoAtracaoModel
    {
        [Key]
        [Column("avaliacaoatracaoid")]
        public int Id { get; set; }

        [Column("statusavaliacaoatracao")]
        public TipoStatus Status { get; set; }

        [Column("idavaliacao")]
        [ForeignKey("idavaliacao")]
        public int IdAvaliacao { get; set; }

        [Column("idatracao")]
        [ForeignKey("idatracao")]
        public int IdAtracao { get; set; }


        [JsonIgnore]
        public AvaliacaoModel? AvaliacaoModel { get; set; }

        [JsonIgnore]
        public AtracaoModel? AtracaoModel { get; set; }



        public void Approved() => Status = StatusEnumExtensions.Approved();
        public void Inactive() => Status = StatusEnumExtensions.Inactive();
        public void Disapproved() => Status = StatusEnumExtensions.Disapproved();
        public void Analyzing() => Status = StatusEnumExtensions.Analyzing();

        public string GetState() => IStatusStateExtensions.GetState(Status);
        public bool CanInactive() => IStatusStateExtensions.CanInactive(Status);
        public bool CanAnalyzing() => IStatusStateExtensions.CanAnalyzing(Status);
        public bool CanApproved() => IStatusStateExtensions.CanApproved(Status);
        public bool CanDisapproved() => IStatusStateExtensions.CanDisapproved(Status);
    }
}
