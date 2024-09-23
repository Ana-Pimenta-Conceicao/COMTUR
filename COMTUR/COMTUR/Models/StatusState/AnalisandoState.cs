using COMTUR.Models.Enum;

namespace COMTUR.Models.StatusState
{
    public class AnalisandoState : IStatusState
	{
		public string State { get; } = "em Análise";

		public bool CanInactive() => false; // Analizando -X Desativado
		public bool CanAnalyzing() => false; // Analizando -X Analizando
		public bool CanApproved() => true; // Analizando -> Aprovado
		public bool CanDisapproved() => true; // Analizando -> Reprovado
	}
}