import React from 'react';
import ReactDOM from 'react-dom';
import { HLayout, HLayoutItem, requestNextLayoutMinDelay } from 'react-flexbox-layout';
import 'react-flexbox-layout/styles.css';

class FocusedInput extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).focus();
  }

  render() {
    return (
      <input onBlur={this._onBlur.bind(this)} {...this.props} />
    );
  }

  _onBlur() {
    ReactDOM.findDOMNode(this).focus();
  }
}

// Invisible input that always retains focus
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div>
        <h3>Note: this applies only for IE9</h3>
        <p>Typing will trigger debounced update. Clicking "clear" will trigger immediate update</p>
        <FocusedInput value={this.state.value} onChange={this._onChange.bind(this)} />
        <HLayout gutter={10} alignItems="stretch">

          <div style={{background: '#ddd'}}>
            {this.state.value}
          </div>

          <HLayoutItem flexGrow>
            <div style={{background: '#d11'}} onClick={this._onClearClick.bind(this)}>
              Clear
            </div>
          </HLayoutItem>
        </HLayout>
      </div>
    );
  }

  _onClearClick() {
    this.setState({value: ''});
  }

  _onChange(e) {
    requestNextLayoutMinDelay(1000);
    this.setState({value: e.target.value});
  }
}

ReactDOM.render(<App />, document.getElementById("example"));
