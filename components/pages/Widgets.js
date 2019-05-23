import {asyncConnect} from 'redux-async-connect-react16';
import {Page} from '@vitruviantech/web/components/layout';
import * as Widgets from '@boilerplatejs/demo/actions/Widgets';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Widgets.isLoaded(getState())) {
      return dispatch(Widgets.load());
    }
  }
}])

export default class extends Page {}
