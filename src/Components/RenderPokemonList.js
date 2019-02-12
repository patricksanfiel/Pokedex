import React, {Component} from 'react';
import SelectedPokemon from './SelectedPokemon';

class RenderPokemonList extends Component {
    state = {
        pokemonList: this.props.pokemonList,
        selectedPokemon: "",
        selectedPokemonObject:{}
    }

    GetSelectedPokemonObject(event){
        const selectedPokemon = event.target.textContent.trim()
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(
            (response) => {
                console.log(response)
                response.json().then( json => {
                    const selectedPokemonObject = json
                    this.setState({selectedPokemonObject: selectedPokemonObject})
                })
            }
        )
    }


    render(){
        const pokemonList = this.props.pokemonList
        const pokemonObject = this.state.selectedPokemonObject
        if(!pokemonObject.name){
            return pokemonList.map(pokemon=>{
                return(
                    <li 
                    key={pokemon}
                    onClick={(event)=>this.GetSelectedPokemonObject(event)}
                    >
                        {pokemon}
                    </li>)
            })
        } else {
            return (
                <div>
                    <SelectedPokemon pokemonObject={this.state.selectedPokemonObject}/>
                    <button onClick={()=>this.setState({selectedPokemonObject:{}})}>Close</button>
                </div>
            )
        }
        
    }
}


export default RenderPokemonList;