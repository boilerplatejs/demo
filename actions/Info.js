const LOAD = '@boilerplatejs/demo/Info/LOAD';
const LOAD_SUCCESS = '@boilerplatejs/demo/Info/LOAD_SUCCESS';
const LOAD_FAIL = '@boilerplatejs/demo/Info/LOAD_FAIL';

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
  return state['@boilerplatejs/demo'] && state['@boilerplatejs/demo'].Info && state['@boilerplatejs/demo'].Info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@boilerplatejs/demo/Info/load')
  };
}
