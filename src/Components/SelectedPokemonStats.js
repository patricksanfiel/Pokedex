import React from 'react';
import Formatter from "./Formatter";

const SelectedPokemonStats =  (props) => {
    const sortedStatsObjectArray = props.statsObjectArray.sort((currentObject, nextObject)=>currentObject.stat.name>nextObject.stat.name?1:-1);
    return(
        <div>
            <header>Stats</header>
            {sortedStatsObjectArray.map(statsObject => {
                const currentStat = statsObject.stat.name
                const currentStatValue = statsObject.base_stat
                return <li key={`${props.name}-${currentStat}`}>{Formatter(currentStat)}: {currentStatValue}</li>
            })}
        </div>
    )
}


export default SelectedPokemonStats