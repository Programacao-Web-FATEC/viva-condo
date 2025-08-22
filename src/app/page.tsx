"use client"

type Morador = {
  primeiroNome: string;
  sobrenome: string;
}

const Home = () => {

  const element = <span>Olá mundo, tudo bem?</span>;

  function formatarNomeMorador(morador: Morador) {
    return morador.primeiroNome + ' ' + morador.sobrenome;
  }

  function obterSaudacao(morador: null | Morador) {
    if (morador) {
      return <span>Olá, {formatarNomeMorador(morador)}!</span>
    }
    return <span>Olá, Estranho!!!</span>
  }

  //object
  const morador: Morador = {
    primeiroNome: 'Sandro',
    sobrenome: 'Pereira'
  };

  return (
    <div id="principal" className="flex items-center justify-center min-h-screen bg-black">
      <div id="componente-azul" className="card-azul">
        <h1 id="name" className="text-2xl font-bold text-center">
          {obterSaudacao(morador)}
        </h1>
      </div>
    </div>
  )
}

export default Home;