import React from 'react';
import formatter from "../UtilityFunctions/formatter";

const SelectedPokemonStats =  (props) => {
    const sortedStatsObjectArray = props.statsObjectArray.sort((currentObject, nextObject)=>currentObject.stat.name>nextObject.stat.name?1:-1);
    return(
        <div className="selected-pokemon-attribute-div">
            <header>Stats</header>
            <ul>
                {sortedStatsObjectArray.map(statsObject => {
                    const currentStat = statsObject.stat.name
                    const currentStatValue = statsObject.base_stat
                    return <li className="attribute-list-item" key={`${props.name}-${currentStat}`}>{formatter(currentStat)}: {currentStatValue}</li>
                })}
            </ul>
        </div>
    )
}


export default SelectedPokemonStats