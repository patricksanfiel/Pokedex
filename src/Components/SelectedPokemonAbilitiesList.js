import React from 'react';
import Formatter from "./Formatter"


const SelectedPokemonAbilitiesList = (props) => {

    const abilitiesArray = props.abilitiesArray
    return(
        <div>
            <header>Abilities</header>
            {abilitiesArray.map(ability => {
                const currentAbilityName = ability.ability.name
                return <li key={currentAbilityName}>{Formatter(currentAbilityName)}</li>
            })}
        </div> 
    )

}


export default SelectedPokemonAbilitiesList;