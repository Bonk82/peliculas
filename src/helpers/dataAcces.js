const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzc2YWIzOWI3YTY3NjlmM2ZlOTdhMDQ5N2U5NmIxMyIsInN1YiI6IjY0YjVkODBlZTBjYTdmMDEyNTNlN2VmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZeUoqblXqBkRX6c5Aa40HzyUnzpBxEeWg00-Zl7PxJo'
  }
};
export const listarCategorias = async ()=>{
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
    const data = await response.json();
    console.log({data});
    return data;
}

export const buscarGeneroAnio = async (genero,anio,pagina=1)=>{
  console.log('buscarGeneroAnio',genero,anio);
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=es-ES&page=${pagina}&sort_by=popularity.desc&with_genres=${genero}&year=${anio}`
  if(!genero) url = url.replace(`&with_genres=${genero}`,'');
  if(!anio) url = url.replace(`&year=${anio}`,'');
  console.log('la url final',url);
  const response = await fetch(url, options)
    const data = await response.json();
    // console.log({data});
    return data;
}
export const buscarCoincidencias = async (query,pagina=1)=>{
  console.log('buscarCoincidencias',query);
  let url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=es-ES&page=${pagina}`
  console.log('la url final',url);
  const response = await fetch(url, options)
    const data = await response.json();
    // console.log({data});
    return data;
}

