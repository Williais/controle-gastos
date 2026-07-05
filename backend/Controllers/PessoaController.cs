using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        // aq eu estou injetando a dependência considerando que eu preciso acessar o SQLite para receber o banco pronto do Program.cs
        private readonly BdContext bd;

        public PessoaController(BdContext bd)
        {
            this.bd = bd;
        }


        //endpoint da listagem
        [HttpGet]
        public IActionResult RecuperarPessoas()
        {
            // aq eu estou indo ao meu banco, pegando a tabela pessoa, transformando em uma lista e retornando um http 200, ja convertido em um json
            var ListagemPessoa = bd.Pessoa.ToList();

            return Ok(ListagemPessoa);
        }


        //endpoint da criação
        [HttpPost]
        public IActionResult CriarPessoa([FromBody] Pessoa pessoa)
        {

            if (pessoa == null)
            {
                return BadRequest("Os dados da pessoa não podem ser nulos.");
            }

            //aq estou capturando o obj que chegou e salvando na lista de Pessoa
            var PessoaCriada = bd.Pessoa.Add(pessoa);

            //depois eu salvo essa nova informação no SQLite
            bd.SaveChanges();

            //e por fim, retorno o obj de volta pra avisar que o ID foi gerado
            return Ok(PessoaCriada);
        }


        //endpoint da deleção
        [HttpDelete("{id}")]
        public IActionResult DeletarPessoa(int idPessoa)
        {
            //estou recuperando a pessoa que tenha esse ID
            
            var pessoa = bd.Pessoas.Find(id);
            //verifico se ela existe
            if (pessoa == null)
            {
                return NotFound("Pessoa nao encontrada");
            }

            //depois eu removo ela do banco de dados e salvo a alteração
            bd.Pessoas.Remove(pessoa);
            bd.SaveChanges();

            return Ok(new { mensagem ="Pessoa apagada"});
            
        }

    }
}