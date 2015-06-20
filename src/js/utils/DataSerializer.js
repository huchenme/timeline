import {OrderedMap, Map, List} from 'immutable';
import moment from 'moment';

import {USER_ID} from 'js/constants/AppConstants';

const timelineListfromJson = (json) => {
  let list = OrderedMap();
  json.forEach(item => {
    list = list.set(item.objectId, Map({
      date: moment(item.date.iso),
      text: item.text,
      featured: item.featured,
      images: List(item.images)
    }));
  });
  return list;
};

const timelineToJson = (data) => {
  return data.set('date', Map({
    __type: 'Date',
    iso: data.get('date').toISOString()
  })).set('createdBy', Map({
    __type: 'Pointer',
    className: '_User',
    objectId: USER_ID
  })).toJS();
};

const timelineUpdateJson = (data) => {
  return data.set('date', Map({
    __type: 'Date',
    iso: data.get('date').toISOString()
  })).toJS();
};

export {timelineListfromJson, timelineToJson, timelineUpdateJson};
