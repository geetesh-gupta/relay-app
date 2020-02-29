import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Card = (props) => {
    return (
        <View style={[styles.cardView, props.customStyles]}>
            {props.children}
        </View>
    );
};

export { Card };