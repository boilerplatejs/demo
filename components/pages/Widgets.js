import {asyncConnect} from 'redux-async-connect';
import {Page} from '@vitruvian-tech/machete-bundle/components/layout';
import * as Widgets from '@machete-platform/demo-bundle/controllers/Widgets';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Widgets.isLoaded(getState())) {
      return dispatch(Widgets.load());
    }
  }
}])

export default class extends Page {}
