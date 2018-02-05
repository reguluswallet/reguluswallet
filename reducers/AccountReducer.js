import _ from 'lodash';
import {LOAD_ACCOUNT, LOAD_OPERATIONS} from '../constants/types';

const INITIAL_STATE = {
    id: 'GD37245DE23W6I2JRULHEA22Y35XDVPGEXJ43W7TWWXORWIBDZC7JHCS',
    balance: 0,
    transactions: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_ACCOUNT:
            let nativeBalance = _.find(action.account.balances, function (b) {
                return b.asset_type == 'native';
            });

            return {...state, balance: nativeBalance.balance};
            break;
        case LOAD_OPERATIONS:
            let transactions = _.filter(action.operations, function (o) {
                return o.type == 'payment';
            });

            return {...state, transactions: transactions};
    }
    return state;
}