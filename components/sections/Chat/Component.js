import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Section} from '@machete-platform/core-bundle/components/layout';

@connect(
  state => ({user: state['@machete-platform/core-bundle'].Auth.user})
)
export default class extends Section {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (socket) {
      socket.on('msg', this.onMessageReceived);
      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('msg', this.onMessageReceived);
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

    socket.emit('msg', {
      from: this.props.user.name,
      text: msg
    });
  }

  render() {
    const styles = require('./Component.scss');
    const {user} = this.props;

    return (
      <Section className={styles.chat}>
        <h1>Chat</h1>
        {user &&
        <div>
          <ul>
          {this.state.messages.map((msg) => {
            return <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>;
          })}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="message" placeholder="Enter your message"
             value={this.state.message}
             onChange={(event) => {
               this.setState({message: event.target.value});
             }
            }/>
            <button className="btn" onClick={this.handleSubmit}>Send</button>
          </form>
        </div>
        }
      </Section>
    );
  }
}
