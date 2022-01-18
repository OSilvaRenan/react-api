
import React from "react";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";
import styles from './Autor.module.css';
import api from "../../Api";
import * as AiIcons from 'react-icons/ai';

export default function List() {
  const [autor, setAutor]: any = React.useState(null);
  const [error, setError]: any = React.useState(null);
  
  React.useEffect(() => {
    api.get("/autor").then((response) => {
      setAutor(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  if (error) return `Erro: ${error.message}`;
  if (!autor) return "Autor não encontrado!";

  const autores: any = autor.map((autor: any) =>
  
   <tbody key={autor.Codautor}>
     <tr>
        <td>{autor.Codautor}</td>
        <td >
          <Link to={`/autor/details/${autor.Codautor}`} className={styles.link}>
              {autor.Nomautor}
          </Link> 
        </td>
         <td>
          <Link to={`/autor/update/${autor.Codautor}`}>
              <AiIcons.AiOutlineEdit  className={styles.icon}/>
          </Link> 
         </td>
         <td>
          <Link to={`/autor/delete/${autor.Codautor}`}> 
              <AiIcons.AiOutlineRest  className={styles.icon}/>
          </Link>
         </td>
     </tr>
   </tbody>
);

  return (
    <Container>
      <div className={styles.menu}>
        <Link to={`/autor/create`}><button className={styles.novo}>Criar Novo</button></Link>
      </div>

      <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Código do Autor</th>
              <th>Nome do Autor</th>
              <th colSpan={2}>Opções</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className={styles.links}><a href="#">&laquo;</a> <a className={styles.active} href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
              </td>
            </tr>
          </tfoot>
          {autores}
      </table>
    </Container>
  );
}