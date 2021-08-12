import {v4 as uuidv4} from 'uuid';
import {REMOVE_DESIGN_ITEM, REPLACE_DESIGN_ITEMS, RESET_DESIGN, SET_DESIGN_ITEM} from '../actions/design';

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
    case RESET_DESIGN:
      return initialState;
    case REPLACE_DESIGN_ITEMS: {
      const {payload} = action;

      const dragItem = state.main.splice(payload.dragIndex, 1);

      const newMain = [
        ...state.main.slice(0, payload.hoverIndex),
        ...dragItem,
        ...state.main.slice(payload.hoverIndex, state.main.length)
      ]

      return ({
        ...state,
        main: newMain
      })
    }
    default:
      return state;
  }
};