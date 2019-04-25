import {asyncConnect} from 'redux-async-connect';
import {Page} from '@vitruvian-tech/machete-bundle/components/layout';
import * as Info from '@machete-platform/demo-bundle/actions/Info';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Info.isLoaded(getState())) {
      return dispatch(Info.load());
    }
  }
}])

export default class extends Page {}
