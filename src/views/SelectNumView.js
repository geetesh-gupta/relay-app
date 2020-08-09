import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const SelectNumView = ({activeNum, setActiveNum}) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttons}>
        {[0, 1, 2, 3, 4].map(n => (
          <View style={styles.button} key={n}>
            <Button
              color={'#1b313e'}
              onPress={() => setActiveNum(n)}
              title={`Select ${n}`}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttons}>
        {[5, 6, 7, 8, 9].map(n => (
          <View style={styles.button} key={n}>
            <Button
              color={'#1b313e'}
              onPress={() => setActiveNum(n)}
              title={`Select ${n}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SelectNumView;

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#171f24',
    padding: 8,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
    marginTop: 0,
    width: '40%',
  },
  button: {marginBottom: 8},
});
