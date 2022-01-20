
import React, { useState } from "react";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";
import styles from './Editora.module.css';
import api from "../../Api";
import * as AiIcons from 'react-icons/ai';
import * as BiICons from 'react-icons/bi';
import { Editora } from "../../Model/Editora";
import Pagination from "../../layout/Componentes/Pagination";

export default function List() {
  const [editora, setEditora] = useState<Editora[]>([]);
  const [error, setError]:any = useState();
  const [itensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(editora.length / itensPerPage);
  const startIndex = currentPage * itensPerPage ;
  const endIndex = startIndex + itensPerPage;
  const currentItens = editora.slice(startIndex, endIndex);

  React.useEffect(() => {
    api.get("/editora").then((response) => {
      setEditora(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  if (error) return `Erro: ${error.message}`;
  if (!editora) return "Editora não encontrada!";

  return (
    <Container>
      <div className={styles.menu}>
        <Link to={`/editora/create`}><button className={styles.novo}>Criar Nova</button></Link>
      </div> 
      <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Código da Editora</th>
              <th>Nome da Editora</th>
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
          { currentItens.map((editora: any) =>
                <tr className={styles.linhas} key={editora.Codeditora}>
                  <td> {editora.Codeditora}</td>
                  <td >
                    <Link to={`/editora/details/${editora.Codeditora}`} className={styles.link}>
                        {editora.Nomeditora}
                    </Link> 
                  </td>
                    <td>
                    <Link to={`/editora/update/${editora.Codeditora}`}>
                        <AiIcons.AiOutlineEdit  className={styles.icon}/>
                    </Link> 
                    </td>
                    <td>
                    <Link to={`/editora/delete/${editora.Codeditora}`}> 
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