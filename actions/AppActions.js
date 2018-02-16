import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';

const NavigateActionMain = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Main'
        })
    ]
});

export const Login = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(NavigateActionMain);
            })
            .catch((error) => {
            })
    }
};

export const LoginAnonymously = () => {
    return (dispatch) => {
        firebase.auth().signInAnonymously()
            .then(function (user) {
                dispatch(NavigateActionMain);
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
                dispatch(NavigateActionMain);
            })
            .catch((error) => {
            });
    }
};