import {
  SET_CONSTRUCTOR_ITEM,
  REMOVE_CONSTRUCTOR_ITEM,
  REPLACE_CONSTRUCTOR_ITEMS,
  RESET_CONSTRUCTOR
} from '../constants/constructor';
import {TIngredient} from '../types/data';

export interface ISetConstructorItemAction {
  readonly type: typeof SET_CONSTRUCTOR_ITEM
  readonly payload: TIngredient
}

export interface IRemoveConstructorItemAction {
  readonly type: typeof REMOVE_CONSTRUCTOR_ITEM
  readonly payload: string
}

export interface IReplaceConstructorItemsAction {
  readonly type: typeof REPLACE_CONSTRUCTOR_ITEMS
  readonly payload: {
    dragIndex: number
    hoverIndex: number
  }
}

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR
}

export type TConstructorActions =
  | ISetConstructorItemAction
  | IRemoveConstructorItemAction
  | IReplaceConstructorItemsAction
  | IResetConstructorAction;

export const setConstructorItem = (ingredient: TIngredient): ISetConstructorItemAction => ({
  type: SET_CONSTRUCTOR_ITEM,
  payload: ingredient
});

export const removeConstructorItem = (id: string): IRemoveConstructorItemAction => ({
  type: REMOVE_CONSTRUCTOR_ITEM,
  payload: id
});

export const replaceConstructorItems = (dragIndex: number, hoverIndex: number): IReplaceConstructorItemsAction => ({
  type: REPLACE_CONSTRUCTOR_ITEMS,
  payload: {
    dragIndex,
    hoverIndex
  }
});

export const resetConstructor = (): IResetConstructorAction => ({
  type: RESET_CONSTRUCTOR
});



