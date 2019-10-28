import React, { Component } from 'react';
import '../App.css';

export class TextField extends Component {

  render() {
    const { index, type } = this.props;
    return (
      <div className='outlined-textfield'>
        <label>{this.props.label.toUpperCase()}</label>
        <input required type='text' value={this.props.value} onChange={(event) => this.props.handleChange(event, index, type)} />
      </div>
    );
  }
}
