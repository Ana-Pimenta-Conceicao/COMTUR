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
            List<NoticiaModel> noticias = await _noticiaRepository.BuscarNoticia();

            foreach (var noticia in noticias)
            {
                if (noticia.CaminhoImagem != null)
                {
                    // Criando a url em cada objeto que tiver uma imagem
                    noticia.CaminhoImagem = $"{Request.Scheme}://{Request.Host}/imagens/{noticia.CaminhoImagem}";
                }
            }

            return Ok(noticias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorId(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);

            if (noticia != null && noticia.CaminhoImagem != null)
            {
                noticia.CaminhoImagem = $"{Request.Scheme}://{Request.Host}/imagens/{noticia.CaminhoImagem}";
            }

            return Ok(noticia);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromForm] NoticiaModel noticiaModel)
        {
            if (noticiaModel.ArquivoImagem != null) // Verificando se algum arquivo foi passado
            {
                String path = await _noticiaRepository.SalvarImagem(noticiaModel.ArquivoImagem, _hostingEnvironment); // Salvando o resultado em uma string
                if (path != null) { noticiaModel.CaminhoImagem = noticiaModel.ArquivoImagem.FileName; } // Se uma imagem foi salva (path não é nulo), passa o nome da mesma para caminhoImagem
            }

            NoticiaModel noticia = await _noticiaRepository.Adicionar(noticiaModel);
            if (noticia.CaminhoImagem != null)
            {
                // Cria a url para a imagem, caso alguma imagem tenha sido salva
                noticia.CaminhoImagem = $"{Request.Scheme}://{Request.Host}/imagens/{noticia.CaminhoImagem}";
            }

            return Ok(noticia);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromForm] NoticiaModel noticiaModel, int id)
        {
            noticiaModel.Id = id;

            if (noticiaModel.CaminhoImagem == null) // Verificando se veio alguma url no json (a url criada para o arquivo), caso não tenha, atualizamos a imagem
            {
                String path = await _noticiaRepository.AtualizarImagem(id, noticiaModel.ArquivoImagem, _hostingEnvironment); // Salvando o resultado em uma string
                if (path != null) { noticiaModel.CaminhoImagem = noticiaModel.ArquivoImagem.FileName; } // Se uma imagem foi salva (path não é nulo), passa o nome da mesma para caminhoImagem
            }

            NoticiaModel noticia = await _noticiaRepository.Atualizar(noticiaModel, id);
            if (noticia.CaminhoImagem != null)
            {
                // Cria a url para a imagem, caso alguma imagem tenha sido salva
                noticia.CaminhoImagem = $"{Request.Scheme}://{Request.Host}/imagens/{noticia.CaminhoImagem}";
            }

            return Ok(noticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<NoticiaModel>> Apagar(int id)
        {
            NoticiaModel noticia = await _noticiaRepository.BuscarPorId(id);

            if (noticia == null)
                return NotFound();

            if (noticia.CaminhoImagem != null) // Verificando se o objeto obtido possue uma imagem
            {
                await _noticiaRepository.ExcluirImagem(noticia.CaminhoImagem, _hostingEnvironment);
            }
            bool apagado = await _noticiaRepository.Apagar(id, _hostingEnvironment);

            return Ok(apagado);
        }
    }
}