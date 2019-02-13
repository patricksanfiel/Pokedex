import React, { Component } from 'react';

class SelectedPokemonTypes extends Component{
    state = {
        typesObjectArray:this.props.typesObjectArray
    }
    renderTypeBadges(){
        const typesObjectArray = this.state.typesObjectArray
        return typesObjectArray.map(typeObject => {
            const currentTypeName = typeObject.type.name
            return <button className={currentTypeName} key={`${this.props.name}-${currentTypeName}`}>{currentTypeName}</button>
        })
    }
    render(){
        return(
            <div>
                Types: {this.renderTypeBadges()}
            </div>
        )
    }
}



export default SelectedPokemonTypes