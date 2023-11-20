import { useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Context } from '../contexts/data';
import {buscarCoincidencias, buscarGeneroAnio} from '../helpers/dataAcces'

const Paginacion = () => {
  const {pagina,setPagina,queryBusqueda,genero,gestion,totalPaginas,setPeliculas} = useContext(Context);

  const cambiarPagina=(opcion)=>{
    console.log('entra a cambiar pagina',opcion);
    let nuevoValor = pagina + (Number(opcion))
    if(nuevoValor<0) nuevoValor = 1;
    setPagina(nuevoValor);
    buscarPelis(nuevoValor);
    window.scrollTo(0, 0);
  }

  const buscarPelis= async (laPagina)=>{
    let data;
    console.log('mi busqueda',queryBusqueda,queryBusqueda == true,'TP',totalPaginas);
    if(queryBusqueda) data = await buscarCoincidencias(queryBusqueda,laPagina);
    if(!queryBusqueda) data = await buscarGeneroAnio(genero,gestion,laPagina);
    setPeliculas(data.results)
  }


  return (
    <Pagination>
      <Pagination.First onClick={()=> cambiarPagina(-pagina)} />
      {pagina - 5 > 0 &&<Pagination.Prev onClick={()=> cambiarPagina(-5)} />}
      {pagina - 2 > 0 &&<Pagination.Item onClick={()=> cambiarPagina(-2)}>{pagina-2}</Pagination.Item>}
      {pagina - 1 > 0 &&<Pagination.Item onClick={()=> cambiarPagina(-1)}>{pagina-1}</Pagination.Item>}
      <Pagination.Item active>{pagina}</Pagination.Item>
      {pagina +1 < totalPaginas  && <Pagination.Item onClick={()=> cambiarPagina(1)}>{pagina+1}</Pagination.Item>}
      {pagina +2 < totalPaginas  && <Pagination.Item onClick={()=> cambiarPagina(2)}>{pagina+2}</Pagination.Item>}
      {pagina +5 < totalPaginas  && <Pagination.Next onClick={()=> cambiarPagina(5)} />}
      <Pagination.Last onClick={()=> cambiarPagina(1)}/>
    </Pagination>
  )
}

export default Paginacion