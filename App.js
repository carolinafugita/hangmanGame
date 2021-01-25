import React from 'react';
import './App.css';
import fetchFilmes from './fetchFilmes';
import Teclado from './Teclado'

const i = Math.floor(Math.random() * 2);

class Erros extends React.Component{
  render(){

    let erros = "Erros: " + (this.props.erros) + "/5"

    return(
      <div>
        <h1>{erros}</h1>
      </div>
    )
  }
}

class JaUsadas extends React.Component{
  render(){

    let jaUsadas = "Letras já usadas: " + imprimirSet(this.props.jaUsadas);

    return(
      <div>
        <h1>{jaUsadas}</h1>
      </div>
    )
  }
}


class Dicas extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dica : ''
    }
  }

  displayDicas = () => {

    let dica = this.props.dicas[i];

    this.setState({
      dica : dica
    })
  }

  render(){

    return(
      <div>
        <button onClick = {this.displayDicas}>Dica</button>
        <p>{this.state.dica}</p>
      </div>
    )
  }
}


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      erros : 0,
      acabou : false,
      letra : null,
      jaUsadas : new Set (),
      palavra_display : display ( "default" ),
      atualizado : false,
      filme : {
        nome : "default",
        nomeSemAcento : "default",
        dataLancamento : '1900-01-01',
        generos : ['default']
      },
      letrasCorretas : new Set ()

    }
    
    this.handleChange = this.handleChange.bind(this);
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

  handleChange = (event) => {
    let l = puxaLetra(event.target.value);
    this.setState({letra: l});
    this.jogo();
    console.log(this.state.letra);
  }

  adicionarLetraUsada = () => {
    let a = this.state.letra,
        jaUsadas = this.state.jaUsadas;
    
    jaUsadas.add(a);

    this.setState({
      jaUsadas : jaUsadas
    })
  }

  letraErrada = () => {
    let erro = this.state.erros;
    erro = erro +1;
    this.setState({ erros : erro })

    if(erro === 5){
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
    console.log(palavra_display);

    if(filme === palavra_display.join('')){
      this.setState({ acabou : true });
    }
  }

  jogo = () =>{
    let letra = this.state.letra,
        jaUsadas = this.state.jaUsadas;

    if(letra){
      if( this.state.letrasCorretas.has(letra) === false && jaUsadas.has(letra) === false ){
        this.letraErrada();
        this.adicionarLetraUsada();
      }
      else if( this.state.letrasCorretas.has(letra) === true && jaUsadas.has(letra) === false){
        this.inserirLetra();
        this.adicionarLetraUsada();
      }
    }
  }

  displayNullFix = () => {
    if(!this.state.atualizado){
      return "LOADING...";
    }
    else{
      return displaySpace(this.state.palavra_display); /*.join */
    }
  }

  resultado = () => {
   if(this.state.acabou){
    let mensagemFinal = (this.state.erros === 5) ? "Fim!" : "Acertou!";
    return (
      <div className = "palavra">
        <h1>{mensagemFinal}</h1>
        <p>O Filme era "{this.state.filme.nome}".</p>
        <button onClick = {() => window.location.reload(false)}>Novo Jogo</button>
      </div>
      )
    }
   else{
    let dicas = [
       'Gênero(s): ' + this.state.filme.generos,
       'Data de Lançamento: ' + this.state.filme.dataLancamento]
    return (
    <div>
      <h1>{this.displayNullFix()}</h1>
      <Teclado onClick = {this.handleChange}/>
      <Erros 
      erros = {this.state.erros} />
      <JaUsadas 
      jaUsadas = {this.state.jaUsadas}/>
      <Dicas
      dicas = {dicas}/>
    </div>
    )
   }
  }

  render(){
    return (
      <div className = "palavra">
        <h1>
          Jogo da Forca
        </h1>
        {this.resultado()}
      </div>
    );
  }
}


export default App;

function puxaLetra(a){ // puxa letra do input
  let letra = a.toLowerCase();
  let _letrasValidas = new Set ("abcdefghijklmnopqrstuvxywz0123456789");
  if( _letrasValidas.has(letra) ){
    return letra;	
  }
  else{
    return null;
  }
}

function imprimirSet(_set){
  let _set_array = Array.from(_set),
      _setImprimir = '';
  for(let i = 0; i < _set_array.length; i++){
    _setImprimir += ' ' + _set_array[i];
  }
  return _setImprimir;
}

function display (palavra){

  const characProblematicos = new Set (": '-?!.&,½");
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

function displaySpace (palavra_display){
  let rv = palavra_display.map((tag) => {
  return (<nobr>{tag}&nbsp;</nobr>);
 })
 return rv;

}