import React, { Component } from 'react';
import formatter from '../UtilityFunctions/formatter';

class SelectedPokemonMovesList extends Component{
    state={
        movesArray:this.props.movesArray,
        formattedMovesArray:[],
        movesPaginationObject:{},
        pageNumber:1
    }

    
    loadPaginationObject(){
        let currentPageArray = []
        let pageCounter = 0
        let moveCounter = 0
        let movesPaginationObject = {}
        const movesArray = this.state.movesArray.map(move=>move.move.name).sort()
        movesArray.forEach(move => {
            moveCounter++
            currentPageArray.push(move)
            if(currentPageArray.length===5){
                pageCounter++
                movesPaginationObject[`${pageCounter}`] = currentPageArray
                currentPageArray = []
            } else if(moveCounter===movesArray.length){
                pageCounter++
                movesPaginationObject[`${pageCounter}`] = currentPageArray
                currentPageArray = []
            }
        })
        this.setState({movesPaginationObject:movesPaginationObject})
    }
    

    incrementPage(event){
        const buttonClicked = event.target.getAttribute("data-button");
        let pageNumber = this.state.pageNumber
        const movesPaginationObject = this.state.movesPaginationObject
        const movesPaginationObjectLength = Object.keys(movesPaginationObject).length
        console.log(buttonClicked)
        switch(buttonClicked){
            case("next"):
                pageNumber = (pageNumber+1)<=movesPaginationObjectLength?pageNumber+1:1
                break
            default:
                pageNumber = (pageNumber-1)>=1?pageNumber-1:movesPaginationObjectLength
        }
        this.setState({pageNumber: pageNumber})
    }

    renderMoves(){
        const movesPaginationObject = this.state.movesPaginationObject
        const pageNumber = this.state.pageNumber
        const currentlyDisplayedMoves = movesPaginationObject[pageNumber]
        if(currentlyDisplayedMoves){
            return currentlyDisplayedMoves.map(move => {
                return <li className="attribute-list-item" key={move}>{formatter(move)}</li>
            })    
        }
    }

    componentDidMount(){
        this.loadPaginationObject()
    }



    render(){
        return(
            <div className="selected-pokemon-attribute-div">
                <header>Moves</header>
                <ul>
                    {this.renderMoves()}
                </ul>
                <button onClick={(event)=>this.incrementPage(event)} className="carousel-button"><i className="fas fa-arrow-left" data-button="previous"></i></button>
                <button onClick={(event)=>this.incrementPage(event)} className="carousel-button"><i className="fas fa-arrow-right" data-button="next"></i></button>
            </div>
        )
    }
}


export default SelectedPokemonMovesList;