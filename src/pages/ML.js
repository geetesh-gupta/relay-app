import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TFProvider} from '../tf';
import SelectNumView from '../views/SelectNumView';
import MnistModelViewUpdated from '../views/MnistModelViewUpdated';

export default function ML() {
  const [activeNum, setActiveNum] = useState(7);

  return (
    <TFProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Digit Classication Federated</Text>
      </View>
      <SelectNumView activeNum={activeNum} setActiveNum={setActiveNum} />
      <MnistModelViewUpdated activeNum={activeNum} />
    </TFProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171f24',
    padding: 28,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
  },
});
