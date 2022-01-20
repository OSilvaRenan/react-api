
import React, { useState } from "react";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";
import styles from './Autor.module.css';
import api from "../../Api";
import * as AiIcons from 'react-icons/ai';
import * as BiICons from 'react-icons/bi';
import { Autor } from "../../Model/Autor";
import Pagination from "../../layout/Componentes/Pagination";


export default function List() {
  const [autor, setAutor] = useState<Autor[]>([]);
  const [error, setError]: any = useState(null);
  const [itensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  React.useEffect(() => {
    api.get("/autor").then((response) => {
      setAutor(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  if (error) return `Erro: ${error.message}`;
  if (!autor) return "Autor não encontrado!";
  
  const pages = Math.ceil(autor.length / itensPerPage);
  const startIndex = currentPage * itensPerPage ;
  const endIndex = startIndex + itensPerPage;
  const currentItens = autor.slice(startIndex, endIndex);

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
                <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
              </td>
            </tr>
          </tfoot>
          <tbody >
          { currentItens.map((autor: any) =>
                <tr className={styles.linhas} key={autor.Codautor}>
                  <td> {autor.Codautor}</td>
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
                        <BiICons.BiTrash  className={styles.icon}/>
                    </Link>
                    </td>
                </tr>  
          )}
           </tbody>
      </table>
    </Container>
  );
}