import React, { Component } from 'react';

class SelectedPokemonMovesList extends Component{
    state={
        movesArray:this.props.movesArray,
        startAt:0,
        endAt:5,
        currentlyDisplayedMoves: []
    }

    renderMoves(){
        const movesArray = this.state.movesArray
        const startAt = this.state.startAt;
        const endAt = startAt+5
        const sortedMovesArray = movesArray.sort((currentMove, nextMove) => currentMove.move.name>nextMove.move.name?1:-1)
        const currentlyDisplayedMoves = sortedMovesArray.slice(startAt, endAt)
        return currentlyDisplayedMoves.map(move => {
            const currentMove = move.move.name
            return <li key={currentMove}>{currentMove}</li>
        })
    }
    
    incrementStartPoint(event){
        const previousEndAt = this.state.endAt;
        const movesArrayFinalIndex = (this.state.movesArray.length-1); //The last index of the moves array which will not return undefined.
        let incrementBy = previousEndAt+5>movesArrayFinalIndex?5-((previousEndAt+5)-movesArrayFinalIndex): 5 //By default, increment by 5 items at a time. If Incrementing by 5 would put us out of the moveArray's index range, we find the maximum number we could increment by without moving out of the range and set the incrementer to that.
        let updatedStartAt = previousEndAt
        let updatedEndAt = updatedStartAt+incrementBy;
        if ( incrementBy === 0){//Only occurs if the updatedEndAt point has already been set to the movesArrayFinalIndex once already
            incrementBy = 5;
            updatedStartAt = 0;
            updatedEndAt = updatedStartAt+incrementBy;

        }
        console.log("incrementby", incrementBy)
        console.log("updatedStartAt", updatedStartAt)
        console.log("updatedEndAt", updatedEndAt)
        this.setState({startAt: updatedStartAt, endAt:updatedEndAt})
    }


    render(){
        return(
            <div>
                <ul>
                    {this.renderMoves()}
                </ul>
                <button onClick={(event)=>this.incrementStartPoint(event)}>Next 5 Moves</button>
            </div>
        )
    }
}


export default SelectedPokemonMovesList;