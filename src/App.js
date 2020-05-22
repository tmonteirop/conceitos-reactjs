import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
   
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'https://github.com/tmonteirop/conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS']
    });
    const respository = response.data;
    setRepositories([...repositories, respository]);

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);
    const tempRepository = [...repositories];
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    tempRepository.splice(repositoryIndex, 1);
    setRepositories(tempRepository);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul> <br/>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
