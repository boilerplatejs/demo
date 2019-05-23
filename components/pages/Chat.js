import {connect} from 'react-redux';
import {Page} from '@vitruviantech/web/components/layout';

@connect(state => {
  const user = state['@boilerplatejs/core'].Session.user;
  const name = user && user['@boilerplatejs/core'].Auth0.nickname;
  return { title: `Chat - ${name ? '@' + name : 'BoilerplateJS™'}` };
})

export default class extends Page {}
