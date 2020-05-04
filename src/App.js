import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);
  
  const loadRepositories = async () =>{
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  useEffect(()=> {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setRepositories([
      ...repositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const reponse = await api.delete(`repositories/${id}`)
        
    setRepositories([]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(123)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
