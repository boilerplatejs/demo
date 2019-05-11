import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Section} from '@machete-platform/core-bundle/components/layout';
import * as Session from '@machete-platform/core-bundle/actions/Session';

@connect(state => ({user: state['@machete-platform/core-bundle'].Session.user}), Session)

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login({ name: input.value });
    input.value = '';
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Component.scss');
    return (
      <Section className={styles.loginPage}>
        <h1>Login</h1>
        {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In</button>
            </form>
            <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          </div>
        }
        {user &&
          <div>
            <p>You are currently logged in as {user['@machete-platform/demo-bundle'].name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
            </div>
          </div>
        }
      </Section>
    );
  }
}
