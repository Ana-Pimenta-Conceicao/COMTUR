using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IImagemEmpresaRepositorio
	{
		Task<List<ImagemEmpresaModel>> BuscarImagemEmpresa();
		Task<ImagemEmpresaModel> GetById(int id);
		Task<ImagemEmpresaModel> BuscarPorId(int id);
		Task<ImagemEmpresaModel> Adicionar(ImagemEmpresaModel imagemEmpresa);
		Task<ImagemEmpresaModel> Atualizar(ImagemEmpresaModel imagemEmpresa, int id);
		Task<bool> Apagar(int id);
	}
}
