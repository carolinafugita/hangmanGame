import React from 'react';

class Teclado extends React.Component{

constructor(props){
  super(props);
  this.letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  this.state = {
      botaoClicado : false
  }
} 
  
renderLetra (j) {
    return (
        <button
          className = {this.state.botaoClicado ? "letra_clicada" : "letra"}
          value = {this.letras[j]}
          onClick = {this.props.onClick}>
            {this.letras[j]}
        </button>
    )
}
  
render(){
  
    return(
        <div className = "teclado">
          <div className = "linha_teclado">
            {this.renderLetra(0)}{this.renderLetra(1)}{this.renderLetra(2)}{this.renderLetra(3)}
            {this.renderLetra(4)}{this.renderLetra(5)}{this.renderLetra(6)}{this.renderLetra(7)}
            {this.renderLetra(8)}{this.renderLetra(9)}{this.renderLetra(10)}{this.renderLetra(11)}
            {this.renderLetra(12)}{this.renderLetra(13)}
          </div>
          <div className = "linha_teclado">
            {this.renderLetra(14)}{this.renderLetra(15)}{this.renderLetra(16)}{this.renderLetra(17)}
            {this.renderLetra(18)}{this.renderLetra(19)}{this.renderLetra(20)}{this.renderLetra(21)}
            {this.renderLetra(22)}{this.renderLetra(23)}{this.renderLetra(24)}{this.renderLetra(25)}
          </div>
          <div className = "linha_teclado">
            {this.renderLetra(26)}{this.renderLetra(27)}{this.renderLetra(28)}{this.renderLetra(29)}
            {this.renderLetra(30)}{this.renderLetra(31)}{this.renderLetra(32)}{this.renderLetra(33)}
            {this.renderLetra(34)}{this.renderLetra(35)}
          </div>
        </div>
      )  
    }
}

export default Teclado;
