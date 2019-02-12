import React, { Component } from 'react';

class PokemonStats extends Component{
    state={
        statsObjectArray: this.props.statsObjectArray
    }
    renderStats(){
        const sortedStatsObjectArray = this.state.statsObjectArray.sort((currentObject, nextObject)=>currentObject.stat.name>nextObject.stat.name?1:-1);
        return sortedStatsObjectArray.map(statsObject => {
            const currentStat = statsObject.stat.name
            const currentStatValue = statsObject.base_stat
            return <li key={`${this.props.name}-${currentStat}`}>{currentStat}: {statsObject.base_stat}</li>
        })
    }
    render(){
        return(
            <div>
                {this.renderStats()}
            </div>
        )
    }
}


export default PokemonStats