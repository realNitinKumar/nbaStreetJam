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
        fg3a: undefined,
        fta: undefined,
        blk: undefined,
        stl: undefined,
        turnover: undefined,
        pts: undefined,
        fg_pct: undefined,
        fg3_pct: undefined,
        ft_pct: undefined,
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
        fga: undefined,
        fg3a: undefined,
        fta: undefined,
        blk: undefined,
        stl: undefined,
        turnover: undefined,
        pts: undefined,
        fg_pct: undefined,
        fg3_pct: undefined,
        ft_pct: undefined,
      },
      p1Score: 0,
      p2Score: 0,
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
      fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
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
      .then(() => {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${this.state.player1.id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data.data[0]);
            let p1StatsGenerate = {
              fga: data.data[0].fga,
              fg3a: data.data[0].fg3a,
              fta: data.data[0].fta,
              blk: data.data[0].blk,
              stl: data.data[0].stl,
              turnover: data.data[0].turnover,
              pts: data.data[0].pts,
              fg_pct: data.data[0].fg_pct,
              fg3_pct: data.data[0].fg3_pct,
              ft_pct: data.data[0].ft_pct,
            }
            this.setState({
              p1Stats: p1StatsGenerate
            })
          })
          .then(() => {
            console.log('player 1 stats',this.state.p1Stats)
          })
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
      fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
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
      .then(() => {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${this.state.player2.id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data.data[0]);
            let p2StatsGenerate = {
              fga: data.data[0].fga,
              fg3a: data.data[0].fg3a,
              fta: data.data[0].fta,
              blk: data.data[0].blk,
              stl: data.data[0].stl,
              turnover: data.data[0].turnover,
              pts: data.data[0].pts,
              fg_pct: data.data[0].fg_pct,
              fg3_pct: data.data[0].fg3_pct,
              ft_pct: data.data[0].ft_pct,
            }
            this.setState({
              p2Stats: p2StatsGenerate
            })
          })
          .then(() => {
            console.log('player 2 stats',this.state.p2Stats)
          })
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
          <h3>Player Information</h3>
          <div>
            <PlayerData  player1={this.state.player1} player2={this.state.player2}/>
          </div>
        </div>
        <div>
          <PlayByPlay p1Score={this.state.p1Score} p2Score={this.state.p2Score} player1={this.state.player1} player2={this.state.player2} p1Stats={this.state.p1Stats} p2Stats={this.state.p2Stats}/>
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

// fga: undefined,
// fg3a: undefined,
// fta: undefined,
// blk: undefined,
// stl: undefined,
// turnover: undefined,
// pts: undefined,
// fg_pct: undefined,
// fg3_pct: undefined,
// ft_pct: undefined,


class PlayByPlay extends Component {
  render() {
    const { player1, player2, p1Stats, p2Stats } = this.props
    
    let p1Score = 0;
    let p2Score = 0;

    const resultArr = [];

    if(p1Stats.fg_pct > 0 && p2Stats.fg_pct > 0){

      let p1NakedMult = (p1Stats.blk * 2) + (p1Stats.stl * 2) + p1Stats.pts - p1Stats.turnover;
      let p2NakedMult = (p2Stats.blk * 2) + (p2Stats.stl * 2) + p2Stats.pts - p2Stats.turnover;
      let p13pt = p1NakedMult * p1Stats.fg3_pct;
      let p23pt = p2NakedMult * p2Stats.fg3_pct;
      let p12pt = p1NakedMult * p1Stats.fg_pct;
      let p22pt = p2NakedMult * p2Stats.fg_pct;
      
      while(p1Score < 21 && p2Score < 21){
        if(Math.random() > 0.5){
          // Decide whether shooting a 2 or 3
          if(Math.random() > .30){
              if(p12pt > Math.random() * 20) {
                p1Score += 2;
                resultArr.push(<li>{`${player1.name} scores the layup! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
              }else {
                resultArr.push(<li>{`${player1.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
              }
          } else {
            if(p13pt > Math.random() * 15) {
              p1Score += 3;
              resultArr.push(<li>{`${player1.name} swishes in in from WAY downtown! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
            }else {
              resultArr.push(<li>{`${player1.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
            }
          }
        }else {
          if(Math.random() > .30){
            if(p22pt > Math.random() * 20) {
              p2Score += 2;
              resultArr.push(<li>{`${player2.name} scores the layup! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
            }else {
              resultArr.push(<li>{`${player2.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
            }
        } else {
            if(p23pt > Math.random() * 15) {
              p2Score += 3;
              resultArr.push(<li>{`${player2.name} swishes in in from WAY downtown! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
            }else {
              resultArr.push(<li>{`${player2.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
            }
        }
        }
      }
    }
    return (
      <div>
        <ul>
          {resultArr}
        </ul>
      </div>
    )
  }
}

export default hot(App);