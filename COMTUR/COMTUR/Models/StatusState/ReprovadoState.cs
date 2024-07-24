using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class ReprovadoState : IStatusStateRepositorio
	{
		public string State { get; } = "Reprovado";
		public bool CanEdit() => false;
		public bool CanRelate() => false;
		public bool CanToRemove() => false;
	}
}

