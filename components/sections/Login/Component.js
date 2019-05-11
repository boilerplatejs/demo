import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Section} from '@machete-platform/core-bundle/components/layout';
import * as Session from '@machete-platform/core-bundle/actions/Session';

@connect(state => ({
  user: state['@machete-platform/core-bundle'].Session.user,
  hash: state.router.location.hash
}), { ...Session, push })

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    hash: PropTypes.string,
    push: PropTypes.func.isRequired
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
    global.location = `https://dev-inw25gf0.auth0.com/authorize?redirect_uri=${location.protocol}//${location.host}${location.pathname}&scope=openid%20profile%20email&response_type=token&client_id=NnqQOByZ7Y5nPMHGkaiYTkkqT72ukLJK&connection=Username-Password-Authentication`;
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Component.scss');
    return (
      <Section className={styles.loginPage}>
        <h1>Login</h1>
        {!user && <button className="btn btn-success" onClick={this.login}><i className="fa fa-sign-in"/>{' '}Log In</button>}
        {user && <React.Fragment>
          <h2>Hello, @{user['@machete-platform/demo-bundle'].nickname}!</h2>
          <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
        </React.Fragment>}
      </Section>
    );
  }
}
