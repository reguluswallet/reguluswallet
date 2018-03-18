import React, { Component } from "react";
import { ListView, RefreshControl, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { LoadAccount, LoadOperations } from "../actions";
import TransactionRow from "../components/TransactionRow";
import { Balance, SectionHeader } from "../components";
import { Colors, Layout } from "../constants";

/**
 * Transactions Screen Component
 */
class TransactionsScreenComponent extends Component {
    static navigationOptions = {
        title: "Transactions"
    };

    state = {
        refreshing: false
    };

    constructor() {
        super();

        this.refresh = this.refresh.bind(this);
    }

    componentWillMount() {
        this.props.LoadAccount(this.props.public_key);
        this.props.LoadOperations(this.props.public_key);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ transactions }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(transactions);
    }

    refresh() {
        const vm = this;
        vm.setState({ refreshing: true });
        this.props.LoadOperations(this.props.public_key).then(() => {
            vm.props.LoadAccount(vm.props.public_key).then(() => {
                vm.setState({ refreshing: false });
            });
        });
    }

    render() {
        return (
            <Container>
                <Balance>{this.props.balance}</Balance>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh}
                        />
                    }
                >
                    <ListView
                        enableEmptySections
                        pageSize={8}
                        dataSource={this.dataSource}
                        renderRow={item => <TransactionRow item={item} />}
                        renderSeparator={(sectionId, rowId) => (
                            <View key={rowId} style={styles.separator} />
                        )}
                        renderHeader={() => (
                            <SectionHeader>Transactions</SectionHeader>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginLeft: Layout.gutter,
        backgroundColor: Colors.grey
    },
    content: {
        padding: Layout.gutter,
        flex: 1,
        alignItems: "center"
    }
});

const mapStateToProps = state => {
    let { public_key, balance, transactions } = state.account;
    return { public_key, balance, transactions };
};

const TransactionsScreen = connect(mapStateToProps, {
    LoadAccount,
    LoadOperations
})(TransactionsScreenComponent);

export { TransactionsScreen };
