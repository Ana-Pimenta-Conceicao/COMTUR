using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly INoticiaRepository _noticiaRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public NoticiaController(INoticiaRepository noticiaRepository, IWebHostEnvironment hostingEnvironment)
        {
            _noticiaRepository = noticiaRepository;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<List<NoticiaModel>>> BuscarNoticia()
        {
            List<NoticiaModel> noticia = await _noticiaRepository.BuscarNoticia();
            return Ok(noticia);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorId(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);

            if (noticia != null && noticia.CaminhoImagem != null)
            {
                noticia.CaminhoImagem = $"{Request.Scheme}://{Request.Host}/{noticia.CaminhoImagem}";
            }

            return Ok(noticia);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromForm] NoticiaModel noticiaModel)
        {
            if (noticiaModel.ArquivoImagem != null)
            {
                await _noticiaRepository.SalvarImagem(noticiaModel.ArquivoImagem, _hostingEnvironment);
            }

            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromForm] NoticiaModel noticiaModel, int id)
        {
            noticiaModel.Id = id;

            if (noticiaModel.ArquivoImagem != null)
            {
                await _noticiaRepository.ExcluirImagem(noticiaModel.ArquivoImagem.FileName, _hostingEnvironment);

                await _noticiaRepository.SalvarImagem(noticiaModel.ArquivoImagem, _hostingEnvironment);
            }

            NoticiaModel noticia = await _noticiaRepository.Atualizar(noticiaModel, id);

            return Ok(noticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<NoticiaModel>> Apagar(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);

            if (noticia == null)
                return NotFound();

            bool apagado = await _noticiaRepository.Apagar(id, _hostingEnvironment);

            if (apagado)
            {
                // Delete the image file if it exists
                if (!string.IsNullOrEmpty(noticia.CaminhoImagem) && System.IO.File.Exists(noticia.CaminhoImagem))
                {
                    try
                    {
                        System.IO.File.Delete(noticia.CaminhoImagem);
                    }
                    catch (Exception ex)
                    {
                        // Log the exception or handle it in some other way
                        Console.WriteLine($"Erro ao excluir a imagem: {ex.Message}");
                    }
                }
            }

            return Ok(apagado);
        }
    }
}