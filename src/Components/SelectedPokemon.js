import React, { Component } from 'react';
import SelectedPokemonAbilitiesList from './SelectedPokemonAbilitiesList';
import SelectedPokemonMovesList from './SelectedPokemonMovesList';
import SelectedPokemonImage from './SelectedPokemonImage';
import SelectedPokemonStats from './SelectedPokemonStats';
import SelectedPokemonTypes from './SelectedPokemonTypes';
import formatter from '../UtilityFunctions/formatter'

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
            if(property==='abilities' || property === 'height' || property === 'moves' || property === 'sprites' || property === 'stats' || property === 'types'|| property === 'weight'){
                currentPokemonAttributeNames.push(property)
            }
        }
        this.setState({currentPokemonAttributeNames: currentPokemonAttributeNames})
    }

    renderAttributeElement(){
        const sortOrder = ["sprites", "height", "weight", "types", "stats", "abilities", "moves"]
        const currentPokemonAttributeNames = this.state.currentPokemonAttributeNames.sort((currentAtt, nextAtt) => {
            return sortOrder.indexOf(currentAtt)>sortOrder.indexOf(nextAtt)?1:-1
        })
        const currentPokemonObject = this.state.currentPokemonObject
        return currentPokemonAttributeNames.map((attribute) => {
            switch(attribute){
                case("abilities"):
                        const abilities = currentPokemonObject[attribute]
                        return (
                            <SelectedPokemonAbilitiesList 
                            key={`${this.state.currentPokemonName}-${attribute}`}
                            abilitiesArray={abilities}
                            />
                        )
                case("height"):
                        const height = currentPokemonObject[attribute]
                        return <div className="selected-pokemon-attribute-div" key={`${currentPokemonObject.name}-height`}><span><strong>Height</strong>: {height}</span></div>
                case("weight"):
                        const weight = currentPokemonObject[attribute]
                        return <div className="selected-pokemon-attribute-div" key={`${this.state.currentPokemonName}-weight`}><span><strong>Weight</strong>: {weight}</span></div>
                case("moves"):
                        const moves = currentPokemonObject[attribute]
                        return(
                            <SelectedPokemonMovesList 
                            key={`${this.state.currentPokemonName}-${attribute}`}
                            movesArray={moves}
                            />
                        )
                case("sprites"):
                        const sprites = currentPokemonObject[attribute]
                        return(
                            <SelectedPokemonImage
                            key={`${this.state.currentPokemonName}-image`}
                            name={this.state.currentPokemonName}
                            spritesObject={sprites}
                            />
                        )
                case("stats"):
                        const stats = currentPokemonObject[attribute]
                        return(
                            <SelectedPokemonStats
                            key={`${this.state.currentPokemonName}-stats`}
                            name={this.state.currentPokemonName}
                            statsObjectArray={stats}
                            />
                        )
                case("types"):
                        const types = currentPokemonObject[attribute]
                        return(
                            <SelectedPokemonTypes
                            key={`${this.state.currentPokemonName}-types`}
                            name={this.state.currentPokemonName}
                            typesObjectArray={types}
                            />
                        )
                default:
                    return null;    
            }
        })
    }

    componentDidMount(){
        this.getPokemonAttributeNames()
    }
    render(){
        return(
            <div id="selected-pokemon">
                <h1>{formatter(this.state.currentPokemonName)}</h1>
                <div>
                    {this.renderAttributeElement()}
                </div>
            </div>
        )
    }
}

export default SelectedPokemon