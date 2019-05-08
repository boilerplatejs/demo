import {connect} from 'react-redux';
import {Page} from '@vitruvian-tech/machete-bundle/components/layout';

@connect(state => {
  const user = state['@machete-platform/core-bundle'].Session.user;
  return { title: `${user && user.name ? '@' + user.name : 'Machete™ Theme Platform'} - Chat` };
})

export default class extends Page {}
