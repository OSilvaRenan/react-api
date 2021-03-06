import React from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../Api";
import Container from "../../layout/Container";
import { Autor } from "../../Model/Autor";
import FormAutor from "../../layout/Componentes/forms/FormAutor";

export default function Create() {
 
  const [autor, setAutor] = React.useState<Autor>();
  const [error, setError]: any = React.useState(null);
  const [values, setValues]: any = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    api.get("/autor").then((response) => {
      setAutor(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);
  
  function onChange(ev: any){
      const {name, value} = ev.target;
      setValues({...values, [name]: value})
  }
 
  function createAutor(ev: any) {
      ev.preventDefault();
      api.post("/autor", values)
          .then((response) => {
            setAutor(response.data);
            alert("Autor Criado!");
            navigate('/autor/list', { replace: true });
          }).catch(error => {
            setError(error);
          });
  }

  if (error) return `Erro: ${error.message}`;
  if (!autor) return "Autor não encontrado!";

  return (
    <Container>
        <FormAutor title="Novo Autor" tabela="autor" onChange={onChange} onSubmit={createAutor} value={values}/>
    </Container>
  );
}