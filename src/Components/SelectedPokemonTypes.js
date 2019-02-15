import React from 'react';

const SelectedPokemonTypes = (props) => {
    const typesObjectArray = props.typesObjectArray
    return(
        <div>
            <header>Types</header>
            {typesObjectArray.map(typeObject => {
                const currentTypeName = typeObject.type.name
                return <button className={currentTypeName} key={`${props.name}-${currentTypeName}`}>{currentTypeName}</button>
            })}
        </div>
    )
}



export default SelectedPokemonTypes