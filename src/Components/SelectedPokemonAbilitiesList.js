import React, { Component } from 'react';
import Formatter from "./Formatter"


class SelectedPokemonAbilitiesList extends Component{
    state = {
        abilitiesArray: this.props.abilitiesArray,
        showAbilities: false
    }

    renderAbilities(){
        const abilitiesArray = this.state.abilitiesArray
        return abilitiesArray.map(ability => {
            const currentAbilityName = ability.ability.name
            return <li key={currentAbilityName}>{Formatter(currentAbilityName)}</li>
        })
    }

    toggleDropDown(event){
        const showAbilities = !this.state.showAbilities
        this.setState({showAbilities: showAbilities})
    }

    componentDidMount(){
        
    }


    render(){
        return(
            <div>
                <header>Abilities</header>
                <ul>{this.state.showAbilities?this.renderAbilities():null}</ul>
                <button onClick={(event)=>this.toggleDropDown(event)}>Toggle</button>
            </div>
        )
    }
}


export default SelectedPokemonAbilitiesList;