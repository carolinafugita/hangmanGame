import React from 'react';
import './App.css';

class TelaFinal extends React.Component {
    render () {

        let imagePath = 'https://image.tmdb.org/t/p/w500' + this.props.filme.foto;

        return (
            <div>
                <header>
                    <h1>
                        {(this.props.erros +1 === 5) ? "Fim!" : "Acertou!"}
                    </h1>
                </header>
                <div className = "body">
                    <div className = "blocoTelaFinal">
                        <img
                            alt="Descrição"
                            style={{
                                width: '250px',
                                objectFit: 'cover'
                        }}
                        src={imagePath}
                        />
                        <div className = "detalhesFilme">
                            <h1>
                                {this.props.filme.nome}
                            </h1>
                            <h2>
                                {this.props.filme.dataLancamento.getFullYear()}
                            </h2>
                            <h2>
                                {this.props.filme.generos}
                            </h2>
                            <p>
                                {this.props.filme.sinopse}
                            </p>
                        </div>
                    </div>
                    <button
                            className = "botao"
                            onClick = {() => window.location.reload(false)}>
                                Novo Jogo
                    </button>
                </div>
            </div>
        )
    };
}

export default TelaFinal;