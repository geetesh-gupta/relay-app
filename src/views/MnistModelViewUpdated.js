import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button} from 'react-native';
import useMnistCustomModel from '../hooks/useMnistCustomModel';
import {TFContext} from '../tf';
import useMnistData from '../hooks/useMnistData';
import Canva from '../components/Canva';
import {asyncStorageIO} from '@tensorflow/tfjs-react-native';

export default function MnistModelViewUpdated({activeNum}) {
  const [imageTensor, setImageTensor] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [trainingNums, setTrainingNums] = useState([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ]);
  const {isTFReady, tf} = useContext(TFContext);
  const {isDataReady, getTrainData, getTestData} = useMnistData();
  const {
    model,
    train,
    test,
    predict,
    isTraining,
    isTesting,
  } = useMnistCustomModel();

  useEffect(() => {
    if (!isTFReady || !isDataReady) return;
    setImageTensor(null);
    const imageTensor = getTestData(1, [activeNum]).xs;
    setImageTensor(imageTensor);
  }, [isTFReady, isDataReady, activeNum]);

  useEffect(() => {
    if (!model || !imageTensor) return;
    setPredictions(null);
    predict(imageTensor).then(res => {
      if (res[0] === 0) setPredictions('0');
      else if (res[0] <= 9 && res[0] >= 1) setPredictions(res[0]);
      else if (res.length) setPredictions('😕');
    });
    () => {
      setPredictions(null);
    };
  }, [model, imageTensor]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {isTraining ? (
          <View style={styles.loadingModelContainer}>
            <Text style={styles.text}>Training...</Text>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <Button
            color={'#1b313e'}
            onPress={() => {
              train(getTrainData(5000, trainingNums), getTestData(500)).then(
                () => {
                  console.log('Model trained for 0');
                  test(getTestData(500));
                  model
                    .save(asyncStorageIO('mnistmodel'))
                    .then(res => console.log('Model Saved', res));
                },
              );
            }}
            disabled={!isDataReady || !isTFReady}
            title={`Train`}
          />
        )}
        {isTesting ? (
          <View style={styles.loadingModelContainer}>
            <Text style={styles.text}>Testing...</Text>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <Button
            color={'#1b313e'}
            disabled={!isDataReady || !isTFReady}
            onPress={() => test(getTestData(1000))}
            title={`Test`}
          />
        )}
      </View>
      {imageTensor && imageTensor.dataSync && isTFReady && (
        <View style={styles.canvaContainer}>
          <Canva imagePixels={imageTensor.dataSync()} />
        </View>
      )}
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>
          Tensorflow ready? {isTFReady ? <Text>✅</Text> : ''}
        </Text>
        <View style={styles.loadingModelContainer}>
          <Text style={styles.text}>Model ready? </Text>
          {model ? (
            <Text style={styles.text}>✅</Text>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
        <View style={styles.loadingModelContainer}>
          <Text style={styles.text}>Predicting? </Text>
          {predictions ? (
            <Text style={styles.text}>✅</Text>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </View>
      {predictions && (
        <Text style={{fontSize: 28 * 3, color: 'white'}}>{predictions}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171f24',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loadingModelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  text: {
    color: 'white',
  },
  canvaContainer: {
    height: 28 * 3,
    width: 28 * 3,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});
