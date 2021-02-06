import api_key from './api_key';

const pag_aleatoria = Math.floor(Math.random() * 400).toString() /*parece dar problema para pags > 400*/,
      filme_aleatorio = Math.floor(Math.random() * 20);

async function fetchFilmes (){
    
    const filme = await fetchFilmesLista(),
          listaGen = await fetchGeneros();

    let gen = [];

    for(let i = 0; i < filme.genre_ids.length; i++){
        for(let j = 0; j < listaGen.genres.length; j++){
            if( filme.genre_ids[i] === listaGen.genres[j].id )
            gen.push(listaGen.genres[j].name);
        }
    }
    
    const filme_detalhes = {
        nome : filme.title,
        nomeSemAcento : semAcentos(filme.title),
        dataLancamento : filme.release_date,
        generos : gen.join('/ '),
        atualizado : true
    }
    
    return filme_detalhes;
}

async function fetchGeneros (){
    
    const urlStart = "https://api.themoviedb.org/3/genre/movie/list",
          key = api_key(),
          language = 'pt-BR';
    let params=[];
        params.push ('api_key=' + key);
        params.push ('language=' + language);
    let url = urlStart + '?' + params.join('&');

    const generos = await fetch(url)
    .then( (result) => {
        return result.json();
    })
    .then( (data) => {
        return data;
    })
    
    return generos;
}

async function fetchFilmesLista (){

    const urlStart = "https://api.themoviedb.org/3/movie/top_rated",
          key = api_key(),
          language = 'pt-BR';
    let params = [];
        params.push ('api_key=' + key);
        params.push ('language=' + language);
        params.push ('page=' + pag_aleatoria);
    let url = urlStart + '?' + params.join('&');

    const filme = await fetch(url)
        .then( (result) =>  {
            return result.json();
        })
        .then( function(data) {
            return data.results[filme_aleatorio];
        })
    return filme;
}

export default fetchFilmes;

function semAcentos(palavra){
    
    const acentos ="ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ'",
          removeAcentos = "aaaaaaaceeeeiiiionoooooouuuuyrsbaaaaaaaceeeeiiiionoooooouuuuybyr ";
    var palavraSem = "", temAcento;

    for (let i = 0; i < palavra.length ; i++) {
        temAcento = false;
        for (let j = 0; j < acentos.length ; j++) {
            if( palavra[i] === acentos[j] ){
                palavraSem += removeAcentos[j];
                temAcento = true;
            }
        }

        if(!temAcento){
            palavraSem += palavra[i];
        }
    }
    return palavraSem.toLowerCase();
}
/*
GENEROS: https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
TOP RATED: https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
*/
