import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from '@machete-platform/demo-bundle/controllers/Info';

@connect(
    state => ({info: state['@machete-platform/demo-bundle'].Info.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Component.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        This is an info bar
        {' '}
        <strong>{info ? info.message : 'no info!'}</strong>
        <span className={styles.time}>{info && new Date(info.time).toString()}</span>
        <button className="btn btn-primary" onClick={load}>Reload from server</button>
      </div>
    );
  }
}
