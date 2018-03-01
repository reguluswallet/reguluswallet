import StellarSdk from 'stellar-sdk';
import {LOAD_ACCOUNT, LOAD_OPERATIONS, SET_PUBLIC_KEY, TOGGLE_LOADING} from '../constants/types';
import firebase from "firebase"
import {SecureStore} from "expo";
import {NavigationActions} from "react-navigation";

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export const AddAccount = (public_key, secret_key) => {
    return (dispatch) => {
        dispatch({type: TOGGLE_LOADING});
        // Associate public key in firebase
        const {uid} = firebase.auth().currentUser;

        let data = {
            public_key: public_key,
            created_at: new Date(),
            updated_at: new Date()
        };

        const ref = firebase.database().ref(`users/${uid}`);

        // Get a key for wallet.
        let key = ref.child('wallets').push().key;

        ref.child(`wallets/${key}`).set(data);

        dispatch({type: SET_PUBLIC_KEY, public_key: public_key});
        // Save secret key to local storage
        SecureStore.setItemAsync(public_key, secret_key)
            .then(() => {
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

export const GetWallet = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        dispatch({type: TOGGLE_LOADING});
        return firebase.database().ref(`user-wallets/${currentUser.uid}`).limitToFirst(1).once('value', function (snapshot) {
            const child = snapshot.val();

            if (child) {
                console.log(child);
                let wallet = child[Object.keys(child)[0]];

                return SecureStore.getItemAsync(wallet.public_key).then(secret_key => {
                    dispatch({type: SET_KEYS, public_key: wallet.public_key, secret_key: secret_key});
                    dispatch({type: TOGGLE_LOADING});
                });
            }
            dispatch({type: TOGGLE_LOADING});
            return Promise.resolve();
        });
    };
};

export const LoadAccount = (account) => {
    return (dispatch) => {
        server.loadAccount(account)
            .then(function (account) {
                dispatch({type: LOAD_ACCOUNT, account: account});
            })
            .catch((e) => {

            });
    }
};

export const LoadOperations = (account) => {
    return (dispatch) => {
        dispatch({type: TOGGLE_LOADING});
        return server.payments()
            .forAccount(account)
            .order('desc')
            .call()
            .then(function (r) {
                dispatch({type: LOAD_OPERATIONS, operations: r.records});
                dispatch({type: TOGGLE_LOADING});
            })
            .catch((e) => {

            });
    }
};

