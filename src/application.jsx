import React from 'react';
import {RouteHandler} from 'react-router';
import HomeExample from './examples/home';
import {palette} from 'src/styles/common';

export default class Application extends React.Component {

  render() {
    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.title}><span style={styles.titleR}>R</span>Flexbox Layout</h1>
        </div>
        <HomeExample/>
        <RouteHandler />
      </div>
    );
  }

}


let styles = {
  header: {
    backgroundColor: palette.primaryRed,
    padding: '50px',
  },
  title: {
    color: 'white',
    width: '75%',
    margin: 'auto',
    fontSize: '50px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  titleR: {
    fontSize: '120px',
    width: '160px',
    height: '160px',
    display: 'inline-block',
    transform: 'rotate(30deg)',
    border: '10px solid white',
    borderRadius: '120px',
    marginRight: '20px'

  }
}
