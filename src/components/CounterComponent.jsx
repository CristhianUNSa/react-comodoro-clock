import React from 'react';

class CounterComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleCounterClick = this.handleCounterClick.bind(this);
  }
  handleCounterClick(){
    this.props.OnCounterClick();
  }
  render(){
    return(
      <div className="round" onClick={() => this.handleCounterClick()}>
        <span>
          {this.props.label}
          <br />
          <br />
          <br />
          {this.props.value}
        </span>
      </div>
    );
  }
}

export default CounterComponent;