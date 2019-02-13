import React, { Component } from 'react';

class SelectedPokemonStats extends Component{
    state={
        statsObjectArray: this.props.statsObjectArray
    }
    renderStats(){
        const sortedStatsObjectArray = this.state.statsObjectArray.sort((currentObject, nextObject)=>currentObject.stat.name>nextObject.stat.name?1:-1);
        return sortedStatsObjectArray.map(statsObject => {
            const currentStat = statsObject.stat.name
            const currentStatValue = statsObject.base_stat
            return <li key={`${this.props.name}-${currentStat}`}>{currentStat}: {currentStatValue}</li>
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


export default SelectedPokemonStats