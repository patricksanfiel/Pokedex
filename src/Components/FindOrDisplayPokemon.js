import React, {Component} from 'react';
import SelectedPokemon from './SelectedPokemon';
import formatter from '../UtilityFunctions/formatter'

class FindOrDisplayPokemon extends Component {
    state = {
        allPokemonArray: this.props.pokemonList,
        selectedPokemonObject:{},
        searchedPokemonArray: [],
        viewList: false,
        viewSearch: false,
        searchQuery:""
    }


    searchPokemonByName(event){
        const searchQuery = event.target.value.replace(" ","-");
        const sortedPokemonList = this.state.allPokemonArray;
        const searchedPokemonArray = [];
        sortedPokemonList.forEach(pokemon=>pokemon.includes(searchQuery)?searchedPokemonArray.push(pokemon):false)
        this.setState({searchedPokemonArray: searchedPokemonArray, searchQuery:searchQuery})
    }

    getSelectedPokemonObject(event){
        const selectedPokemon = event.target.id.trim()
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(
            (response) => {
                response.json().then( json => {
                    const selectedPokemonObject = json
                    this.setState({selectedPokemonObject: selectedPokemonObject})
                })
            }
        )
    }

    renderList(list){
        const pokemonList = list
        return(
            <ul>
                {pokemonList.map(pokemon=>{
                    return(
                        <li 
                        key={pokemon}
                        id={pokemon}
                        className="pokemon-list-item"
                        onClick={(event)=>this.getSelectedPokemonObject(event)}
                        >
                            {formatter(pokemon)}
                        </li>
                    )
                })}
            </ul>
        ) 


    }

    searchDisplaySwitch(){//Displays a search typeahead if viewSearch is true, if false, displays a button that will set viewSearch to true onClick
        const viewSearch = this.state.viewSearch
        switch(viewSearch){
            case(true):
                const searchQuery = this.state.searchQuery
                return(
                    <div>
                        <label id="search-label">Search</label>
                        <input onChange={(event)=>this.searchPokemonByName(event)} style={{border:"1px solid black"}} value={searchQuery} id="search-input"></input>
                        <button className="close-btn" onClick={()=>this.setState({viewSearch: false, searchQuery:"", searchedPokemonArray:[]})}>Close Search</button>
                        {this.renderList(this.state.searchedPokemonArray)}
                    </div>
                )
            default:
                return(
                    <div>
                        <button className="list-or-search-button" onClick={()=>this.setState({viewSearch:true, viewList: false, searchedPokemon:[]})}>View Search</button>
                    </div>
                )

        }
    }

    listDisplaySwitch(){//Displays a list of pokemon if viewList true, if false, displays a button that will set viewList to true onClick
        const viewList = this.state.viewList
        switch(viewList){
            case(true):
                return(
                    <div>
                        <button className="close-btn"onClick={()=>this.setState({viewList: false})}>Close List</button>
                        {this.renderList(this.state.allPokemonArray)}
                    </div>
                )
            default:
                return(
                    <div>
                        <button className="list-or-search-button" onClick={()=>this.setState({viewList:true, viewSearch: false})}>View All Pokemon</button>
                    </div>
                )  
        }
    }

    selectedPokemonDisplaySwitch(){//If a user has clicked a pokemon, that pokemon and all its stats will be displayed. Otherwise, either the listDisplaySwitch function, searchDisplaySwitch function, or both will be called to determine what to render to the page
        const selectedPokemonName = this.state.selectedPokemonObject.name
        const viewList = this.state.viewList
        const viewSearch = this.state.viewSearch
        switch(selectedPokemonName){
            case(undefined):
                if(viewList){
                    return this.listDisplaySwitch()
                } else if(viewSearch){
                    return this.searchDisplaySwitch()
                } else {
                    return (
                        <div className="f-o-d-elmt-child">
                            {this.listDisplaySwitch()}
                            {this.searchDisplaySwitch()}
                        </div>
                    )
                }
            default:
                return(
                    <div className="selected-pokemon-div">
                        <SelectedPokemon pokemonObject={this.state.selectedPokemonObject} className="selected-pokemon"/>
                        <button id="close-selected" className="close-btn" onClick={()=>this.setState({selectedPokemonObject:{}})}>Close</button>
                    </div>
                ) 
        }
    }

    render(){
        return(
            <div id="f-o-d-elmt" className="body-font">
                {this.selectedPokemonDisplaySwitch()}
            </div>
        ) 
    }
}


export default FindOrDisplayPokemon;