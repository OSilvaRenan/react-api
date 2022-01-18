import React from "react";
import { useNavigate} from "react-router-dom"; 
import api from "../../Api";
import Container from "../../layout/Container";
import { Editora } from "../../Model/Editora";
import FormEditora from "../../layout/Componentes/forms/FormEditora";

export default function Create() {

  const [editora, setEditora] = React.useState<Editora>();
  const [error, setError]: any  = React.useState(null);
  const [values, setValues]: any  = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    api.get(`/editora`).then((response) => {
      setEditora(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  function onChange(ev: any){
    const {name, value} = ev.target;
    setValues({...values, [name]: value})
}

  function createEditora(ev: any) {
    ev.preventDefault();
    api.post("/editora", values)
        .then((response) => {
          setEditora(response.data);
          alert("Editora Criada!");
          navigate('/editora/list', { replace: true });
        }).catch(error => {
          setError(error);
        });

  }

  if (error) return `Erro: ${error.message}`;
  if (!editora) return "Editora não encontrada!";

  return (
    <Container>
       <FormEditora tabela="editora" titulo="Nova Editora" onChange={onChange} onSubmit={createEditora} value={values}/>
    </Container>
  );
}