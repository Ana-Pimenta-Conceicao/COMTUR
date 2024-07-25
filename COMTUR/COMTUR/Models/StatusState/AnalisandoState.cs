using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class AnalisandoState : IStatusStateRepositorio
	{
		public string State { get; } = "em Análise";

		public bool CanInactive() => false; // Analizando -X Desativado
		public bool CanAnalyzing() => false; // Analizando -X Analizando
		public bool CanApproved() => true; // Analizando -> Aprovado
		public bool CanDisapproved() => true; // Analizando -> Reprovado
	}
}