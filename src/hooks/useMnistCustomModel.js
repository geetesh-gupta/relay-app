import React, {useState, useEffect, useContext} from 'react';
import {TFContext} from '../tf';
import {asyncStorageIO} from '@tensorflow/tfjs-react-native';

const useMnistCustomModel = () => {
  const [model, setModel] = useState(null);
  const {isTFReady, tf} = useContext(TFContext);
  const [isTraining, setIsTraining] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (!isTFReady) return;
    const storageKey = 'mnistmodel';
    tf.loadLayersModel(asyncStorageIO(storageKey))
      .then(model => {
        console.log('Local Model loaded');
        const optimizer = tf.train.adam();
        model.compile({
          optimizer: optimizer,
          loss: 'categoricalCrossentropy',
          metrics: ['accuracy'],
        });
        setModel(model);
      })
      .catch(e => {
        console.log('Local model does not exist. Creating one.');
        const model = tf.sequential();

        const IMAGE_WIDTH = 28;
        const IMAGE_HEIGHT = 28;
        const IMAGE_CHANNELS = 1;

        // In the first layer of our convolutional neural network we have
        // to specify the input shape. Then we specify some parameters for
        // the convolution operation that takes place in this layer.
        model.add(
          tf.layers.conv2d({
            inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
            kernelSize: 3,
            filters: 16,
            activation: 'relu',
          }),
        );

        // The MaxPooling layer acts as a sort of downsampling using max values
        // in a region instead of averaging.
        model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

        // Our third layer is another convolution, this time with 32 filters.
        model.add(
          tf.layers.conv2d({
            kernelSize: 3,
            filters: 32,
            activation: 'relu',
          }),
        );

        // Max pooling again.
        model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

        // Add another conv2d layer.
        model.add(
          tf.layers.conv2d({
            kernelSize: 3,
            filters: 32,
            activation: 'relu',
          }),
        );

        // Now we flatten the output from the 2D filters into a 1D vector to prepare
        // it for input into our last layer. This is common practice when feeding
        // higher dimensional data to a final classification output layer.
        model.add(tf.layers.flatten({}));

        model.add(tf.layers.dense({units: 64, activation: 'relu'}));

        // Our last layer is a dense layer which has 10 output units, one for each
        // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
        model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

        // Choose an optimizer, loss function and accuracy metric,
        // then compile and return the model
        const optimizer = tf.train.adam();
        model.compile({
          optimizer: optimizer,
          loss: 'categoricalCrossentropy',
          metrics: ['accuracy'],
        });
        setModel(model);
        model
          .save(asyncStorageIO(storageKey))
          .then(res => console.log('Model Saved', res));
      });
  }, [isTFReady]);

  const train = (trainData, testData) => {
    // setIsTraining(true);
    console.log('Training...');
    const BATCH_SIZE = 256;
    const EPOCHS = 2;
    return model.fit(trainData.xs, trainData.labels, {
      batchSize: BATCH_SIZE,
      validation: [testData.xs, testData.labels],
      epochs: EPOCHS,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(
            `Training... (` +
              `${epoch + 1}/${EPOCHS}` +
              ` complete). To stop training, refresh or close page.`,
          );
          console.log('Accuracy: ', logs);
        },
      },
    });
    // .then(() => {
    //   console.log("Model trained");
    //   test(testData);
    //   setModel(model);
    //   setIsTraining(false);
    //   model
    //     .save(asyncStorageIO("mnist-custom-model"))
    //     .then((res) => console.log("Model Saved", res));
    // });
  };

  const test = testData => {
    setIsTesting(true);
    const testResult = model.evaluate(testData.xs, testData.labels);
    const testAccPercent = testResult[1].dataSync()[0] * 100;
    console.log(`Test accuracy: ${testAccPercent.toFixed(1)}%`);
    setIsTesting(false);
    return `${testAccPercent.toFixed(1)}%`;
  };

  const predict = testData => {
    const prediction = model.predict(testData);
    console.log(prediction.dataSync());
    return prediction.argMax(1).data();
  };

  return {model, train, test, predict, isTraining, isTesting};
};
export default useMnistCustomModel;
