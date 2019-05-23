const LOAD = '@boilerplatejs/demo/Widgets/LOAD';
const LOAD_SUCCESS = '@boilerplatejs/demo/Widgets/LOAD_SUCCESS';
const LOAD_FAIL = '@boilerplatejs/demo/Widgets/LOAD_FAIL';
const EDIT_START = '@boilerplatejs/demo/Widgets/EDIT_START';
const EDIT_STOP = '@boilerplatejs/demo/Widgets/EDIT_STOP';
const SAVE = '@boilerplatejs/demo/Widgets/SAVE';
const SAVE_SUCCESS = '@boilerplatejs/demo/Widgets/SAVE_SUCCESS';
const SAVE_FAIL = '@boilerplatejs/demo/Widgets/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
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
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(state) {
  return state['@boilerplatejs/demo'] && state['@boilerplatejs/demo'].Widgets && state['@boilerplatejs/demo'].Widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@boilerplatejs/demo/Widgets/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/@boilerplatejs/demo/Widgets/update', {
      data: widget
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
