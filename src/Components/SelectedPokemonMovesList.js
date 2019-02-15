import React, { Component } from 'react';
import Formatter from './Formatter';

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
        const buttonClicked = event.target.textContent;
        let pageNumber = this.state.pageNumber
        const movesPaginationObject = this.state.movesPaginationObject
        const movesPaginationObjectLength = Object.keys(movesPaginationObject).length
        switch(buttonClicked){
            case("Next"):
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
                return <li key={move}>{Formatter(move)}</li>
            })    
        }
    }

    componentDidMount(){
        this.loadPaginationObject()
    }



    render(){
        return(
            <div>
                <header>Moves</header>
                <ul>
                    {this.renderMoves()}
                </ul>
                <button onClick={(event)=>this.incrementPage(event)}>Previous</button>
                <button onClick={(event)=>this.incrementPage(event)}>Next</button>
            </div>
        )
    }
}


export default SelectedPokemonMovesList;