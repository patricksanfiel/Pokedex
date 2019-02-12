import React, {Component} from 'react';
import RenderPokemonList from './RenderPokemonList';

class PokemonSearch extends Component{
    state = {
        searchedPokemon:[],
    }
    searchPokemonByName(event){
        const searchQuery = event.target.value;
        const sortedPokemonList = this.props.sortedPokemonList;
        const searchedPokemon = [];
        sortedPokemonList.forEach(pokemon=>pokemon.includes(searchQuery)?searchedPokemon.push(pokemon):false)
        this.setState({searchedPokemon: searchedPokemon})
    }

    // renderSearchedPokemon(){
    //     const searchedPokemon = this.state.searchedPokemon;
    //     return searchedPokemon.map(pokemon => <li key={pokemon} onClick={(event)=>this.getSelectedPokemonObject(event)}>{pokemon}</li>)
    // }

    render(){
        return(
            <div>
                <label>Search</label>
                <input onChange={(event)=>this.searchPokemonByName(event)} style={{border:"1px solid black"}}></input>
                <RenderPokemonList pokemonList={this.state.searchedPokemon}/>
            </div>
        )
    }
}


export default PokemonSearch