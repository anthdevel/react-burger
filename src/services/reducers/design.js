import {v4 as uuidv4} from 'uuid';
import {REMOVE_DESIGN_ITEM, SET_DESIGN_ITEM} from '../actions/design';

const initialState = {
  bun: null,
  main: [],
};

export const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DESIGN_ITEM: {
      const {payload} = action;

      if (payload.type === 'bun') {
        return {
          ...state,
          bun: payload
        };
      } else {
        return {
          ...state,
          main: [
            ...state.main,
            {...payload, uniqueId: uuidv4()}
          ]
        };
      }
    }
    case REMOVE_DESIGN_ITEM:
      return {
        ...state,
        main: state.main.filter(item => item.uniqueId !== action.payload)
      }
    default:
      return state;
  }
};