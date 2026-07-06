using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// minha entidade/modelo pra representar o morador no sistema
namespace backend.Models
{
    public class Pessoa
    {
        // foi usado a anotação [Key] para deixar explicito para Entity Framework que esta propriedade eh a chave primaria
        [Key]
        public int Id{get; set;}

        public string? Nome{ get; set;}
        public int Idade{ get; set;}

        // mapeia a relação de 1 para N
        // estou instanciando para ele iniciar com uma lista vazia e nao dá erro como NullReferenceException
        public List<Transacao> Transacoes {get; set;} = new List<Transacao>();
    }
}