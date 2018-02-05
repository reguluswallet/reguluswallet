import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import stellar from 'stellar-sdk';
import {LoadAccount, LoadOperations} from '../actions';
import TransactionRow from '../components/TransactionRow';
import {Balance, SectionHeader} from '../components';
import {Colors, Layout} from '../constants';

var server = new stellar.Server('https://horizon-testnet.stellar.org');

class TransactionsScreen extends Component {
    static navigationOptions = {
        title: 'Transactions',
    };

    componentWillMount() {
        this.props.LoadAccount(this.props.id);
        this.props.LoadOperations(this.props.id);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({transactions}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(transactions);
    }

    render() {
        return (
            <View style={styles.container}>
                <Balance>{this.props.balance}</Balance>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={item => <TransactionRow item={item}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                    renderHeader={() => <SectionHeader>Transactions</SectionHeader>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginLeft: Layout.gutter,
        backgroundColor: Colors.grey,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    }
});

const mapStateToProps = ({account}) => {
    let {id, balance, transactions} = account;
    return {id, balance, transactions};
};

export default connect(mapStateToProps, {LoadAccount, LoadOperations})(TransactionsScreen);
