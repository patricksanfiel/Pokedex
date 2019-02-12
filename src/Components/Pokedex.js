import React, { Component } from 'react';
import SelectedPokemon from './SelectedPokemon';
import PokemonSearch from './PokemonSearch';
import RenderPokemonList from './RenderPokemonList';

class Pokedex extends Component{
    state = {
        sortedPokemonList: [],
        pokemonSelected: false,
        selectedPokemonObject: {},
        viewList: false //false= search by name. True= view list
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



    getSelectedPokemonObject(event){
        const pokemonName = event.target.textContent.trim()
        const pokemonSelected = !this.state.pokemonSelected
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
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
                <PokemonSearch sortedPokemonList={this.state.sortedPokemonList}/>
                {this.state.pokemonSelected?<SelectedPokemon pokemonObject={this.state.selectedPokemonObject} closeButtonClicked={(event)=>this.setState({pokemonSelected: false})}/>:<ul><RenderPokemonList pokemonList={this.state.sortedPokemonList}/></ul>}
            </div>
        )
    }
}



export default Pokedex;