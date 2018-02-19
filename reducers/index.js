import {combineReducers} from 'redux';
import app from './AppReducer';
import account from './AccountReducer';
import settings from './SettingsReducer';
import {RootNavigationReducer} from '../navigation/RootNavigation';

export default combineReducers({
    nav: RootNavigationReducer,
    account,
    app,
    settings
});