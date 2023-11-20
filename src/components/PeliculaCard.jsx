import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Context} from '../contexts/data'

export const PeliculaCard = ({titulo,texto,imagen,cat=[],estreno}) => {
  const {categorias} = useContext(Context)
  const miData = useContext(Context)
  return (
    <Card  data-bs-theme="dark">
      <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500/'+imagen}/>
      <Card.Body>
        <Card.Title style={{color:'#0dcaf0'}}>{titulo}</Card.Title>
        <Card.Text>
          {texto}{miData.genero}
        </Card.Text>
        <p>Categorías:</p>
        {cat.map((c,i)=>{
          return (
            <strong key={c}>{categorias.filter(f=>f.id == c)[0].name}{i<cat.length-1?', ':''}</strong>
          )
        })}
        <br/>
        <label>Fecha Estreno: </label>&nbsp;&nbsp;<strong>{new Date(estreno).toLocaleDateString()}</strong>
        <Button variant="outline-info" style={{display:'block',marginTop:'1rem'}} className='btn-card'>Más detalles...</Button>
      </Card.Body>
    </Card>
  )
}
