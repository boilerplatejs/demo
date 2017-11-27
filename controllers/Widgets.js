const LOAD = '@machete-platform/demo-bundle/Widgets/LOAD';
const LOAD_SUCCESS = '@machete-platform/demo-bundle/Widgets/LOAD_SUCCESS';
const LOAD_FAIL = '@machete-platform/demo-bundle/Widgets/LOAD_FAIL';
const EDIT_START = '@machete-platform/demo-bundle/Widgets/EDIT_START';
const EDIT_STOP = '@machete-platform/demo-bundle/Widgets/EDIT_STOP';
const SAVE = '@machete-platform/demo-bundle/Widgets/SAVE';
const SAVE_SUCCESS = '@machete-platform/demo-bundle/Widgets/SAVE_SUCCESS';
const SAVE_FAIL = '@machete-platform/demo-bundle/Widgets/SAVE_FAIL';

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
  return state['@machete-platform/demo-bundle'] && state['@machete-platform/demo-bundle'].Widgets && state['@machete-platform/demo-bundle'].Widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/@machete-platform/demo-bundle/Widgets/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/@machete-platform/demo-bundle/Widgets/update', {
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
