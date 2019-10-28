import React, { Component } from 'react';
import { TextField } from './index';
import default_avatar from '../img/default-avatar.png';

export class HCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal: [
        { label: 'given name', value: '' },
        { label: 'surname', value: '' },
        { label: 'email', value: ''},
        { label: 'phone', value: '' }
      ],
      address: [
        { label: 'house name or #', value: '' },
        { label: 'street', value: '' },
        { label: 'suburb', value: ''},
        { label: 'state', value: '' },
        { label: 'postcode', value: '' },
        { label: 'country', value: '' }
      ],
      avatarUrl: default_avatar
    };

    this.handleChange = this.handleChange.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.uploadChange = this.uploadChange.bind(this);
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  joinString(a, b, concat = ' ') {
    if (a && b) {
      return this.capitalize(a) + concat + this.capitalize(b);
    }
    return this.capitalize(a) || this.capitalize(b);
  }

  chooseFile() {
    document.getElementById('fileInput').click();
  }

  uploadChange(event) {
    const url = event.target.files[0];
    if (url) {
      this.setState({
        avatarUrl: URL.createObjectURL(url)
      })
    }
  }

  handleChange(event, index, type) {
    const { personal, address } = this.state;
    if (type === 'PERSONAL') {
      const update = personal.slice();
      update[index].value = event.target.value;
      this.setState({ peronsal: update });
    } else if (type === 'ADDRESS') {
      const update = address.slice();
      update[index].value = event.target.value;
      this.setState({ address: update });
      this.setState({ value: event.target.value });
    }
  }

  render() {
    const {
      personal,
      address,
      avatarUrl
    } = this.state;

    const details = {
      fullName: this.joinString(personal[0].value, personal[1].value),
      email: personal[2].value,
      phone: personal[3].value,
      address1: this.joinString(address[0].value, address[1].value),
      address2: this.joinString(address[2].value, address[3].value.toUpperCase(), ', '),
      postcode: address[4].value,
      country: address[5].value
    }

    return (
      <div className='main-container'>
        <div className='form-container'>
          <h1 className='header'>hCard Builder</h1>

          <h5 className='underlined-header'>PERSONAL DETAILS</h5>
          <div className='input-container'>
            {
              this.state.personal.map((input, index) => (
                <TextField
                  key={input.label}
                  label={input.label}
                  value={input.value}
                  index={index}
                  type='PERSONAL'
                  handleChange={this.handleChange}
                />
              ))
            }
          </div>

          <h5 className='underlined-header'>ADDRESS</h5>
          <div className='input-container'>
            {
              this.state.address.map((input, index) => (
                <TextField
                  key={input.label}
                  label={input.label}
                  value={input.value}
                  index={index}
                  type='ADDRESS'
                  handleChange={this.handleChange}
                />
              ))
            }
          </div>

          <div className='btn-container'>
            <div className='hidden-upload'>
              <input type='file' id='fileInput' name='fileInput' accept='.jpeg,.jpg,.png' onChange={this.uploadChange} />
            </div>
            <button
              className='btn avatar-btn'
              type='button'
              onClick={this.chooseFile}
            >
              Upload Avatar
            </button>
            <button
              className='btn create-btn'
              onClick={() => alert('hCard Created')}
            >
              Create hCard
            </button>
          </div>
        </div>

        <div className='preview-container'>
          <h3 className='preview-header'>HCARD PREVIEW</h3>
          <div className='hcard-container'>
            <div className='hcard-header'>
              <h1>{details.fullName}</h1>
            </div>

            <div className='hcard-content'>
              <div className='underlined-field'>
                <label>EMAIL</label>
                <span>{details.email}</span>
              </div>
              <div className='underlined-field'>
                <label>PHONE</label>
                <span>{details.phone}</span>
              </div>
              <div className='underlined-field'>
                <label>ADDRESS</label>
                <span>{details.address1}</span>
              </div>
              <div className='underlined-field'>
                <label/>
                <span>{details.address2}</span>
              </div>
              <div className='underlined-field'>
                <label>POSTCODE</label>
                <span>{details.postcode}</span>
                <label>COUNTRY</label>
                <span>{details.country}</span>
              </div>
            </div>

            <div className='avatar-wrapper'>
              <img src={avatarUrl} alt='default-avatar' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
