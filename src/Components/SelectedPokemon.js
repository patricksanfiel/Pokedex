import React, { Component } from 'react';
import PokemonAbilities from './PokemonAbilities';

class SelectedPokemon extends Component{
    state = {
        currentPokemonObject: this.props.pokemonObject,
        currentPokemonName: this.props.pokemonObject.name,
        currentPokemonAttributeNames: []
    }

    getPokemonAttributeNames(){
        const currentPokemonObject = this.state.currentPokemonObject
        const currentPokemonAttributeNames = this.state.currentPokemonAttributeNames
        for(var property in currentPokemonObject){
            if(property==='abilities' || property === 'height' || property === 'moves' || property === 'sprites' || property === 'stats' || property === 'types'){
                currentPokemonAttributeNames.push(property)
            }
        }
        console.table(currentPokemonAttributeNames)
        this.setState({currentPokemonAttributeNames: currentPokemonAttributeNames})
    }

    renderAttributeElement(){
        const currentPokemonAttributeNames = this.state.currentPokemonAttributeNames
        const currentPokemonObject = this.state.currentPokemonObject
        return currentPokemonAttributeNames.map((attribute) => {
            if(attribute === "abilities"){
                const abilities = currentPokemonObject[attribute]
                return (
                    <PokemonAbilities 
                    key={`${this.state.currentPokemonName}-${attribute}`}
                    abilitiesArray={abilities}
                    />
                )
            }
        })
    }

    componentDidMount(){
        this.getPokemonAttributeNames()
    }
    render(){
        return(
            <div>
                <h1>{this.state.currentPokemonName.toUpperCase()}</h1>
                <div>
                    {this.renderAttributeElement()}
                </div>
                <button
                onClick={this.props.closeButtonClicked}
                >
                    Close
                </button>
            </div>
        )
    }
}

export default SelectedPokemon