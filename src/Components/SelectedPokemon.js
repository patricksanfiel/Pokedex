import React, { Component } from 'react';

class SelectedPokemon extends Component{
    state = {
        currentPokemonObject: this.props.pokemonObject,
        currentPokemonName: this.props.pokemonObject.name
    }
    render(){
        return(<p>{this.state.currentPokemonName}</p>)
    }
}

export default SelectedPokemon