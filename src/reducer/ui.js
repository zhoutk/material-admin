import { TOGGLE_SIDEBAR, SET_SIDEBAR_VISIBILITY } from '../actions';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
    sidebarOpen: false,
});

export default (previousState = defaultState, { type, payload }) => {
    switch (type) {
        case TOGGLE_SIDEBAR:
            return Immutable.merge(defaultState, {sidebarOpen: !previousState.sidebarOpen });
        case SET_SIDEBAR_VISIBILITY:
            return Immutable.merge(defaultState, {sidebarOpen: payload });
        default:
            return previousState;
    }
};
