import {asyncConnect} from 'redux-async-connect-react16';
import {Page} from '@vitruviantech/web/components/layout';
import * as Info from '@boilerplatejs/demo/actions/Info';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Info.isLoaded(getState())) {
      return dispatch(Info.load());
    }
  }
}])

export default class extends Page {}
