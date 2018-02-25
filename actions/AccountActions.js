import StellarSdk from 'stellar-sdk';
import {ADD_ACCOUNT, LOAD_ACCOUNT, LOAD_OPERATIONS, SET_KEYS, TOGGLE_LOADING} from '../constants/types';
import firebase from "firebase"
import {SecureStore} from "expo";
import {NavigationActions} from "react-navigation";

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export const AddAccount = (public_key, secret_key) => {
    return (dispatch) => {
        dispatch({type: TOGGLE_LOADING});
        // Associate public key in firebase
        const {currentUser} = firebase.auth();

        let data = {
            uid: currentUser.uid,
            public_key: public_key,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Get a key for wallet.
        let key = firebase.database().ref().child('wallets').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates[`/wallets/${key}`] = data;
        updates[`/user-wallets/${currentUser.uid}/${key}`] = data;

        firebase.database().ref().update(updates);

        // Save secret key to local storage
        SecureStore.setItemAsync(public_key, secret_key)
            .then(() => {
                dispatch({type: SET_KEYS, public_key: public_key, secret_key: secret_key});
                dispatch({type: ADD_ACCOUNT, account: {key: key, public_key: public_key}});
                dispatch(
                    NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Main'
                            })
                        ]
                    })
                );
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

export const LoadAccount = (account) => {
    return (dispatch) => {
        server.loadAccount(account).then(function (account) {
            dispatch({type: LOAD_ACCOUNT, account: account});
        });
    }
};

export const LoadOperations = (account) => {
    return (dispatch) => {
        server.operations()
            .forAccount(account)
            .order('desc')
            .call()
            .then(function (r) {
                dispatch({type: LOAD_OPERATIONS, operations: r.records});
            });
    }
};

