import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

class FormItemView extends React.Component {
  static defaultProps = {
    customStyles: {},
  };

  render() {
    return (
      <View style={[styles.formItemView, this.props.customStyles]}>
        {this.props.title !== undefined && (
          <Text style={styles.formItemTitle}>{this.props.title}</Text>
        )}
        {this.props.children}
      </View>
    );
  }
}

export {FormItemView};
