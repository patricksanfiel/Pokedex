import React, { Component } from 'react';
import FindOrDisplayPokemon from './FindOrDisplayPokemon';

class Pokedex extends Component{
    state = {
        sortedPokemonList: []
    }

    getPokemonList(){
        const pokemonSelected = this.state.pokemonSelected
        if(!pokemonSelected){
            fetch("https://pokeapi.co/api/v2/pokemon/?limit=964").then(
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


    componentDidMount(){
        this.getPokemonList()
    }

    render(){
        return(
            <div>
                <h1>Pokedex</h1>
                <FindOrDisplayPokemon pokemonList={this.state.sortedPokemonList}/>
            </div>
        )
    }
}



export default Pokedex;