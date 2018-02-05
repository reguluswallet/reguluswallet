import React from 'react';
import { Text } from 'react-native';

export class ClearText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'clear-sans' }]} />;
  }
}
