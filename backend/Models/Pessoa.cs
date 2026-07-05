using System.Collections.Generic;

namespace backend.Models
{
    public class Pessoa
    {
        public int Id{get;}
        public string Nome{ get; set;}
        public int Idade{ get; set;}

        public List<Transacao> Transacaos {get; set;} = new List<Transacao>();
    }
}