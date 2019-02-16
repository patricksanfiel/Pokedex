import React from 'react';
import formatter from "../UtilityFunctions/formatter";

const SelectedPokemonTypes = (props) => {
    const typesObjectArray = props.typesObjectArray
    return(
        <div id="selected-pokemon-types-div" className="selected-pokemon-attribute-div">
            <header id="types-header">Types</header>
            {typesObjectArray.map(typeObject => {
                const currentTypeName = typeObject.type.name
                return <button className={`${currentTypeName} type`} key={`${props.name}-${currentTypeName}`}>{formatter(currentTypeName)}</button>
            })}
        </div>
    )
}



export default SelectedPokemonTypes