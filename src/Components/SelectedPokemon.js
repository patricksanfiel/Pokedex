import React, { Component } from 'react';
import PokemonAbilitiesList from './PokemonAbilitiesList';
import PokemonMovesList from './PokemonMovesList';
import PokemonImage from './PokemonImage';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';

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
            if(property==='abilities' || property === 'height' || property === 'moves' || property === 'sprites' || property === 'stats' || property === 'types' || property === 'weight'){
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
            switch(attribute){
                case("abilities"):
                        const abilities = currentPokemonObject[attribute]
                        return (
                            <PokemonAbilitiesList 
                            key={`${this.state.currentPokemonName}-${attribute}`}
                            abilitiesArray={abilities}
                            />
                        )
                case("height"):
                        const height = currentPokemonObject[attribute]
                        return <div key={`${currentPokemonObject.name}-height`}><span><strong>Height</strong>: {height}</span></div>
                case("weight"):
                        console.log("weight")
                        const weight = currentPokemonObject[attribute]
                        return <div key={`${this.state.currentPokemonName}-weight`}><span><strong>Weight</strong>: {weight}</span></div>
                case("moves"):
                        const moves = currentPokemonObject[attribute]
                        return(
                            <PokemonMovesList 
                            key={`${this.state.currentPokemonName}-${attribute}`}
                            movesArray={moves}
                            />
                        )
                case("sprites"):
                        const sprites = currentPokemonObject[attribute]
                        return(
                            <PokemonImage
                            key={`${this.state.currentPokemonName}-image`}
                            name={this.state.currentPokemonName}
                            spritesObject={sprites}
                            />
                        )
                case("stats"):
                        const stats = currentPokemonObject[attribute]
                        return(
                            <PokemonStats
                            key={`${this.state.currentPokemonName}-stats`}
                            name={this.state.currentPokemonName}
                            statsObjectArray={stats}
                            />
                        )
                case("types"):
                        const types = currentPokemonObject[attribute]
                        return(
                            <PokemonTypes
                            key={`${this.state.currentPokemonName}-types`}
                            name={this.state.currentPokemonName}
                            typesObjectArray={types}
                            />
                        )
                default:
                    break;    
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
            </div>
        )
    }
}

export default SelectedPokemon