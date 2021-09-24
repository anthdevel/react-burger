import {
  CLEAR_ORDER_DETAILS,
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_NUMBER_ERROR,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS
} from '../constants/order';
import {Nullable} from '../../types/types';
import {TOrderActions} from '../actions/order';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';
import {TOrder} from '../types/data';

export type TOrderState = {
  number: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
    data: Nullable<number>
  },
  details: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
    data: Nullable<TOrder>
  }
}

const initialState: TOrderState = {
  number: {
    ...fetchableDefault,
    data: null,
  },
  details: {
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

    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        details: {
          ...state.details,
          ...fetchableFetching,
        }
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        details: {
          ...state.details,
          data: action.payload,
          ...fetchableFetched,
        }
      };
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        details: {
          ...state.details,
          ...fetchableFailed,
        }
      };
    }

    case CLEAR_ORDER_DETAILS: {
      return {
        ...state,
        details: {
          ...state.details,
          data: null
        }
      };
    }

    default:
      return state;
  }
};