import {
  GET_ORDER_NUMBER_ERROR,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS
} from '../constants/order';
import {Nullable} from '../../types/types';
import {TOrderActions} from '../actions/order';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';

export type TOrderState = {
  number: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
    data: Nullable<number>
  }
}

const initialState: TOrderState = {
  number: {
    ...fetchableDefault,
    data: null,
  },
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        number: {
          ...state.number,
          ...fetchableFetching,
        }
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        number: {
          ...state.number,
          data: action.payload,
          ...fetchableFetched,
        }
      };
    }
    case GET_ORDER_NUMBER_ERROR: {
      return {
        ...state,
        number: {
          ...state.number,
          ...fetchableFailed,
        }
      };
    }

    default:
      return state;
  }
};