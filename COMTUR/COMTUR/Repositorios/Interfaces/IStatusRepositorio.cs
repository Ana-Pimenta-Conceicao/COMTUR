namespace COMTUR.Repositorios.Interfaces
{
	public interface IStatusRepositorio
	{
		bool Status { get; set; }
	}

	public static class IStatusExtensions
	{
		public static void DisableAllOperations(IStatusRepositorio status)
		{
			status.Status = false;
		}

		public static void EnableAllOperations(IStatusRepositorio status)
		{
			status.Status = true;
		}
	}
}

