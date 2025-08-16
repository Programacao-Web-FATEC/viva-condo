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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-800 p-6 px-16 rounded-md">
        <h1 className="text-2xl font-bold text-white">{obterSaudacao(morador)}</h1>
      </div>
    </div>
  )
}

export default Home;