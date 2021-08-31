import {ETokenVariant} from '../types/enums';

export function getCookie(name: ETokenVariant) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: ETokenVariant, value: any, props?: any) {
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

  value = encodeURIComponent(value);
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