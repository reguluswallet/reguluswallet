import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import {LOCK, RESET, SET_USER, TOGGLE_COMPLETED_SETUP} from "../constants/types";

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

export const Reset = () => {
    return {type: RESET};
};

export const Back = () => {
    return (dispatch) => {
        dispatch(NavigationActions.back())
    }
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

export const Route = (route) => {
    return (dispatch) => {
        dispatch(
            NavigationActions.navigate({
                routeName: route
            })
        )
    }
};

export const CompleteIntro = () => {
    return (dispatch) => {
        dispatch({type: TOGGLE_COMPLETED_SETUP});
        dispatch(getNavigationAction('NoWallet'));
    }
};

export const Lock = () => {
    return (dispatch) => {
        dispatch({type: LOCK});
        dispatch(
            NavigationActions.navigate({
                routeName: 'Splash'
            }));
    }
};