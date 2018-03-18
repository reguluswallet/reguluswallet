import StellarSdk from "stellar-sdk";
import { NavigationActions } from "react-navigation";
import {
    LOAD_ACCOUNT,
    LOAD_OPERATIONS,
    SET_PUBLIC_KEY,
    SET_SECRET_KEY,
    TOGGLE_LOADING
} from "../constants/types";

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const AddAccount = (public_key, secret_key) => {
    return dispatch => {
        dispatch({ type: SET_PUBLIC_KEY, public_key });
        dispatch({ type: SET_SECRET_KEY, secret_key });
        dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Main"
                    })
                ]
            })
        );
    };
};

export const LoadAccount = account => {
    return dispatch => {
        return server.loadAccount(account).then(function(account) {
            dispatch({ type: LOAD_ACCOUNT, account });
        });
    };
};

export const LoadOperations = account => {
    return dispatch => {
        dispatch({ type: TOGGLE_LOADING });
        return server
            .payments()
            .forAccount(account)
            .order("desc")
            .call()
            .then(function(r) {
                dispatch({ type: LOAD_OPERATIONS, operations: r.records });
                dispatch({ type: TOGGLE_LOADING });
            });
    };
};

const SendPayment = (sourceId, destinationId, amount, memo) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const { secret_key } = getState().account;
            if (secret_key !== "") {
                const sourceKeys = StellarSdk.Keypair.fromSecret(secret_key);

                // Transaction will hold a built transaction we can resubmit if the result is unknown.
                let transaction;

                // First, check to make sure that the destination account exists.
                // You could skip this, but if the account does not exist, you will be charged
                // the transaction fee when the transaction fails.
                server
                    .loadAccount(destinationId)
                    // If the account is not found, surface a nicer error message for logging.
                    .catch(StellarSdk.NotFoundError, function() {
                        reject(
                            new Error("The destination account does not exist!")
                        );
                    })
                    // If there was no error, load up-to-date information on your account.
                    .then(function() {
                        return server.loadAccount(sourceKeys.publicKey());
                    })
                    .then(function(sourceAccount) {
                        // Start building the transaction.
                        transaction = new StellarSdk.TransactionBuilder(
                            sourceAccount
                        ).addOperation(
                            StellarSdk.Operation.payment({
                                destination: destinationId,
                                // Because Stellar allows transaction in many currencies, you must
                                // specify the asset type. The special "native" asset represents Lumens.
                                asset: StellarSdk.Asset.native(),
                                amount
                            })
                        );

                        // A memo allows you to add your own metadata to a transaction. It's
                        // optional and does not affect how Stellar treats the transaction.
                        if (memo) {
                            transaction.addMemo(StellarSdk.Memo.text(memo));
                        }

                        transaction.build();

                        // Sign the transaction to prove you are actually the person sending it.
                        transaction.sign(sourceKeys);
                        // And finally, send it off to Stellar!
                        return server.submitTransaction(transaction);
                    })
                    .then(function(result) {
                        resolve(result);
                    })
                    .catch(function(error) {
                        reject(new Error(error.message));
                    });
            } else {
                dispatch(
                    NavigationActions.navigate({
                        routeName: "MissingKey"
                    })
                );

                reject(new Error("Missing secret key."));
            }
        });
    };
};

export { SendPayment };
