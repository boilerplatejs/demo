import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Section} from '@boilerplatejs/core/components/layout';
import Socket from '@boilerplatejs/core/lib/Socket';

@connect(state => ({user: state['@boilerplatejs/core'].Session.user}))

export default class extends Section {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (__CLIENT__) {
      const socket = Socket.get();
      socket.on('@boilerplatejs/demo/Chat/message', this.onMessageReceived);
      setTimeout(() => {
        socket.emit('@boilerplatejs/demo/Chat/history', {offset: 0, length: 100});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      Socket.get().removeListener('@boilerplatejs/demo/Chat/message', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const msg = this.state.message;

    this.setState({message: ''});

    Socket.get().emit('@boilerplatejs/demo/Chat/message', {
      from: this.props.user['@boilerplatejs/core'].Auth0.nickname,
      text: msg
    });
  }

  render() {
    const styles = require('./Component.scss');
    const {user} = this.props;

    return (
      <Section className={styles.chat}>
        <h1>Chat</h1>
        {user && <React.Fragment>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="message" placeholder="Enter your message"
             value={this.state.message}
             onChange={(event) => {
               this.setState({message: event.target.value});
             }
            }/>
            <button className="btn btn-success" onClick={this.handleSubmit}>Send</button>
          </form>
          <ul>
            {this.state.messages.map((msg) => {
              return <li key={`chat.msg.${msg.id}`}>@{msg.from}: {msg.text}</li>;
            })}
          </ul>
        </React.Fragment>}
      </Section>
    );
  }
}
