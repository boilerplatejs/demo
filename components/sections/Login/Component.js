import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Section} from '@boilerplatejs/core/components/layout';
import * as Session from '@boilerplatejs/core/actions/Session';

@connect(state => ({
  user: state['@boilerplatejs/core'].Session.user,
  hash: state.router.location.hash,
  config: state['@boilerplatejs/core'].Config['@boilerplatejs/core']
}), { ...Session, push })

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    hash: PropTypes.string,
    push: PropTypes.func.isRequired,
    config: PropTypes.object
  };

  componentWillMount = () => {
    const {hash, user, push} = this.props;

    if (user) {
      push('/dashboard');
    } else if (hash) {
      this.props.login(
        hash
          .replace('#', '')
          .split('&')
          .map(data => data.split('='))
          .map(data => ({ [data[0]]: data[1] }))
          .reduce((credentials, data) => ({ ...credentials, ...data }), {})
      );
    }
  };

  login = (event) => {
    event.preventDefault();
    global.location = `https://${this.props.config.auth0Domain}.auth0.com/authorize?redirect_uri=${location.protocol}//${location.host}${location.pathname}&scope=openid%20profile%20email&response_type=token&client_id=${this.props.config.auth0ClientId}&connection=Username-Password-Authentication`;
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Component.scss');
    return (
      <Section className={styles.loginPage}>
        <h1>Login</h1>
        {!user && <button className="btn btn-success" onClick={this.login}><i className="fa fa-sign-in"/>{' '}Log In</button>}
        {user && <React.Fragment>
          <h2>Hello, @{user['@boilerplatejs/core'].Auth0.nickname}!</h2>
          <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
        </React.Fragment>}
      </Section>
    );
  }
}
