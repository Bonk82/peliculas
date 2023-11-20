import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../contexts/data';
import {buscarCoincidencias, buscarGeneroAnio} from '../helpers/dataAcces'


export const Navegador = () => {
  const {setGenero,setGestion,setPeliculas,setTotalPaginas,setTotalResultado,setQueryBusqueda,genero,gestion,categorias,pagina} = useContext(Context)
  
  const onChangeGenero = (event)=>{
    // console.log('el genero',event.target.value);
    setGenero(event.target.value)
    obtenerPelis(event.target.value,gestion)
  }
    
  const onChangeGestion = (event)=>{
    // console.log('la gestion',event.target.value);
    setGestion(event.target.value)
    obtenerPelis(genero,event.target.value)
  }

  const obtenerPelis = async (gen,ges)=>{
    const data = await buscarGeneroAnio(gen,ges,pagina);
    // console.log('las pelis',data);
    setPeliculas(data.results)
    setTotalPaginas(data.total_pages)
    setTotalResultado(data.total_results)
    setQueryBusqueda('');
    document.getElementById("buscar").value = '';
  }
  const obtenerPelisQuery = async (e)=>{
    e.preventDefault();
    const query = document.getElementById("buscar").value;
    // console.log('lo que busca',query);
    const data = await buscarCoincidencias(query,pagina);
    // console.log('las pelis query',data);
    setPeliculas(data.results)
    setTotalPaginas(data.total_pages)
    setTotalResultado(data.total_results)
    setGenero('');
    setGestion(2023);
    setQueryBusqueda(query)
    document.getElementById("selGenero").value = 0
    document.getElementById("selGestion").value = 0
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" style={{color:'#0dcaf0',fontWeight:'bold'}}>Peli-Pedia</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form.Select aria-label="Default select example" onChange={onChangeGenero} id='selGenero'>
              <option value={0}>Genero...</option>
              {categorias.map(c=>{
                return(
                  <option value={c.id} key={c.id}>{c.name}</option>    
                )
              })}
            </Form.Select>
            <Form.Select className="mx-2" aria-label="Default select example" onChange={onChangeGestion} id='selGestion'>
              <option value={0}>Año...</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </Form.Select>
          </Nav>
          <Form className="d-flex" onSubmit={obtenerPelisQuery}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
              id='buscar'
            />
            <Button variant="outline-success" id='btnBuscar' onClick={obtenerPelisQuery}>Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
