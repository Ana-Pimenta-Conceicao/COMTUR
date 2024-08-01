using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class AprovadoState : IStatusStateRepositorio
	{
		public string State { get; } = "Aprovado";

		public bool CanInactive() => true; // Aprovado -> Desativado
		public bool CanAnalyzing() => false; // Aprovado -X Analizando
		public bool CanApproved() => false; // Aprovado -X Aprovado
		public bool CanDisapproved() => false; // Aprovado -X Reprovado
	}
}

