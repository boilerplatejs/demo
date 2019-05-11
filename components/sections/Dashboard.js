import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Section} from '@machete-platform/core-bundle/components/layout';
import * as Session from '@machete-platform/core-bundle/actions/Session';

@connect(state => ({user: state['@machete-platform/core-bundle'].Session.user}), Session)

export default class extends Section {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    return (user &&
      <Section>
        <h1>Dashboard</h1>

        <div>
          <p>Hi, @{user['@machete-platform/core-bundle'].nickname}. You have just successfully logged in, and were forwarded here
            by <code>componentWillReceiveProps()</code> in <code>App.js</code>, which is listening to
            the auth reducer via redux <code>@connect</code>. How exciting!
          </p>

          <p>
            The same function will forward you to <code>/</code> should you chose to log out. The choice is yours...
          </p>

          <p>
            <Link to="/chat">
              <button className="btn btn-primary">Go to Chat</button>
            </Link>
          </p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </Section>
    );
  }
}
