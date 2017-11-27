import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Page} from '@vitruvian-tech/machete-bundle/components/layout';

@connect(state => {
  const user = state['@machete-platform/core-bundle'].Auth.user;
  return { title: user && user.name ? ' @' + user.name : ' ' };
})

export default class extends Page {}
