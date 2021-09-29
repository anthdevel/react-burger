import {EOrderStatus, ETokenVariant} from '../types/enums';
import {Nullable} from '../types/types';
import {TOrder} from '../services/types/data';
import moment from 'moment-timezone';
import 'moment/locale/ru';

export function getCookie(name: ETokenVariant) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: ETokenVariant, value: Nullable<string>, props?: { [key: string]: any }) {
  props = props || {};

  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value!);
  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: ETokenVariant) {
  setCookie(name, null, {expires: -1});
}

export const fetchableDefault = {
  isFetching: false,
  isFetched: false,
  isFailed: false,
};

export const fetchableFetching = {
  ...fetchableDefault,
  isFetching: true,
};

export const fetchableFetched = {
  ...fetchableDefault,
  isFetched: true,
};

export const fetchableFailed = {
  ...fetchableDefault,
  isFailed: true,
};

export const hasToken = () => {
  const accessToken = getCookie(ETokenVariant.AccessToken);

  return Boolean(accessToken?.trim());
};

export const sortByDate = (a: TOrder, b: TOrder) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export const getOrderStatus = (status: EOrderStatus) => {
  switch (status) {
    case EOrderStatus.Pending:
      return 'Готовится';
    case EOrderStatus.Done:
      return 'Выполнен';
    case EOrderStatus.Created:
      return 'Создан';
    default:
      return '';
  }
};

export const getDate = (date: string) => `${moment.tz(date, 'Europe/Moscow').calendar()} i-GMT+3`;