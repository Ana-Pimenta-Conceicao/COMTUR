using COMTUR.Data;
using COMTUR.Models;
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
	public class EmpresaRepositorio : IEmpresaRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;

		public EmpresaRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = webHostEnvironment;
		}

		public async Task<EmpresaModel> BuscarPorId(int id)
		{
			return await _dbContext.Empresa.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<EmpresaModel> GetById(int id)
		{
			return await _dbContext.Empresa.Include(objeto => objeto.EmpresarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<EmpresaModel>> BuscarEmpresa()
		{
			return await _dbContext.Empresa.ToListAsync();
		}

		public async Task<EmpresaModel> Adicionar(EmpresaModel empresaModel)
		{
			await _dbContext.Empresa.AddAsync(empresaModel);
			await _dbContext.SaveChangesAsync();

			return empresaModel;
		}

		public async Task<EmpresaModel> Atualizar(EmpresaModel empresaModel, int id)
		{
			EmpresaModel empresaPorId = await BuscarPorId(id);

			if (empresaPorId == null)
			{
				throw new Exception($"Empresa {id} nao foi encontrada no banco de dados. ");
			}

			empresaPorId.Id = empresaModel.Id;
			empresaPorId.Nome = empresaModel.Nome;
			empresaPorId.CNPJ = empresaModel.CNPJ;
			empresaPorId.Endereco = empresaModel.Endereco;
			empresaPorId.Imagem = empresaModel.Imagem;
			empresaPorId.LegendaImagem = empresaModel.LegendaImagem;
			empresaPorId.Descricao = empresaModel.Descricao;

			_dbContext.Empresa.Update(empresaPorId);
			await _dbContext.SaveChangesAsync();

			return empresaPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			var empresaParaExcluir = await BuscarPorId(id);

			if (empresaParaExcluir == null)
			{
				throw new Exception($"Empresa {id} não encontrada");
			}

			_dbContext.Empresa.Remove(empresaParaExcluir);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
