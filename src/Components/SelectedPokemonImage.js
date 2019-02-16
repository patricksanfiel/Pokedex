import React, { Component } from 'react';
const pokeball = require("../Assets/Images/pokeball.svg")

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

    changeImage(event){
        let spritesURLArrayIndex = this.state.spritesURLArrayIndex;
        const spritesPropertyArray = this.state.spritesPropertyArray;
        const spritesPropertyArrayFinalPosition = (spritesPropertyArray.length-1)
        const buttonClicked = event.target.getAttribute("data-button")
        switch(buttonClicked){
            case("previous"):
                if(spritesURLArrayIndex>0){
                    spritesURLArrayIndex--
                } else {
                    spritesURLArrayIndex = (spritesPropertyArrayFinalPosition)
                }
                break;
            default:
                if(spritesURLArrayIndex<spritesPropertyArrayFinalPosition){
                    spritesURLArrayIndex++
                } else {
                    spritesURLArrayIndex = 0;
                }
        }
        this.setState({spritesURLArrayIndex: spritesURLArrayIndex})
    }

    renderImage(){
        const spritesURLObject = this.state.spritesURLObject;
        const spritesCurrentProperty = this.state.spritesPropertyArray[this.state.spritesURLArrayIndex]
        const currentSpriteURL = spritesURLObject[spritesCurrentProperty]
        if(currentSpriteURL){
            return(
                <div>
                    <img src={currentSpriteURL} alt={`${this.props.name}-${spritesCurrentProperty}`}/>
                </div> 
            )
        } else {
            return(
                <div>
                    <img src={pokeball} alt="pokeball" id="pokeball-image" height="100px" width="100px"/>
                    <p>Sorry, no image available</p>
                </div>
            )
        }
    }

    renderChangeImageButtons(){
        if(this.state.spritesPropertyArray.length>1){
            return(
                <div>
                    <button onClick={(event)=>this.changeImage(event)} className="carousel-button"><i className="fas fa-arrow-left" data-button="previous"></i></button>
                    <button onClick={(event)=>this.changeImage(event)} className="carousel-button"><i className="fas fa-arrow-right" data-button="next"></i></button>
                </div>
            )
        } else {
            return null
        }
    }
   
    componentDidMount(){
        this.generatePropertyArray()
    }
    render(){
        return(
            <div id="selected-pokemon-image-div" className="selected-pokemon-attribute-div">
                {this.renderImage()}
                {this.renderChangeImageButtons()}
            </div>
        )
    }
}


export default SelectedPokemonImage;