import {createContext} from 'react'

export const Context = createContext({
  genero:'',
  setGenero: () => {},
  gestion:'',
  setGestion: () => {},
  peliculas:[],
  setPeliculas: () => {},
  categorias:[],
  setCategorias: () => {},
  pagina:[],
  setPagina: () => {},
  totalPaginas:[],
  setTotalPaginas: () => {},
  totalResultado:[],
  setTotalResultado: () => {},
  queryBusqueda:[],
  setQueryBusqueda: () => {},
});