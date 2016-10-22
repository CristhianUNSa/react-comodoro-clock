import React from 'react';

class PickerComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleSum = this.handleSum.bind(this);
  }
  handleSum (value){
    this.props.ChangeValue(this.props.componentId.toString(), value);
  }
  render(){
    return(
      <div className="row">
        <h5>
          {this.props.label}
        </h5>
        <h2>
          <button type="button" onClick={() => this.handleSum('-1')}> - </button> 
            {this.props.value}
          <button type="button" onClick={() => this.handleSum('1')}> + </button>
        </h2>
      </div>
    );
  }
}

export default PickerComponent;