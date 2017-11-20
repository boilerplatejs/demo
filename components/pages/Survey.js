import {asyncConnect} from 'redux-async-connect';
import {Page} from '@vitruvian-tech/app-studio-vitruvian-tech/components/layout';
import * as Info from '@vitruvian-tech/app-studio-demo/controllers/Info';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!Info.isLoaded(getState())) {
      return dispatch(Info.load());
    }
  }
}])

export default class extends Page {}
