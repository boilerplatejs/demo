const LOAD = '@machete-platform/demo-bundle/Info/LOAD';
const LOAD_SUCCESS = '@machete-platform/demo-bundle/Info/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/demo-bundle/Info/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state['@machete-platform/demo-bundle'] && state['@machete-platform/demo-bundle'].Info && state['@machete-platform/demo-bundle'].Info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@machete-platform/demo-bundle/Info/load')
  };
}
