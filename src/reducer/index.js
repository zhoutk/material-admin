import { combineReducers, routerReducer } from 'redux-seamless-immutable'
// import resourceReducer from './resource';
// import loading from './loading';
// import notification from './notification';
// import references from './references';
// import saving from './saving';
import ui from './ui';

export default (resources) => {
    // const resourceReducers = {};
    // [].forEach((resource) => {
    //     resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
    // });
    return combineReducers({
        // ...resourceReducers,
        // loading,
        // notification,
        // references,
        // saving,
        ui,
        routing: routerReducer
    });
};
