import React, { Component } from 'react';

class SelectedPokemonImage extends Component {
    state = {
        spritesURLObject: this.props.spritesObject,
        spritesPropertyArray: [],
        spritesURLArrayIndex:0
    }
    generatePropertyArray(){
        const spritesURLObject = this.state.spritesURLObject
        const spritesPropertyArray = Object.keys(spritesURLObject).sort((currentProperty, nextProperty) => currentProperty>nextProperty?-1:1).filter(property=>spritesURLObject[property]!==null)//Based on the alphabetical order of property names, we want the ones whose values are front-facing pokemon pictures to be displayed before the rear facing pokemon pictures. We also want to eliminate any property tied to a null value.
        this.setState({spritesPropertyArray: spritesPropertyArray})
    }

    nextImage(){
        let spritesURLArrayIndex = this.state.spritesURLArrayIndex;
        const spritesPropertyArray = this.state.spritesPropertyArray;
        if(spritesURLArrayIndex<(spritesPropertyArray.length-1)){
            spritesURLArrayIndex++
        } else {
            spritesURLArrayIndex = 0;
        }
        
        this.setState({spritesURLArrayIndex: spritesURLArrayIndex})
    }

    renderImage(){
        const spritesURLObject = this.state.spritesURLObject;
        const spritesCurrentProperty = this.state.spritesPropertyArray[this.state.spritesURLArrayIndex]
        const currentSpriteURL = spritesURLObject[spritesCurrentProperty]
        if(currentSpriteURL){
            return <img src={currentSpriteURL} alt={`${this.props.name}-${spritesCurrentProperty}`}/>
        } else {
            return <p>Sorry, no image available</p>
        }
    }

    renderNextImageButton(){
        return this.state.spritesPropertyArray.length>1?<button onClick={()=>this.nextImage()}>Next Image</button>:null
    }
   
    componentDidMount(){
        this.generatePropertyArray()
    }
    render(){
        return(
            <div>
                {this.renderImage()}
                {this.renderNextImageButton()}
            </div>
        )
    }
}


export default SelectedPokemonImage;