import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const CardHeader = props => {
  return (
    <View style={styles.cardHeaderView}>
      <Text style={styles.cardHeaderText}>{props.headerText}</Text>
      {props.children}
    </View>
  );
};

export {CardHeader};
