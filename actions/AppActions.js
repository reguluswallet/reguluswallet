import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import {SET_USER, TOGGLE_COMPLETED_SETUP} from "../constants/types";

const getNavigationAction = (route) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: route
            })
        ]
    });
};

export const Login = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({type: SET_USER, user: user});
                dispatch(getNavigationAction('Main'));
            })
            .catch((error) => {
            })
    }
};

export const LoginAnonymously = () => {
    return (dispatch) => {
        firebase.auth().signInAnonymously()
            .then(function (user) {
                dispatch({type: SET_USER, user: user});
                dispatch(getNavigationAction('Main'));
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }
};

export const Register = (email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(getNavigationAction('Main'));
            })
            .catch((error) => {
            });
    }
};

export const Logout = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        dispatch({type: SET_USER, user: null});
        dispatch(getNavigationAction('Auth'));
    }
};

export const InitialRoute = (route) => {
    return (dispatch) => {
        // dispatch({type: TOGGLE_COMPLETED_SETUP});
        dispatch(getNavigationAction(route))
    }
};