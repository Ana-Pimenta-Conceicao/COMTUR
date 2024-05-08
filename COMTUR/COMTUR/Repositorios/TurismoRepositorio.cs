using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace COMTUR.Repositorios
{
	public class TurismoRepositorio : ITurismoRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;

		public TurismoRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = webHostEnvironment;
		}

		public async Task<TurismoModel> BuscarPorId(int id)
		{
			return await _dbContext.Turismo.Include(n => n.ImagemTurismo).FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<TurismoModel> GetByIdUsuario(int id)
		{
			return await _dbContext.Turismo.Include(objeto => objeto.UsuarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<TurismoModel> GetByIdTipoTurismo(int id)
		{
			return await _dbContext.Turismo.Include(objeto => objeto.TipoTurismoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		/*public async Task<List<TurismoModel>> ListarPorTipoStatus(int tipoStatus)
		{
			return await _dbContext.Turismo
				.Where(x => (int)x.TipoStatus == tipoStatus)
				.ToListAsync();
		}*/

		public async Task<List<TurismoModel>> BuscarTurismo()
		{
			return await _dbContext.Turismo.ToListAsync();
		}

		public async Task<TurismoModel> Adicionar(TurismoModel TurismoModel)
		{
			/*if (!Enum.IsDefined(typeof(TipoStatus), TurismoModel.TipoStatus))
			{
				throw new ArgumentException("Tipo de status inválido");
			}*/

			await _dbContext.Turismo.AddAsync(TurismoModel);
			await _dbContext.SaveChangesAsync();

			return TurismoModel;
		}

		public async Task<TurismoModel> Atualizar(TurismoModel TurismoModel, int id)
		{
			TurismoModel TurismoPorId = await BuscarPorId(id);

			/*if (!Enum.IsDefined(typeof(TipoStatus), TurismoModel.TipoStatus))
			{
				throw new ArgumentException("Tipo de status inválido");
			}*/

			if (TurismoPorId == null)
			{
				throw new Exception($"Turismo {id} nao foi encontrada no banco de dados. ");
			}

			TurismoPorId.Id = TurismoModel.Id;
			TurismoPorId.Nome = TurismoModel.Nome;
			TurismoPorId.Descricao = TurismoModel.Descricao;
			TurismoPorId.Horario = TurismoModel.Horario;
			TurismoPorId.QRCode = TurismoModel.QRCode;
			TurismoPorId.Local = TurismoModel.Local;
			TurismoPorId.DiaFuncionamento = TurismoModel.DiaFuncionamento;
			TurismoPorId.UsuarioModel = TurismoModel.UsuarioModel;
			//TurismoPorId.TipoStatus = TurismoModel.TipoStatus;

			_dbContext.Turismo.Update(TurismoPorId);
			await _dbContext.SaveChangesAsync();

			return TurismoPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			var TurismoParaExcluir = await BuscarPorId(id);

			if (TurismoParaExcluir == null)
			{
				throw new Exception($"Turismo {id} não encontrada");
			}

			_dbContext.Turismo.Remove(TurismoParaExcluir);
			await _dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<List<ImagemTurismoModel>> BuscarImagensPorTurismoId(int TurismoId)
		{
			// Use o Entity Framework para consultar as imagens associadas a uma Turismo específica
			var imagens = await _dbContext.ImagemTurismo
										   .Where(imagem => imagem.IdTurismo == TurismoId)
										   .ToListAsync();
			return imagens;
		}
	}
}
