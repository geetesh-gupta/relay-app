import React from 'react';
import {View} from 'react-native';
import {Button} from './Button';

class FormButton extends React.Component {
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={this.props.onFormSubmit}
          title={this.props.title}
          style={this.props.style}
        />
      </View>
    );
  }
}

export {FormButton};
