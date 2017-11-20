import {asyncConnect} from 'redux-async-connect';
import {Page} from '@vitruvian-tech/app-studio-vitruvian-tech/components/layout';
import * as Widgets from '@vitruvian-tech/app-studio-demo/controllers/Widgets';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Widgets.isLoaded(getState())) {
      return dispatch(Widgets.load());
    }
  }
}])

export default class extends Page {}
