function fetchPokemon() {
    // pegar o que foi digitado pelo usuário
    const input = document.getElementById('pokemon-input').value.trim();
    
    // Validar o que foi digitado pelo usuário
    if (!input) {
        alert('Por favor digite o nome ou o ID do Pokémon!');
        return;
    }

    // Construir a URL baseado no que foi digitado
    const url = isNaN(input) ? `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}` : `https://pokeapi.co/api/v2/pokemon/${input}`;

    // pegar os dados do Pokémon na api
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            // encontrar a div com o ID "pokemon-container"
            const container = document.getElementById("pokemon-container");
            container.innerHTML = ''; // apagar resultados anteriores
            
            // Criar um elemento img para o pokemon Pokémon
            const img = document.createElement('img');
            img.src = data.sprites.other['dream_world'].front_default || data.sprites.front_default;
            img.alt = `Imagem do Pokémon ${data.name}`;
            
            // adc a imagem ao container
            container.appendChild(img);

            // mostrar detalhes sobre o Pokémon
            const details = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <p><strong>Id:</strong> ${data.id}</p>
                <p><strong>Tipo(s):</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p><strong>Altura:</strong> ${data.height / 10} metros</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            `;
            container.innerHTML += details; // adc detalhes ao container
        })
        .catch(error => {
            // mostrar mensagem de erro
            console.error('Error:', error);
            alert(error.message);
        });
}
