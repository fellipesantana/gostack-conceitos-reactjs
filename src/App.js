import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {

        api
            .get('/repositories')
            .then(response => setRepositories(response.data))
            .catch(err => console.log(err));
    }, []);

    async function handleAddRepository() {
        
        const data = {
            title: `Desafio React JS ${Date.now()}`,
            url: "https://github.com/fellipesantana/gostack-conceitos-reactjs",
            techs: ["React", "ReactJS", "webpack", "babel", "Javascript"]
        };

        const response = await api.post('/repositories', data);
        const repository = response.data;

        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {

        const response = await api.delete(`/repositories/${id}`);
        
        if (response.status === 204) {

            const index = repositories.findIndex(repository => repository.id === id);
            const newRepositories = [...repositories];
            newRepositories.splice(index, 1);

            setRepositories(newRepositories);
        } else {

            console.log(response);
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {
                    repositories.map(repository => {
                        
                        return (
                            <li key={ repository.id }>
                                { repository.title }
                                <button onClick={() => handleRemoveRepository( repository.id )}>
                                    Remover
                                </button>
                            </li>
                        );
                    })
                }
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
