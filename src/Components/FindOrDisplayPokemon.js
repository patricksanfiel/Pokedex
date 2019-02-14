import React, {Component} from 'react';
import SelectedPokemon from './SelectedPokemon';

class FindOrDisplayPokemon extends Component {
    state = {
        allPokemonArray: [],
        selectedPokemonObject:{},
        searchedPokemonArray: [],
        viewList: false,
        viewSearch: false,
        searchQuery:""
    }


    searchPokemonByName(event){
        const searchQuery = event.target.value;
        const sortedPokemonList = this.state.allPokemonArray;
        const searchedPokemonArray = [];
        sortedPokemonList.forEach(pokemon=>pokemon.includes(searchQuery)?searchedPokemonArray.push(pokemon):false)
        this.setState({searchedPokemonArray: searchedPokemonArray, searchQuery:searchQuery})
    }

    getSelectedPokemonObject(event){
        const selectedPokemon = event.target.textContent.trim()
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
        return pokemonList.map(pokemon=>{
            return(
                <li 
                key={pokemon}
                className="pokemon-list-item"
                onClick={(event)=>this.getSelectedPokemonObject(event)}
                >
                    {pokemon}
                </li>)
        })
    }

    searchDisplaySwitch(){//Displays a search typeahead if viewSearch is true, if false, displays a button that will set viewSearch to true onClick
        const viewSearch = this.state.viewSearch
        switch(viewSearch){
            case(true):
                const searchQuery = this.state.searchQuery
                return(
                    <div>
                        <label>Search</label>
                        <input onChange={(event)=>this.searchPokemonByName(event)} style={{border:"1px solid black"}} value={searchQuery}></input>
                        <button onClick={()=>this.setState({viewSearch: false, searchQuery:"", searchedPokemonArray:[]})}>Close Search</button>
                        {this.renderList(this.state.searchedPokemonArray)}
                    </div>
                )
            default:
                return(
                    <div>
                        <button onClick={()=>this.setState({viewSearch:true, viewList: false, searchedPokemon:[]})}>View Search</button>
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
                        <button onClick={()=>this.setState({viewList: false})}>Close the List</button>
                        {this.renderList(this.state.allPokemonArray)}
                    </div>
                )
            default:
                return(
                    <div>
                        <button onClick={()=>this.setState({viewList:true, viewSearch: false})}>View All Pokemon</button>
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
                        <div>
                            {this.listDisplaySwitch()}
                            {this.searchDisplaySwitch()}
                        </div>
                    )
                }
            default:
                return(
                    <div>
                        <SelectedPokemon pokemonObject={this.state.selectedPokemonObject} className="selected-pokemon"/>
                        <button id="close-selected" onClick={()=>this.setState({selectedPokemonObject:{}})}>Close</button>
                </div>
                ) 
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pokemonList !== this.props.pokemonList){
            this.setState({allPokemonArray:nextProps.pokemonList});
        }
    }


    render(){
        return this.selectedPokemonDisplaySwitch()
    }
}


export default FindOrDisplayPokemon;