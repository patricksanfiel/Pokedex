import React, { Component } from 'react';
import SelectedPokemon from './SelectedPokemon';

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
                    onClick={(event)=>this.getSelectedPokemonObject(event)}
                >
                    {pokemon}
                </li>
            )
        })
    }

    getSelectedPokemonObject(event){
        const pokemonName = event.target.textContent.trim()
        const pokemonSelected = !this.state.pokemonSelected
        fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
            (response) => {
                response.json().then( json => {
                    const selectedPokemonObject = json
                    this.setState({selectedPokemonObject: selectedPokemonObject, pokemonSelected:pokemonSelected})
                })
            }
        )
    }

    componentDidMount(){
        this.getPokemonList()
    }

    render(){
        return(
            <div>
                Pokedex
                {this.state.pokemonSelected?<SelectedPokemon pokemonObject={this.state.selectedPokemonObject}/>:<ul>{this.renderPokemonList()}</ul>}
            </div>
        )
    }
}



export default Pokedex;