using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAtracaoRepositorio
	{
		Task<List<AtracaoModel>> BuscarAtracao();
		Task<AtracaoModel> GetByIdTipoAtracao(int id);
		Task<AtracaoModel> GetByIdTurismo(int id);
		Task<AtracaoModel> GetByIdUsuario(int id);
		Task<AtracaoModel> BuscarPorId(int id);
		Task<AtracaoModel> Adicionar(AtracaoModel Atracao);
		Task<AtracaoModel> Atualizar(AtracaoModel Atracao, int id);
		Task<bool> Apagar(int id);
		Task<List<ImagemAtracaoModel>> BuscarImagensPorAtracaoId(int atracaoId);
		//Task<List<AtracaoModel>> ListarPorTipoStatus(int tipoStutus);
	}
}

