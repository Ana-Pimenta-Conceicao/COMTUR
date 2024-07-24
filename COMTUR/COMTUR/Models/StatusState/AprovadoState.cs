using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Models.StatusState
{
	public class AprovadoState : IStatusStateRepositorio
	{
		public string State { get; } = "Aprovado";
		public bool CanEdit() => true;
		public bool CanRelate() => true;
		public bool CanToRemove() => true;
	}
}

