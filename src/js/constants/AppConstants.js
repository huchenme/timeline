import LEANCLOUD from 'js/constants/LeanCloud';

const TABS = {
  ALL: 'ALL',
  FEATURED: 'FEATURED',
};

const TIMELINE_ACTIONS = {
  LOAD_TIMELINES: 'LOAD_TIMELINES',
  LOAD_TIMELINES_RESPONSE: 'LOAD_TIMELINES_RESPONSE',
  ADD_TIMELINE: 'ADD_TIMELINE',
  ADD_TIMELINE_RESPONSE: 'ADD_TIMELINE_RESPONSE',
  DELETE_TIMELINE: 'DELETE_TIMELINE',
  DELETE_TIMELINE_RESPONSE: 'DELETE_TIMELINE_RESPONSE',
  UPDATE_TIMELINE: 'UPDATE_TIMELINE',
  UPDATE_TIMELINE_RESPONSE: 'UPDATE_TIMELINE_RESPONSE',
};

const SESSION_ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE: 'LOGIN_RESPONSE',
};

const ASYNC_REQUEST_STATUS = {
  IDLE: 'IDLE',
  REQUESTING: 'REQUESTING',
  FAILED: 'FAILED',
};

const APIRoot = 'https://api.LEANCLOUD.cn/1.1';

const CHANGE = 'CHANGE';

const API = {
  ROOT: 'https://api.LEANCLOUD.cn/1.1',
  ENDPOINTS: {
    LOGIN: `${APIRoot}/login`,
    CLOUDQUERY: `${APIRoot}/cloudQuery`,
    TIMELINE: `${APIRoot}/classes/Timeline`,
  },
  QUERYS: {
    ALL_TIMELINE: `select * from Timeline where createdBy=pointer('_User', '${LEANCLOUD.USER_ID}') and deleted=false order by date desc`,
  },
  HEADERS: {
    APP_ID: 'X-AVOSCloud-Application-Id',
    APP_KEY: 'X-AVOSCloud-Application-Key',
    SESSION_TOKEN: 'X-AVOSCloud-Session-Token',
  },
};

export {
  TABS,
  TIMELINE_ACTIONS,
  SESSION_ACTIONS,
  CHANGE,
  API,
  ASYNC_REQUEST_STATUS,
};
