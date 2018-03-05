import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import {LOCK, RESET, SET_COMPLETED_SETUP, SET_PUBLIC_KEY, SET_USER, TOGGLE_LOADING} from "../constants/types";

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

export const ToggleLoading = () => {
    return {type: TOGGLE_LOADING};
};

export const Back = () => {
    return (dispatch) => {
        dispatch(NavigationActions.back())
    }
};

export const Login = (email, password) => {
    return (dispatch) => {
        dispatch(ToggleLoading());
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(GetUserData(user)).then(() => {
                    dispatch(getNavigationAction('Main'));
                    dispatch(ToggleLoading());
                });
            })
            .catch((error) => {
                dispatch(ToggleLoading());
                return Promise.reject(error.message);
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
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const ref = firebase.database().ref(`users/${user.uid}`);
                ref.child('settings').set({
                    completed_setup: false,
                    created_at: new Date(),
                    updated_at: new Date()
                }).then(() => {
                    dispatch(GetUserData(user)).then(() => {
                        dispatch(getNavigationAction('Main'));
                    });
                });
            })
            .catch((error) => {
                return Promise.reject(error.message);
            });
    }
};

export const Logout = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        dispatch(getNavigationAction('Auth'));
        dispatch({type: RESET});
    }
};

export const InitialRoute = (route) => {
    return (dispatch) => {
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
        const {uid} = firebase.auth().currentUser;

        let data = {
            completed_setup: true,
            updated_at: new Date
        };

        const ref = firebase.database().ref(`users/${uid}`);

        ref.child('settings').update(data).then(() => {
            dispatch({type: SET_COMPLETED_SETUP, completed_setup: true});
            dispatch(getNavigationAction('NoWallet'));
        });
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

const GetUserData = (user) => {
    const ref = firebase.database().ref(`users/${user.uid}`);
    return (dispatch) => {
        dispatch({type: SET_USER, user: user});
        return ref.once('value').then((snapshot) => {
            const data = snapshot.val();
            const {settings, wallets} = data;

            dispatch({type: SET_COMPLETED_SETUP, completed_setup: settings.completed_setup});

            if (wallets !== undefined) {
                let wallet = wallets[Object.keys(wallets)[0]];

                dispatch({type: SET_PUBLIC_KEY, public_key: wallet.public_key});
            }
        });
    };
};

export {GetUserData};