import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connectMultireducer} from 'multireducer';
import {increment} from '@vitruvian-tech/app-studio-demo/controllers/Counter';

@connectMultireducer(
  (key, state) => ({count: state['@vitruvian-tech/app-studio-demo'].counters[key].count}),
  {increment}
)
export default class extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  props = {
    className: ''
  };

  render() {
    const {count, increment} = this.props; // eslint-disable-line no-shadow
    let {className} = this.props;
    className += ' btn btn-default';
    return (
      <button className={className} onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}

