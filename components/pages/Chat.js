import {connect} from 'react-redux';
import {Page} from '@vitruvian-tech/machete-bundle/components/layout';

@connect(state => {
  const user = state['@machete-platform/core-bundle'].Session.user;
  const name = user && user['@machete-platform/demo-bundle'].name;
  return { title: `${name ? '@' + name : 'Machete™ Theme Platform'} - Chat` };
})

export default class extends Page {}
