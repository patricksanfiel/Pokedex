import React, { Component } from 'react';

class Pokedex extends Component{
    state = {
        sortedPokemonList: [],
        pokemonSelected: false,
        selectedPokemonObject: {}
    }

    getPokemonList(){
        const pokemonSelected = this.state.pokemonSelected
        if(!pokemonSelected){
            fetch("http://pokeapi.co/api/v2/pokemon/?limit=964").then(
                response => {
                    response.json().then(
                        (json) => {
                            const results = json.results
                            const pokemonNames = results.map((element) => element.name)
                            const sortedPokemonList = pokemonNames.sort((currentPokemon, nextPokemon) => currentPokemon>nextPokemon?1:-1)
                            this.setState({sortedPokemonList: sortedPokemonList})
                        }    
                    )
                }
            )
        }
    }

    renderPokemonList(){
        const sortedPokemonList = this.state.sortedPokemonList;
        return sortedPokemonList.map((pokemon) => {
            return(
                <li 
                    key={pokemon}
                    onClick={()=>alert(pokemon)}
                >
                    {pokemon}
                </li>
            )
        })
    }

    componentDidMount(){
        this.getPokemonList()
    }

    render(){
        return(
            <div>
                Pokedex
                {this.state.pokemonSelected?console.log("hi"):<ul>{this.renderPokemonList()}</ul>}
            </div>
        )
    }
}



export default Pokedex;