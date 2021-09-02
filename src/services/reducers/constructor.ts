import {v4 as uuidv4} from 'uuid';
import {
  REMOVE_CONSTRUCTOR_ITEM,
  REPLACE_CONSTRUCTOR_ITEMS,
  RESET_CONSTRUCTOR,
  SET_CONSTRUCTOR_ITEM
} from '../constants/constructor';

const initialState = {
  bun: null,
  main: [],
};

export const constructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_ITEM: {
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
    case REMOVE_CONSTRUCTOR_ITEM:
      return {
        ...state,
        main: state.main.filter((item: any) => item.uniqueId !== action.payload)
      }
    case RESET_CONSTRUCTOR:
      return initialState;
    case REPLACE_CONSTRUCTOR_ITEMS: {
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