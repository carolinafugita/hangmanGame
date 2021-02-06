import React from 'react';
import './App.css';
import fetchFilmes from './fetchFilmes';
import Teclado from './Teclado';
import TelaFinal from './TelaFinal';

class Erros extends React.Component{

  render(){

    return(
      <div className = "erros">
        <div className = {this.props.erros.vErros[0] ? "erroMarcado" : "erro"}>
          <h1> X </h1>
        </div>
        <div className = {this.props.erros.vErros[1] ? "erroMarcado" : "erro"}>
          <h1> X </h1>
        </div>
        <div className = {this.props.erros.vErros[2] ? "erroMarcado" : "erro"}>
          <h1> X </h1>
        </div>
        <div className = {this.props.erros.vErros[3] ? "erroMarcado" : "erro"}>
          <h1> X </h1>
        </div>
        <div className = {this.props.erros.vErros[4] ? "erroMarcado" : "erro"}>
          <h1> X </h1>
        </div>
      </div>
    )
  }
}


class App extends React.Component {

  constructor(props){
    super(props);

    this.letras = "abcdefghijklmnopqrstuvwxyz0123456789";

    this.state = {

      erros : {
        indice : -1,
        vErros : new Array(5).fill(false)
      },
      acabou : false,
      letra : null,
      letrasJaClicadas : new Array(36).fill(false),
      palavra_display : display ( "default" ),
      atualizado : false,
      filme : {
        nome : "default",
        nomeSemAcento : "default",
        dataLancamento : new Date ("1990-01-01"),
        generos : ['default'],
        foto : "default",
        sinopse : "default"
      },
      letrasCorretas : new Set ()

    }
    
  }

  componentDidMount = async () => {
    const returnFilme = await fetchFilmes();
    this.setState ({
      filme : returnFilme,
      palavra_display : display ( returnFilme.nome ),
      letrasCorretas : new Set ( returnFilme.nomeSemAcento ),
      atualizado : true
    });
  }

  clicaLetra = (event) => {
    
    let l = event.target.value;
    let letrasJaClicadas = this.state.letrasJaClicadas;
    letrasJaClicadas[l] = true;

    this.setState({letrasJaClicadas : letrasJaClicadas})
    
    this.setState({letra: this.letras[l]});
    
    setTimeout(() => {
      this.jogo();
    }, 200);
    
  }


  letraErrada = () => {
    let erro = this.state.erros;
    erro.indice = erro.indice +1;
    erro.vErros[erro.indice] = true;
    this.setState({
      erros : erro 
    })

    if(erro.indice +1 === 5){
      this.setState({ acabou : true });
    }
  }

  inserirLetra = () =>{
    let palavra_display = this.state.palavra_display,
        a = this.state.letra,
        filme = this.state.filme.nome,
        filmeSemAcento = this.state.filme.nomeSemAcento;

    for (var i = filme.length - 1; i >= 0; i--) {
      if ( filmeSemAcento[i] === a ){
        palavra_display[i] = filme[i];
      }
    }

    this.setState({
      palavra_display : palavra_display
    })

    if(filme === palavra_display.join('')){
      this.setState({ acabou : true });
    }
  }

  jogo = () =>{
    let letra = this.state.letra;

    if(letra){
      if( this.state.letrasCorretas.has(letra) === false ){
        this.letraErrada();
      }
      else if( this.state.letrasCorretas.has(letra) === true ){
        this.inserirLetra();
      }
    }
  }

  displayNullFix = () => {
    if(!this.state.atualizado){
      return "LOADING...";
    }
    else{
      return displayPalavras(this.state.palavra_display); 
    }
  }

  resultado = () => {
   if(this.state.acabou){

    return (
      <TelaFinal
        erros = {this.state.erros.indice}
        filme = {this.state.filme}
      />
      )
    }
    
   else{
    
    return (
    <div>
      <header>
          <h1> Qual é o filme? </h1>
      </header>
      <div className = "body">
        <section className  = "filme">
          {this.displayNullFix()}
        </section>
        <Teclado
          onClick = {this.clicaLetra}
          botaoClicado = {this.state.letrasJaClicadas} 
        />
        <Erros 
        erros = {this.state.erros}
        />
      </div>
    </div>
    )
    
   }
  }

  render(){
    return (
      <div className = "forca">
          {this.resultado()}
      </div>
    );
  }
}


export default App;


function display (palavra){

  const characProblematicos = new Set ("$@*)/}{(#: '-?!.&,;=½+-][%><ºª");
  let palavra_display = Array(palavra.length);

  for (let i = 0; i < palavra.length; i++) {
    if(characProblematicos.has(palavra[i])){
      palavra_display[i] = palavra[i];
    }
    else{
      palavra_display[i] = '_';
    }
  }
  
  return palavra_display;
}

function displayPalavras (palavra_display){

  let vetores = palavra_display.join('').split(" ");
  
  let abc = vetores.map( (palavra , i) => {
    return(
      <div
        className = "palavra"
        key={i} >
          {palavra.split('').join(' ')}
      </div>)
  })

  return abc;
}