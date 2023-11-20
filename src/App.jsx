// import { useState } from 'react'

import { useEffect, useState } from 'react';
import './App.css'
import { Navegador } from './components/Navegador'
import { PeliculaCard } from './components/PeliculaCard'
import { Context } from './contexts/data';
import {listarCategorias} from './helpers/dataAcces'
import Paginacion from './components/Paginacion';

function App() {
  const [genero, setGenero] = useState('');
  const [gestion, setGestion] = useState(2023);
  const [peliculas, setPeliculas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalResultado, setTotalResultado] = useState(0);
  const [queryBusqueda, setQueryBusqueda] = useState('');
  // const setGen = (g) => setGenero(g);
  // const setGes = (g) => setGestion(g);
  // const setPelis = (p) => setPeliculas(p);

  useEffect(() => {
    obtenerGeneros();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const obtenerGeneros = async () =>{
    const c = await listarCategorias();
    setCategorias(c.genres)
    console.log('las categorias',c.genres);
  }

  return (
    <Context.Provider value={{genero,setGenero,gestion,setGestion,peliculas,setPeliculas,categorias,pagina,setPagina
    ,totalPaginas,setTotalPaginas,totalResultado,setTotalResultado,queryBusqueda,setQueryBusqueda}}>
      <div>
        <Navegador cat={categorias}/>
        <div className='grid-pelis'>
          {console.log('las pelis',peliculas)}
          {peliculas.map(p=>{
            return (
              <PeliculaCard titulo={p.title} key={p.id} texto={p.overview} imagen={p.poster_path} cat={p.genre_ids} estreno={p.release_date}/>
            )
          })}
        </div>
        <div style={{width:'100vw',display:'flex',justifyContent:'center'}}>
          {peliculas.length>0 && <Paginacion></Paginacion>}
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
