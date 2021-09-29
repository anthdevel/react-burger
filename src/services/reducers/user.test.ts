import * as types from '../constants/user';
import {userReducer} from './user';
import {TUserActions} from '../actions/user';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';

describe('user reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе авторизации пользователя', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGIN_USER_REQUEST,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableFetching,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешной авторизации пользователя', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableFetching,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGIN_USER_SUCCESS,
      payload: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      }
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: true,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableFetched,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке авторизации произошла ошибка', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableFetching,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGIN_USER_ERROR,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableFailed,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе информации о пользователе', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.GET_USER_REQUEST,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableFetching,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешном получении информации пользователя', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableFetching,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.GET_USER_SUCCESS,
      payload: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      }
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableFetched,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке получения информации пользователя произошла ошибка', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableFetching,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.GET_USER_ERROR,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableFailed,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе обновления информации о пользователе', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.UPDATE_USER_REQUEST,
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFetching,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешном обновлении информации пользователя', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFetching,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.UPDATE_USER_SUCCESS,
      payload: {
        email: 'anton.ayupov@gmail.com',
        name: 'Энтони',
      }
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Энтони',
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFetched,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке обновления информации пользователя произошла ошибка', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFetching,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.UPDATE_USER_ERROR,
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFailed,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе выхода пользователя из системы', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGOUT_USER_REQUEST,
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableFetching,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешном выходе пользователя из системы', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableFetching,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGOUT_USER_SUCCESS,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableFetched,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке выхода пользователя из системы произошла ошибка', () => {
    expect(userReducer({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableFetching,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.LOGOUT_USER_ERROR,
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableFailed,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе регистрации пользователя', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.REGISTER_USER_REQUEST,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableFetching,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешной регистрации пользователя', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableFetching,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.REGISTER_USER_SUCCESS,
      payload: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон',
      }
    })).toEqual({
      data: {
        email: 'anton.ayupov@gmail.com',
        name: 'Антон'
      },
      isLoggedIn: true,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableFetched,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке регистрации произошла ошибка', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableFetching,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.REGISTER_USER_ERROR,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableFailed,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе восстановления пароля', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.RESTORE_PASSWORD_REQUEST,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableFetching,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при успешном восстановлении пароля', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableFetching,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.RESTORE_PASSWORD_SUCCESS,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableFetched,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке восстановления пароля произошла ошибка', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableFetching,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.RESTORE_PASSWORD_ERROR,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableFailed,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    });
  });

  it('Должен вернуть состояние при начальном запросе сброса пароля', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableDefault,
      },
    }, {
      type: types.RESET_PASSWORD_REQUEST,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableFetching,
      },
    });
  });

  it('Должен вернуть состояние при успешном сбросе пароля', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableFetching,
      },
    }, {
      type: types.RESET_PASSWORD_SUCCESS,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableFetched,
      },
    });
  });

  it('Должен вернуть состояние, если при попытке сброса пароля произошла ошибка', () => {
    expect(userReducer({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableFetching,
      },
    }, {
      type: types.RESET_PASSWORD_ERROR,
    })).toEqual({
      data: null,
      isLoggedIn: false,
      get: {
        ...fetchableDefault,
      },
      update: {
        ...fetchableDefault,
      },
      login: {
        ...fetchableDefault,
      },
      register: {
        ...fetchableDefault,
      },
      logout: {
        ...fetchableDefault,
      },
      restorePassword: {
        ...fetchableDefault,
      },
      resetPassword: {
        ...fetchableFailed,
      },
    });
  });
});