import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Page} from '@vitruvian-tech/app-studio-vitruvian-tech/components/layout';

@connect(state => {
  const user = state['@vitruvian-tech/app-studio-core'].Auth.user;
  return { title: user && user.name ? ' @' + user.name : ' ' };
})

export default class extends Page {}
