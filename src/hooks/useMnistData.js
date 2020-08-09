import React, {useState, useEffect, useContext, useCallback} from 'react';
import {TFContext} from '../tf';
import {sum} from '@tensorflow/tfjs';

const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const IMAGE_SIZE = IMAGE_WIDTH * IMAGE_HEIGHT;
const LABEL_SIZE = 10;
const TEST_DATA_WEIGHTAGE = 15; // 15% of total data
const DIGITS_FOLDER = '../assets/digits/';
const raw = [
  require(DIGITS_FOLDER + '0.json').data,
  require(DIGITS_FOLDER + '1.json').data,
  require(DIGITS_FOLDER + '2.json').data,
  require(DIGITS_FOLDER + '3.json').data,
  require(DIGITS_FOLDER + '4.json').data,
  require(DIGITS_FOLDER + '5.json').data,
  require(DIGITS_FOLDER + '6.json').data,
  require(DIGITS_FOLDER + '7.json').data,
  require(DIGITS_FOLDER + '8.json').data,
  require(DIGITS_FOLDER + '9.json').data,
];

function getRandomInt(min = 0, max = 1) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.floor(min))) +
    Math.floor(min)
  );
}

function partitionNum(num) {
  const partitions = [];
  for (let i = 0; i < num - 1; i++) {
    const part = getRandomInt(100 / (num + num / 2), 100 / (num - num / 2));
    partitions.push(part);
  }
  if (partitions.length) partitions.push(100 - sum(partitions));
  else return [100];
  return partitions;
}

function randomize(data, size) {
  const dataToReturn = [];
  for (let i = 0; i < size; i++) {
    dataToReturn.push(data[getRandomInt(0, data.length)]);
  }
  return dataToReturn;
}

const useMnistData = () => {
  const [trainData, setTrainData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [indexHash, setIndexHash] = useState({
    training: {},
    testing: {},
  });
  const [isDataReady, setIsDataReady] = useState(false);
  const {tf, isTFReady} = useContext(TFContext);

  useEffect(() => {
    const trainingImagesArray = [];
    const testingImagesArray = [];
    const trainingLabelsArray = [];
    const testingLabelsArray = [];
    const indexHash = {training: {}, testing: {}};
    const offset = {training: 0, testing: 0};
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(id) {
      const curLabel = Array(10).fill(0);
      curLabel[id] = 1;
      const separator = raw[id].length - 100 * IMAGE_SIZE;
      for (let i = 0; i < separator; i += IMAGE_SIZE) {
        trainingImagesArray.push(
          raw[id].slice(i, i + IMAGE_SIZE).map(e => Math.round(e * 255)),
        );
        trainingLabelsArray.push(curLabel);
      }
      for (let i = separator; i < raw[id].length; i += IMAGE_SIZE) {
        testingImagesArray.push(
          raw[id].slice(i, i + IMAGE_SIZE).map(e => Math.round(e * 255)),
        );
        testingLabelsArray.push(curLabel);
      }
      const trainingLength = separator / IMAGE_SIZE;
      const testingLength = (raw[id].length - separator) / IMAGE_SIZE;
      indexHash.training[id] = [
        offset.training,
        offset.training + trainingLength,
      ];
      indexHash.testing[id] = [offset.testing, offset.testing + testingLength];
      offset.training = offset.training + trainingLength;
      offset.testing = offset.testing + testingLength;
    });

    setTrainData({
      xs: trainingImagesArray,
      labels: trainingLabelsArray,
    });
    setTestData({
      xs: testingImagesArray,
      labels: testingLabelsArray,
    });
    setIndexHash(indexHash);
    setIsDataReady(true);
  }, []);

  const convertToImageTensor = array => {
    if (!Array.isArray(array[0])) array = [array];
    return tf
      .tensor2d(array, [array.length, IMAGE_SIZE], 'int32')
      .reshape([array.length, 28, 28, 1]);
  };

  const convertToLabelTensor = array => {
    if (!Array.isArray(array)) array = [array];
    return tf
      .tensor2d(array, [array.length, LABEL_SIZE], 'int32')
      .reshape([array.length, 10]);
  };

  const getTrainData = (size = 1, nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => {
    const partitions = partitionNum(nums.length);
    const percentages = [];
    let excess = 0;
    for (let j = 0; j < partitions.length; j++) {
      const [start, end] = indexHash.training[nums[j]];
      const cur = Math.floor((size * partitions[j]) / 100) + excess;
      if (cur > end - start) excess += cur - end + start;
      const part = Math.min(cur, end - start);
      percentages.push(part);
    }
    let dataToReturn = {
      xs: [],
      labels: [],
    };

    for (let i = 0; i < nums.length; i++) {
      const [start, end] = indexHash.training[nums[i]];
      for (let j = 0; j < percentages[i]; j++) {
        dataToReturn.xs.push(trainData.xs[getRandomInt(start, end)]);
        dataToReturn.labels.push(trainData.labels[getRandomInt(start, end)]);
      }
    }
    dataToReturn.xs = convertToImageTensor(dataToReturn.xs);
    dataToReturn.labels = convertToLabelTensor(dataToReturn.labels);
    return dataToReturn;
  };

  const getTestData = (size = 1, nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => {
    const partitions = partitionNum(nums.length);
    const percentages = [];
    let excess = 0;
    for (let j = 0; j < partitions.length; j++) {
      const [start, end] = indexHash.testing[nums[j]];
      const cur = Math.floor((size * partitions[j]) / 100) + excess;
      if (cur > end - start) excess += cur - end + start;
      const part = Math.min(cur, end - start);
      percentages.push(part);
    }
    const dataToReturn = {
      xs: [],
      labels: [],
    };

    for (let i = 0; i < nums.length; i++) {
      const [start, end] = indexHash.testing[nums[i]];
      for (let j = 0; j < percentages[i]; j++) {
        dataToReturn.xs.push(testData.xs[getRandomInt(start, end)]);
        dataToReturn.labels.push(testData.labels[getRandomInt(start, end)]);
      }
    }
    dataToReturn.xs = convertToImageTensor(dataToReturn.xs);
    dataToReturn.labels = convertToLabelTensor(dataToReturn.labels);
    return dataToReturn;
  };

  return {
    isTFReady,
    isDataReady,
    getTrainData,
    getTestData,
    // getTrainDataByNum,
    // getTestDataByNum,
    // convertToImageTensor,
    // convertToLabelTensor,
    // getLabelTensorsByNum,
  };
};

export default useMnistData;
