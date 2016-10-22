import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Picker from './components/PickerComponent';
import Counter from './components/CounterComponent';
const SESSION = "SESSION";
const BREAK = "BREAK";

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.changePickerValue = this.changePickerValue.bind(this);
    this.decreaseCounter = this.decreaseCounter.bind(this);
    this.handleState = this.handleState.bind(this);
    this.state = {
      paused: true,
      intervalId: 0,
      break: {
        active: false,
        blocked: false,
        value: 5
      },
      session: {
        active: true,
        blocked: false,
        value: 25
      },
      counter: {
        label: SESSION,
        value: '25:00'
      }
    }
  }
  hmsToSecondsOnly(str) {
    let p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
  }
  secondsToMS(num){
    num = parseInt(num);
    if(!isNaN(num)){
      let min = Math.floor(num / 60);
      let sec = num % 60;
      return '' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    }
    else{
      return 0;
    }
  }
  decreaseCounter(){
    let activePicker = this.state.session.active ? "session" : "break";
    let minsec = this.state.counter.value;
    let seconds = this.hmsToSecondsOnly(minsec);
    seconds-= 1;
    if(seconds < 0){
      let notActivePicker = activePicker === "session" ? "break" : "session";
      let newMinutes = this.state[notActivePicker].value;
      let newState;
      newMinutes+= ":00";
      if(activePicker === "session"){
        newState = {
          ...this.state,
            session:{
              ...this.state.session,
              active: false,
              blocked: true
            },
            break:{
              ...this.state.break,
              active:true,
              blocked: false
            },
            counter: {
              ...this.state.counter,
              value: newMinutes,
              label: BREAK
            }
        }
        this.setState(newState);
      }
      else{ //activePicker === 'break', now 'session' will be active
        newState = 
        {...this.state, 
          session:{
            ...this.state.session,
            active: true,
            blocked: false
          },
          break:{
            ...this.state.break,
            active:false,
            blocked: true
          },
          counter: {
            ...this.state.counter,
            value: newMinutes,
            label: SESSION
          }
        };
        this.setState(newState);
      }
    }
    else{
      let newMinutes = this.secondsToMS(seconds);
      let newCounter = {
        ...this.state,
        counter:{
          ...this.state.counter,
          value: newMinutes
        }
      };
      this.setState(newCounter);
    }
  }
  handleState(){
    let activePicker = this.state.session.active ? "session" : "break";
      if(this.state.paused){
        let intervalId = setInterval(this.decreaseCounter, 1000);
        let newState = {
          ...this.state,
          intervalId: intervalId,
          paused: false
        };
        this.setState(newState);
      }
      else{
        let intervalId = this.state.intervalId;
        clearInterval(intervalId);
        let newState = {
          ...this.state,
          intervalId: 0,
          paused: true
        }
        this.setState(newState);
      }
  }
  changePickerValue(componentId, parValue){
    let newState;
    if(this.state.paused){
      if(componentId === "break"){
        if (this.state.break.active || !this.state.break.blocked){
            let newValue = this.state.break.value + parseInt(parValue);
            if (newValue <= 0) newValue = 1;
            let counterValue = newValue;
            if(this.state.break.active){
              counterValue = (counterValue.length === 1 ? '0' + counterValue : counterValue) + ':00';
            }
            else{
              counterValue = this.state.counter.value;
            }
            newState = {
              ...this.state, 
              break:{
                ...this.state.break,
                value: newValue
              },
              counter:{
                ...this.state.counter,
                value: counterValue
              }
            };
            this.setState(newState);
          }
      }
      else{ // session
        if (this.state.session.active || !this.state.session.blocked) {
          let newValue = this.state.session.value + parseInt(parValue);
          if (newValue <= 0) newValue = 1;
          let counterValue = newValue;
          if(this.state.session.active){
            counterValue = (counterValue.length === 1 ? '0' + counterValue : counterValue) + ':00';
          }
          else{
            counterValue = this.state.counter.value;
          }
          newState = {
            ...this.state,
            session:{
              ...this.state.session,
              value: newValue
            },
            counter:{
              ...this.state.counter,
              value: counterValue
            }
          };
          this.setState(newState);
        }
      }
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="row">
          <div className="col-xs-3 offset-xs-3">
            <Picker label="BREAK LENGTH" ChangeValue={this.changePickerValue} value={this.state.break.value} componentId="break" />
          </div>
          <div className="col-xs-3">
            <Picker label="SESSION LENGTH" ChangeValue={this.changePickerValue} value={this.state.session.value} componentId="session" />
          </div>
        </div>
        <div className="row">
          <div className="offset-xs-4 col-xs-4">
            <Counter label={this.state.counter.label} value={this.state.counter.value} OnCounterClick={this.handleState}/>
          </div>
        </div>
      </div>
    )
  }
}