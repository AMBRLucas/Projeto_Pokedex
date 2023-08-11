//Seleção dos Elementos HTML
let areaPokemon = document.querySelector('.pokemons')
let nomePokemon = document.querySelector('.nome-pokemon')
let imagePokemon = document.querySelector('.imagem-pokemon')
let pokeID = document.querySelector('.id-pokemon');
let tipo = document.querySelector('.tipo')
let tipoSpan = document.querySelector('.tipo-pokemon')
let segundoTipo = document.querySelector('.segundoTipo')
let segundoTipoSpan = document.querySelector('.segundoTipo-pokemon')
let infoArea = document.querySelector('.informacoes')
let hp = document.querySelector('.hp-content')
let atk = document.querySelector('.atk-content')
let def = document.querySelector('.def-content')
let spATK = document.querySelector('.sp-atk-content')
let spDEF = document.querySelector('.sp-def-content')
let speed = document.querySelector('.speed-content')

// Função para deixar a primeira letra do nome maiuscula
function maiuscula(nome) {
    return nome.charAt(0).toUpperCase() + nome.substr(1);
};

// Requisição dos dados da PokeAPI
const pokemons = async () => {
    try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0');

        // Tratamento de erro
        if(!response.ok){
            throw Error("nao foi possivel obter informações");
        }

        // Armazenando o retorno da PokeAPI
        const { results: pokeApiResults } = await response.json();

        // Loop para criação dos Cards dos pokemons usando os dados da API
        for(let pokemon of pokeApiResults){

            // Usando no numero do index do Array de objetos + 1 para servir como o numero de registro do pokemon na pokedex
            let numeroPokemon = pokeApiResults.indexOf(pokemon) + 1;

            // Criando e Estilizando o Card dos pokemons
            const pokeCard = document.createElement('div');
            pokeCard.classList.add('pokeCard');

            // Adicionando o espaço para imagem do pokemon no card
            const pokeImage = document.createElement('div');
            pokeImage.classList.add('pokeImage');

            // Adicionando o numero e o nome do respectivo pokemon
            const pokeName = document.createElement('div');
            pokeName.classList.add('pokeName');
            pokeName.innerText = `${numeroPokemon}. ${maiuscula(pokemon.name)}`

            // Adiciona o botão de detalhes ao card do pokemon
            const pokeButton = document.createElement('div');
            pokeButton.classList.add('pokeButton');
            pokeButton.innerText = "Detalhes"

            // Criando a imagem do pokemon
            const image = document.createElement('img');
            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`;

            // Adicionando tudo à pagina principal
            areaPokemon.appendChild(pokeCard);
            pokeCard.appendChild(pokeImage);
            pokeImage.appendChild(image);
            pokeCard.appendChild(pokeName);
            pokeCard.appendChild(pokeButton);

            // Adicionando evento de click no botão de detalhes, para informações mais especificas do pokemon escolhido
            pokeButton.addEventListener('click', async () => {
                // Requisição para a PokeAPI de dados especificos do pokemon escolhido
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`);
                
                // Armazena os dados especificos 
                const info = await response.json();
                
                // Define o display do tipo secundario com "none" para somente exibi-lo quando o pokemon tiver mais de um tipo
                segundoTipo.style.display = "none"
                
                // Deixa o nome do pokemon recebido com a primeira letra maiuscula
                let nome = maiuscula(pokemon.name)

                // Define o valor da area de nome do pokemon como o nome do pokemon escolhido
                nomePokemon.innerText = nome;

                // Cria, define e Exibe na tela a imagem aumentada do pokemon escolhido
                const imagemGrande = document.createElement('img');
                imagemGrande.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`;
                imagePokemon.innerHTML = '';
                imagePokemon.appendChild(imagemGrande);

                // Mostra o numero do pokemon na pokedex
                pokeID.innerText = `#${info.id}`

                // Exibe o tipo do pokemon e caso tenha um segundo tipo, exibe ele tambem 
                tipoSpan.innerText = `${maiuscula(info.types[0].type.name)}`
                if(info.types.length > 1){
                    segundoTipo.style.display = "flex"
                    segundoTipoSpan.innerText = `${maiuscula(info.types[1].type.name)}`
                }

                // Exibe os status do pokemon escolhido
                hp.innerText = `${info.stats[0].base_stat}`
                atk.innerText = `${info.stats[1].base_stat}`
                def.innerText = `${info.stats[2].base_stat}`
                spATK.innerText = `${info.stats[3].base_stat}`
                spDEF.innerText = `${info.stats[4].base_stat}`
                speed.innerText = `${info.stats[5].base_stat}`
            })

        };

    } catch (error) {
        console.log(error);
    };
};

pokemons()