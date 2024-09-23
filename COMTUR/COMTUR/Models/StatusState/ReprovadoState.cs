using COMTUR.Models.Enum;

namespace COMTUR.Models.StatusState
{
    public class ReprovadoState : IStatusState
	{
		public string State { get; } = "Reprovado";

		public bool CanInactive() => false; // Reprovado -X Desativado
		public bool CanAnalyzing() => true; // Reprovado -> Analizando
		public bool CanApproved() => false; // Reprovado -X Aprovado
		public bool CanDisapproved() => false; // Reprovado -X Reprovado
	}
}

