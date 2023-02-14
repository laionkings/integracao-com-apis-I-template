import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";




const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const headers = {
    headers: {
      authorization: "laion-pereira",
    },
  };

  const recebeUsuarioPorId = (id) => {
    axios
      .get(
        `"https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}"`,
        headers
      )
      .then((resposta) => {
        setUsuario(resposta.data);
      })
      .catch((erro) => {
        alert(erro.response.data.message);
      });
  };
  
  useEffect(() => {
    recebeUsuarioPorId(usuario.id);
  }, []);
  
  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button>Excluir</button>
    </User>
  );
}

export default Usuario;
