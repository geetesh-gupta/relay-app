import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

class Button extends React.Component {
  render() {
    const style = this.props.style;
    var touchableStyle, textStyle;
    if (style != undefined) {
      touchableStyle = this.props.style.touchableStyle;
      textStyle = this.props.style.textStyle;
    }
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        style={[styles.buttonTouchable, touchableStyle]}>
        <Text pointerEvents="none" style={[styles.buttonText, textStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
export {Button};
