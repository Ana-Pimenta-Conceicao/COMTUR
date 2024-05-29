using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IImagemAtracaoRepositorio
	{
		Task<List<ImagemAtracaoModel>> BuscarImagemAtracao();
		Task<ImagemAtracaoModel> GetByIdAtracao(int id);
		Task<ImagemAtracaoModel> GetByIdUsuario(int id);
		Task<ImagemAtracaoModel> BuscarPorId(int id);
		Task<ImagemAtracaoModel> Adicionar(ImagemAtracaoModel imagemAtracao);
		Task<ImagemAtracaoModel> Atualizar(ImagemAtracaoModel imagemAtracao, int id);
		Task<bool> Apagar(int id);

	}
}
