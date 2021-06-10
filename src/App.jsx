import { hot } from 'react-hot-loader/root'
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
        id: undefined,
      },
      p1Stats: {
        fga: undefined,
        fg3: undefined,
      },
      player2: {
        name: undefined,
        height: undefined,
        weight: undefined,
        team: undefined,
        position: undefined,
        image: undefined,
        id: undefined,
      },
      p2Stats: {

      },
      didWin: false,
    }
    this.onClick1 = this.onClick1.bind(this);
    this.onClick2 = this.onClick2.bind(this);
  }
  onClick1(name) {
    // console.log("Clicked");
    // console.log(name);
    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // console.log(data.player[0])
      let player1Temp = {
        name: data.player[0].strPlayer,
        height: data.player[0].strHeight,
        weight: data.player[0].strWeight,
        team: data.player[0].strTeam,
        position: data.player[0].strPosition,
        image: data.player[0].strThumb,
      }
      // console.log("Player1Temp", player1Temp)
      this.setState({
        player1: player1Temp
      })
    })
    .then(() => {
      console.log("state player1", this.state.player1);
    })
    .then(() => {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1.name}`)
      .then(res => res.json())
      .then(data => {
        console.log('BDL fetch data',data.data[0].id)
        let player1Copy = {...this.state.player1}
        player1Copy.id = data.data[0].id
        this.setState({
          player1: player1Copy
        })
      })
      .then(() => {
        console.log("added id", this.state.player1)
      })
    })
    // fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1.name}`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log('BDL fetch data',data)
    // })

  }
  onClick2(name) {
    // console.log("Clicked");
    // console.log(name);
    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // console.log(data.player[0])
      let player2Temp = {
        name: data.player[0].strPlayer,
        height: data.player[0].strHeight,
        weight: data.player[0].strWeight,
        team: data.player[0].strTeam,
        position: data.player[0].strPosition,
        image: data.player[0].strThumb,
      }
      // console.log("Player2Temp", player2Temp)
      this.setState({
        player2: player2Temp
      })
    })
    .then(() => {
      console.log("state player2", this.state.player2);
    })
    .then(() => {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1.name}`)
      .then(res => res.json())
      .then(data => {
        console.log('BDL fetch data',data.data[0].id)
        let player2Copy = {...this.state.player2}
        player2Copy.id = data.data[0].id
        this.setState({
          player2: player2Copy
        })
      })
      .then(() => {
        console.log("added id2", this.state.player2)
      })
    })
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
          <PlayerContainer onClick1={this.onClick1} onClick2={this.onClick2}/>
        </div>
        <div>
          <h3>Section to show results of matchup</h3>
          <div>
            <PlayerData  player1={this.state.player1} player2={this.state.player2}/>
          </div>
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
            (e) => {
              console.log(document.getElementById('player1Input').value);
              this.props.onClick1(document.getElementById('player1Input').value)
            }
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
            this.props.onClick2(document.getElementById('player2Input').value)
            // console.log("player2 button")
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
    const { player1, player2 } = this.props;
    console.log("player1", player1);
    console.log("player2", player2);
    const player1InfoArr = [];
    const player2InfoArr = [];

    // player1: {
    //   name: undefined,
    //   height: undefined,
    //   weight: undefined,
    //   team: undefined,
    //   position: undefined,
    //   image: undefined,
    //   id: undefined,
    // },

    player1InfoArr.push(<li>{`Name: ${player1.name}`}</li>);
    player1InfoArr.push(<li>{`Team: ${player1.team}`}</li>);
    player1InfoArr.push(<li>{`Position: ${player1.position}`}</li>);
    player1InfoArr.push(<li>{`Height: ${player1.height}`}</li>);
    player1InfoArr.push(<li>{`Weight: ${player1.weight}`}</li>);

    player2InfoArr.push(<li>{`Name: ${player2.name}`}</li>);
    player2InfoArr.push(<li>{`Team: ${player2.team}`}</li>);
    player2InfoArr.push(<li>{`Position: ${player2.position}`}</li>);
    player2InfoArr.push(<li>{`Height: ${player2.height}`}</li>);
    player2InfoArr.push(<li>{`Weight: ${player2.weight}`}</li>);

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
          <div>
            <ul>
              {player1InfoArr}
            </ul>
          </div>
        </span>
        <span>
        <div>
            <ul>
              {player2InfoArr}
            </ul>
          </div>
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

export default hot(App);