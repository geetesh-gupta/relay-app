import React from 'react';
import {View, ScrollView} from 'react-native';
import {layoutStyle} from './defaults';

class FormView extends React.Component {
  static defaultProps = {
    customStyles: {},
  };

  render() {
    return (
      // <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            margin: layoutStyle.MARGIN_HORI_SMALL,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: layoutStyle.PADDING_HORI_SMALL,
              elevation: 3,
            }}>
            {this.props.children}
          </View>
        </View>
      </ScrollView>
      // </View>
    );
  }
}

export default FormView;
