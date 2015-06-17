import {OrderedMap, Map, List} from 'immutable';
import moment from 'moment';

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

const toJson = (data) => {
  return data;
};

export {timelineListfromJson, toJson};
