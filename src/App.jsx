import { hot } from 'react-hot-loader/root'
import React, { Component } from "react";
const regeneratorRuntime = require("regenerator-runtime");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      player1: {
        name: 'Will Sentance',
        height: '7\'5\"',
        weight: 'None of your business',
        team: 'Codesmith',
        position: 'CEO',
        image: 'https://bestanimations.com/media/basketball/507997070basketball-player-dribbling-ball-clip-art-animated-gif-4.gif',
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
        fg_pct: 0,
        fg3_pct: undefined,
        ft_pct: undefined,
      },
      player2: {
        name: 'Sam Kim',
        height: '6\'9\"',
        weight: 'First of all how dare you',
        team: 'Good Vibes',
        position: 'Standies Savant',
        image: 'https://bestanimations.com/media/basketball/507997070basketball-player-dribbling-ball-clip-art-animated-gif-4.gif',
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
        fg_pct: 0,
        fg3_pct: undefined,
        ft_pct: undefined,
      },
      p1Score: 0,
      p2Score: 0,
      pbp: [],
      pbpDisplay: [],
      index: 0,
      gamePlayed: false,
      calledSetPbp: false,
    }
    this.onClick1 = this.onClick1.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.setPlayByPlay = this.setPlayByPlay.bind(this);
    this.startClick = this.startClick.bind(this);
  }

  setPlayByPlay(pbpArr) {
    // console.log("pbpArr in setPlayByPlay", pbpArr)
    this.setState({
      pbp: pbpArr,
      // gamePlayed: true
      calledSetPbp: true
    })
  }

  startClick() {
    this.setState({
      gamePlayed: true,
      calledSetPbp: false
    })
  }


  async componentDidUpdate() {
    // console.log("inside componentDidUpdate")
    // console.log("pbp length",this.state.pbp.length);
    if(this.state.pbp.length > 0 && this.state.index < this.state.pbp.length && this.state.gamePlayed === true){
      // console.log("inside the if statement of componentDidUpdate")
      let pbpDisplayCopy = [...this.state.pbpDisplay]

      if(this.state.index < this.state.pbp.length - 2) {
        pbpDisplayCopy[0] = (this.state.pbp[this.state.index])
      } else{
        pbpDisplayCopy.push(this.state.pbp[this.state.index])
      }
      // pbpDisplayCopy.push(this.state.pbp[this.state.index])
      console.log("logging the elements of the pbp",this.state.pbp[this.state.index])
      let indexIncrement = this.state.index;
      indexIncrement += 1;

      // const sleep = (ms) => {
      //   return new Promise(resolve => setTimeout(resolve, ms));
      // }
      // const asyncFoo = async () => {
      //     await sleep(2000);
      //     console.log('look at this');
      //     await sleep(1000);
      //     console.log('getting fancy now');
      // }

      // asyncFoo();

      await new Promise(() => setTimeout(() => console.log("stalling"), 3000))
        .then(
          setTimeout(() => {
            this.setState({
              pbpDisplay: pbpDisplayCopy,
              index: indexIncrement
            })
          }, 3000)
        )

      // this.setState({
      //   pbpDisplay: pbpDisplayCopy,
      //   index: indexIncrement
      // })
      // setInterval(() => console.log("I am stalling"), 1000)
      //   .then(() => {
      //     this.setState({
      //       pbpDisplay: pbpDisplayCopy,
      //       index: indexIncrement
      //     })
      //   })
    }
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
    // .then(() => {
    //   console.log("state player1", this.state.player1);
    // })
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
      // .then(() => {
      //   console.log("added id", this.state.player1)
      // })
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
          // .then(() => {
          //   console.log('player 1 stats',this.state.p1Stats)
          // })
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
    // .then(() => {
    //   console.log("state player2", this.state.player2);
    // })
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
      // .then(() => {
      //   console.log("added id2", this.state.player2)
      // })
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
          // .then(() => {
          //   console.log('player 2 stats',this.state.p2Stats)
          // })
      })
    })
  }
  render() {
    return (
      <div className="centerMe">
        <h1>NBA One on One JAM</h1>
        <h2>First to 21 Points Wins!</h2>
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
          <h3 id="PlayerInformation">Player Information</h3>
          <div>
            <PlayerData  player1={this.state.player1} player2={this.state.player2}/>
          </div>
        </div>
        <div>
        {/* <h2>First to 21 Points Wins</h2> */}
        <div className='startButtonContainer'>
        <button
            type='button' 
            onClick={
              this.startClick
            }
            id='startButton'>
              Let's DANCE
        </button>
        </div>
        <h3>Play by Play</h3>
          <PlayByPlay gamePlayed={this.state.gamePlayed} pbpDisplay={this.state.pbpDisplay} setPlayByPlay={this.setPlayByPlay} player1={this.state.player1} player2={this.state.player2} p1Stats={this.state.p1Stats} p2Stats={this.state.p2Stats} calledSetPbp={this.state.calledSetPbp}/>
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
        {/* <label>Player A: </label> */}
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
          className='playerButton'>
            Search
        </button>
      </span>
      <span className="searchBar">
        {/* <label>Player B: </label> */}
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
          className='playerButton'>
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
    // console.log("player1", player1);
    // console.log("player2", player2);
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

    // player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`PLAYER A:`}</li>);
    // player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{<img src = {`${player1.image}`}></img>}</li>);
    player1InfoArr.push(<img src = {`${player1.image}`} key={Math.random().toString(36).substr(2, 9)}></img>);
    player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Name: ${player1.name}`}</li>);
    player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Team: ${player1.team}`}</li>);
    player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Position: ${player1.position}`}</li>);
    player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Height: ${player1.height}`}</li>);
    player1InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Weight: ${player1.weight}`}</li>);

    // player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`PLAYER B:`}</li>);
    player2InfoArr.push(<img src = {`${player2.image}`} key={Math.random().toString(36).substr(2, 9)}></img>);
    player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Name: ${player2.name}`}</li>);
    player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Team: ${player2.team}`}</li>);
    player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Position: ${player2.position}`}</li>);
    player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Height: ${player2.height}`}</li>);
    player2InfoArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`Weight: ${player2.weight}`}</li>);

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
          <div className="playerInfo">
            <ul>
              {player1InfoArr}
            </ul>
          </div>
        </span>
        <span>
        <div className="playerInfo">
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
    const { player1, player2, p1Stats, p2Stats, setPlayByPlay, pbpDisplay, gamePlayed, calledSetPbp } = this.props
    
    // let p1Score = 0;
    // let p2Score = 0;

    let p1 = {Score : 0};
    let p2 = {Score : 0};

    const resultArr = [];

    // console.log("gamePlayed", gamePlayed)
    // console.log("p1Stats",p1Stats)
    // console.log("p2Stats",p2Stats)

    // const twoMade1 = [
    //   `${player1.name} scores the layup! --- ${player2.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} crosses over ${player2.name} and swishes the midrange jumpshot! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} banks in the layup off the glass! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} takes FLIGHT and JAMS it over  ${player2.name}! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    // ]

    // const twoMade2 = [
    //   `${player2.name} scores the layup! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} crosses over ${player1.name} and swishes the midrange jumpshot! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} banks in the layup off the glass! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} takes FLIGHT and JAMS it over  ${player1.name}! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    // ]

    // const twoMiss2 = [
    //   `${player2.name} misses the layup!`,
    //   `${player2.name} can't get the jumpshot to fall over ${player1.name}!`,
    //   `${player2.name} is REJECTED at the rim by ${player1.name}!`,
    //   `${player2.name}'s shot bounces off the rim!`,
    // ]

    // const twoMiss1 = [
    //   `${player1.name} misses the layup!`,
    //   `${player1.name} can't get the jumpshot to fall over ${player2.name}!`,
    //   `${player1.name} is REJECTED at the rim by ${player2.name}!`,
    //   `${player1.name}'s shot bounces off the rim!`,
    // ]

    // const threeMade2 = [
    //   `${player2.name} swishes it in from WAAAAY DOWNTOWN! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} banks the the 3 off the glass! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} shoots it in from beyond the arc! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player2.name} heaves the ball over ${player1.name} from behind the arc and into the basket! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`
    // ]

    // const threeMade1 = [
    //   `${player1.name} swishes it in from WAAAAY DOWNTOWN! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} banks the the 3 off the glass! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} shoots it in from beyond the arc! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`,
    //   `${player1.name} heaves the ball over ${player2.name} from behind the arc and into the basket! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`
    // ]

    // const threeMiss2 = [
    //   `${player2.name} pulls up from half court and doesn't even hit the backboard!`,
    //   `${player2.name} can't get the deep 3 to fall!`,
    //   `${player2.name} shoots a contested shot over ${player1.name} but can't get it to fall!`,
    //   `${player2.name}'s shot from behind the arc bounces off the rim!`,
    // ]

    // const threeMiss1 = [
    //   `${player1.name} pulls up from half court and doesn't even hit the backboard!`,
    //   `${player1.name} can't get the deep 3 to fall!`,
    //   `${player1.name} shoots a contested shot over ${player2.name} but can't get it to fall!`,
    //   `${player1.name}'s shot from behind the arc bounces off the rim!`,
    // ]

    const twoMade1 = [
      `${player1.name} scores the layup! `,
      `${player1.name} crosses over ${player2.name} and swishes the midrange jumpshot! `,
      `${player1.name} banks in the layup off the glass! `,
      `${player1.name} takes FLIGHT and JAMS it over  ${player2.name}! `,
    ]

    const twoMade2 = [
      `${player2.name} scores the layup! `,
      `${player2.name} crosses over ${player1.name} and swishes the midrange jumpshot! `,
      `${player2.name} banks in the layup off the glass! `,
      `${player2.name} takes FLIGHT and JAMS it over  ${player1.name}! `,
    ]

    const twoMiss2 = [
      `${player2.name} misses the layup!`,
      `${player2.name} can't get the jumpshot to fall over ${player1.name}!`,
      `${player2.name} is REJECTED at the rim by ${player1.name}!`,
      `${player2.name}'s shot bounces off the rim!`,
    ]

    const twoMiss1 = [
      `${player1.name} misses the layup!`,
      `${player1.name} can't get the jumpshot to fall over ${player2.name}!`,
      `${player1.name} is REJECTED at the rim by ${player2.name}!`,
      `${player1.name}'s shot bounces off the rim!`,
    ]

    const threeMade2 = [
      `${player2.name} swishes it in from WAAAAY DOWNTOWN! `,
      `${player2.name} banks in the 3 off the glass! `,
      `${player2.name} shoots it in from beyond the arc! `,
      `${player2.name} heaves the ball over ${player1.name} from behind the arc and into the basket! `
    ]

    const threeMade1 = [
      `${player1.name} swishes it in from WAAAAY DOWNTOWN! `,
      `${player1.name} banks in the 3 off the glass! `,
      `${player1.name} shoots it in from beyond the arc! `,
      `${player1.name} heaves the ball over ${player2.name} from behind the arc and into the basket! `
    ]

    const threeMiss2 = [
      `${player2.name} pulls up from half court and doesn't even hit the backboard!`,
      `${player2.name} can't get the deep 3 to fall!`,
      `${player2.name} shoots a contested shot over ${player1.name} but can't get it to fall!`,
      `${player2.name}'s shot from behind the arc bounces off the rim!`,
    ]

    const threeMiss1 = [
      `${player1.name} pulls up from half court and doesn't even hit the backboard!`,
      `${player1.name} can't get the deep 3 to fall!`,
      `${player1.name} shoots a contested shot over ${player2.name} but can't get it to fall!`,
      `${player1.name}'s shot from behind the arc bounces off the rim!`,
    ]


    if(p1Stats.fg_pct > 0 && p2Stats.fg_pct > 0 && gamePlayed === false){

      let p1NakedMult = (p1Stats.blk * 2) + (p1Stats.stl * 2) + p1Stats.pts - p1Stats.turnover;
      let p2NakedMult = (p2Stats.blk * 2) + (p2Stats.stl * 2) + p2Stats.pts - p2Stats.turnover;
      let p13pt = p1NakedMult * p1Stats.fg3_pct;
      let p23pt = p2NakedMult * p2Stats.fg3_pct;
      let p12pt = p1NakedMult * p1Stats.fg_pct;
      let p22pt = p2NakedMult * p2Stats.fg_pct;
      
      // while(p1Score < 21 && p2Score < 21){
      //   if(Math.random() > 0.5){
      //     // Decide whether shooting a 2 or 3
      //     if(Math.random() > .30){
      //         if(p12pt > Math.random() * 20) {
      //           p1Score += 2;
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player1.name} scores the layup! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
      //         }else {
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player1.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
      //         }
      //     } else {
      //       if(p13pt > Math.random() * 15) {
      //         p1Score += 3;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player1.name} swishes in in from WAY downtown! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player1.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
      //       }
      //     }
      //   }else {
      //     if(Math.random() > .30){
      //       if(p22pt > Math.random() * 20) {
      //         p2Score += 2;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player2.name} scores the layup! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player2.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
      //       }
      //   } else {
      //       if(p23pt > Math.random() * 15) {
      //         p2Score += 3;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player2.name} swishes in in from WAY downtown! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{`${player2.name} fucks it up! --- ${player1.name}: ${p1Score}pts     ${player2.name}: ${p2Score}pts`}</li>)
      //       }
      //   }
      //   }
      // }

      // while(p1Score < 21 && p2Score < 21){
      //   if(Math.random() > 0.5){
      //     // Decide whether shooting a 2 or 3
      //     if(Math.random() > .30){
      //         if(p12pt > Math.random() * 20) {
      //           p1Score += 2;
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMade1[Math.floor(Math.random() * 4)]}</li>);
      //         }else {
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMiss1[Math.floor(Math.random() * 4)]}</li>)
      //         }
      //     } else {
      //       if(p13pt > Math.random() * 15) {
      //         p1Score += 3;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMade1[Math.floor(Math.random() * 4)]}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMiss1[Math.floor(Math.random() * 4)]}</li>)
      //       }
      //     }
      //   }else {
      //     if(Math.random() > .30){
      //       if(p22pt > Math.random() * 20) {
      //         p2Score += 2;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMade2[Math.floor(Math.random() * 4)]}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMiss2[Math.floor(Math.random() * 4)]}</li>)
      //       }
      //   } else {
      //       if(p23pt > Math.random() * 15) {
      //         p2Score += 3;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMade2[Math.floor(Math.random() * 4)]}</li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMiss2[Math.floor(Math.random() * 4)]}</li>)
      //       }
      //   }
      //   }
      // }

      // while(p1.Score < 21 && p2.Score < 21){
      //   // if(Math.random() > 0.5){
      //     // Decide whether shooting a 2 or 3
      //     if(Math.random() > .30){
      //         if(p12pt > Math.random() * 20) {
      //           p1.Score += 2;
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMade1[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>);
      //         }else {
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMiss1[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>)
      //         }
      //     } else {
      //       if(p13pt > Math.random() * 15) {
      //         p1.Score += 3;
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMade1[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>);
      //       }else {
      //         resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMiss1[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>)
      //       }
      //     }
      //   // }else {
      //     if(p1.Score < 21){
      //       if(Math.random() > .30){
      //         if(p22pt > Math.random() * 20) {
      //           p2.Score += 2;
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMade2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>);
      //         }else {
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{twoMiss2[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>)
      //         }
      //     } else {
      //         if(p23pt > Math.random() * 15) {
      //           p2.Score += 3;
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMade2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>);
      //         }else {
      //           resultArr.push(<li key={Math.random().toString(36).substr(2, 9)}>{threeMiss2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></li>)
      //         }
      //     }
      //   }
      //   // }
      // }

      while(p1.Score < 21 && p2.Score < 21){
        // if(Math.random() > 0.5){
          // Decide whether shooting a 2 or 3
          if(Math.random() > .30){
              if(p12pt > Math.random() * 20) {
                p1.Score += 2;
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{twoMade1[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>);
              }else {
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{twoMiss1[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>)
              }
          } else {
            if(p13pt > Math.random() * 15) {
              p1.Score += 3;
              resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{threeMade1[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>);
            }else {
              resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{threeMiss1[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>)
            }
          }
        // }else {
          if(p1.Score < 21){
            if(Math.random() > .30){
              if(p22pt > Math.random() * 20) {
                p2.Score += 2;
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{twoMade2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>);
              }else {
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{twoMiss2[Math.floor(Math.random() * 4)]} <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>)
              }
          } else {
              if(p23pt > Math.random() * 15) {
                p2.Score += 3;
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{threeMade2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>);
              }else {
                resultArr.push(<h5 key={Math.random().toString(36).substr(2, 9)}>{threeMiss2[Math.floor(Math.random() * 4)]}  <h4>{`${player1.name}: ${p1.Score}pts     ${player2.name}: ${p2.Score}pts`}</h4></h5>)
              }
          }
        }
        // }
      }

      let winner = p1.Score > p2.Score ? player1.name : player2.name;
      let winnerImage = player1.name == winner ? player1.image : player2.image;

      resultArr.push(<h3 className="winnerText" key={Math.random().toString(36).substr(2, 9)}>{`AND THE WINNER IS.... ${winner}!`}</h3>);
      resultArr.push(<img src = {`${winnerImage}`} key={Math.random().toString(36).substr(2, 9)}></img>)
      resultArr.push(<h3 className="winnerText2" key={Math.random().toString(36).substr(2, 9)}>{`FINAL SCORE: ${player1.name}: ${p1.Score}pts  ${player2.name}: ${p2.Score}pts`}</h3>);
    }

    // console.log(resultArr.length);

    if(resultArr.length > 0 && gamePlayed === false && calledSetPbp === false) {
      // console.log("inside the if statement of playByPlay")
      setPlayByPlay(resultArr);
    }

    return (
      <div className = "pbpText">
        <ul>
          {pbpDisplay}
        </ul>
      </div>
    )
  }
}

export default hot(App);