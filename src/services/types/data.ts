import {EOrderStatus} from '../../types/enums';

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
}

export type TUser = {
  readonly email: string
  readonly name: string
}

export type TOrder = {
  readonly _id: string
  readonly createdAt: string
  readonly ingredients: string[]
  readonly name: string
  readonly number: number
  readonly status: EOrderStatus
  readonly updatedAt: string
};

export type TWsOrders = {
  readonly success: boolean
  readonly orders: TOrder[]
  readonly total: number
  readonly totalToday: number
};