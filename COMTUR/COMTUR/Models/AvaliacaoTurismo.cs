using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using COMTUR.Models.Enum;

namespace COMTUR.Models
{

    [Table("avaliacaoTurismo")]

    public class AvaliacaoTurismoModel
    {
        [Key]
        [Column("avaliacaoturismoid")]
        public int Id { get; set; }

        [Column("statusavaliacaoturismo")]
        public TipoStatus Status { get; set; }

        [Column("idavaliacao")]
        [ForeignKey("idavaliacao")]
        public int IdAvaliacao { get; set; }

        [Column("idturismo")]
        [ForeignKey("idturismo")]
        public int IdTurismo { get; set; }


        [JsonIgnore]
        public AvaliacaoModel? AvaliacaoModel { get; set; }

        [JsonIgnore]
        public TurismoModel? TurismoModel { get; set; }



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
