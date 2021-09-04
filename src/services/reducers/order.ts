import {GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from '../constants/order';
import {Nullable} from '../../types/types';
import {TOrderActions} from '../actions/order';

export type TOrderState = {
  number: Nullable<number>
  isFetching: boolean
  isFetched: boolean
  isFailed: boolean
}

const initialState: TOrderState = {
  number: null,
  isFetching: false,
  isFetched: false,
  isFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFailed: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        number: action.payload,
        isFetching: false,
        isFetched: true,
        isFailed: false,
      };
    }
    case GET_ORDER_NUMBER_ERROR: {
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFailed: true,
      };
    }

    default:
      return state;
  }
};