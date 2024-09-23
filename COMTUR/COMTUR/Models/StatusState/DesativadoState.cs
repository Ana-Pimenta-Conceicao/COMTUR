using COMTUR.Models.Enum;

namespace COMTUR.Models.StatusState
{
    public class DesativadoState : IStatusState
	{
		public string State { get; } = "Desativado";

		public bool CanInactive() => false; // Desativado -X Desativado
		public bool CanAnalyzing() => false; // Desativado -X Analizando
		public bool CanApproved() => false; // Desativado -X Aprovado
		public bool CanDisapproved() => false; // Desativado -X Reprovado
	}
}