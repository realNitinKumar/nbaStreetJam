import React, { Component } from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      player1: {
        name: undefined,
        height: undefined,
        weight: undefined,
        team: undefined,
        position: undefined,
        image: undefined,
      },
      player2: {
        name: undefined,
        height: undefined,
        weight: undefined,
        team: undefined,
        position: undefined,
        image: undefined,
      },
      didWin: false,
    }
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    console.log("Clicked");
    console.log(event.target);
  }
  render() {
    return (
      <div>
        <h1>NBA StreetJAM</h1>
        <div>

          {/* <button
            type='button' 
            onClick={
              this.onClick
            }
            id='testButton'>
              Search
          </button> */}
          <PlayerContainer onClick={this.onClick}/>
        </div>
        <div>
          <h3>Section to show results of matchup</h3>
        </div>
      </div>
    )
  }
}

class PlayerContainer extends Component {
  render() {
    return (
    <div>
      <span className="searchBar">
        <label>Player A: </label>
        <input id='player1Input'></input>
        <button
          type='button' 
          onClick={
            // (e) => {
            //   console.log("player1 button")
            //   // props.newMarket();
            //   // props.setNewLocation(document.getElementById('locationInput').value);
            // }
            this.props.onClick
          }
          id='player1Button'>
            Search
        </button>
      </span>
      <span className="searchBar">
        <label>Player B:: </label>
        <input id='player2Input'></input>
        <button
        type='button'  
        onClick={
          (e) => {
            console.log("player2 button")
            // props.newMarket();
            // props.setNewLocation(document.getElementById('locationInput').value);
          }}
          id='player2Button'>
          Search
        </button>
      </span>
    </div>
    )
  }
}

class PlayerData extends Component {
  render() {
    // const { playerInfo } = this.props;
    // const playerDataArr = [];
    // playerInfo.forEach(el => {
    //   playerDataArr.push(<li>{el}</li>)
    // })
    const player1InfoArr = [];
    const player2InfoArr = [];

    // if(this.props.p1Name){
    //   player1InfoArr.push(`Name: ${this.props.p1Name}`);
    //   if(this.props.player1.height) player1InfoArr.push()
    //   player1InfoArr.push();
    //   player1InfoArr.push();
    //   if(this.props.player1.img) 
    // }

    // if(this.props.player2.firstName){

    // }

    return (
      <div>
        <span>
          <ul>
            {/* {player1InfoArr} */}
          </ul>
        </span>
        <span>
          <ul>
            {/* {player2InfoArr} */}
          </ul>
        </span>
      </div>
    )
  }
}

class PlayByPlay extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default (App);