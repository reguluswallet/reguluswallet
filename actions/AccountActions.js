import StellarSdk from 'stellar-sdk';
import {LOAD_ACCOUNT, LOAD_OPERATIONS} from '../constants/types';

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

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

