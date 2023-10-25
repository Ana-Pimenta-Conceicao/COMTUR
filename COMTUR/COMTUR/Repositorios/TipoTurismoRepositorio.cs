using COMTUR.Data;
using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Repositorios
{
	public class TipoTurismoRepositorio : ITipoTurismoRepositorio
	{

		private readonly ComturDBContext _dBContext;

		public TipoTurismoRepositorio(ComturDBContext dBContext)
		{
			_dBContext = dBContext;
		}

		public async Task<TipoTurismoModel> BuscarPorNome(string nome)
		{
			return await _dBContext.TipoTurismo.FirstOrDefaultAsync(t => t.Nome == nome);
		}

		public async Task<List<TipoTurismoModel>> BuscarTodosTipoTurismo()
		{
			return await _dBContext.TipoTurismo.ToListAsync();
		}
		public async Task<TipoTurismoModel> Adicionar(TipoTurismoModel tipo)
		{
			await _dBContext.TipoTurismo.AddAsync(tipo);
			await _dBContext.SaveChangesAsync();

			return tipo;
		}
		public async Task<TipoTurismoModel> Atualizar(TipoTurismoModel tipo, string nome)
		{
			TipoTurismoModel tipoTurismoPorNome = await BuscarPorNome(nome);

			if (tipoTurismoPorNome == null)
			{
				throw new Exception($"Tipo de Turismo {nome} não foi encontrado");
			}
			tipoTurismoPorNome.Nome = tipo.Nome;

			_dBContext.TipoTurismo.Update(tipoTurismoPorNome);
			await _dBContext.SaveChangesAsync();

			return tipoTurismoPorNome;
		}

		public async Task<bool> Apagar(string nome)
		{
			TipoTurismoModel tipoTurismoPorNome = await BuscarPorNome(nome);

			if (tipoTurismoPorNome == null)
			{
				throw new Exception($"Tipo de Turismo {nome} não foi encontrado");
			}

			_dBContext.TipoTurismo.Remove(tipoTurismoPorNome);
			await _dBContext.SaveChangesAsync();

			return true;
		}
	}
}
