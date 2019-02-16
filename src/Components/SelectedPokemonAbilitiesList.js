import React from 'react';
import formatter from "../UtilityFunctions/formatter"


const SelectedPokemonAbilitiesList = (props) => {

    const abilitiesArray = props.abilitiesArray
    return(
        <div className="selected-pokemon-attribute-div">
            <header>Abilities</header>
            <ul>
                {abilitiesArray.map(ability => {
                    const currentAbilityName = ability.ability.name
                    return <li className="attribute-list-item" key={currentAbilityName}>{formatter(currentAbilityName)}</li>
                })}
            </ul>
        </div> 
    )

}


export default SelectedPokemonAbilitiesList;