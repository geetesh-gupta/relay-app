import React, {createContext} from 'react';
import {useState, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';

export const TFContext = createContext({tf: null, isTFReady: false});

export const TFConsumer = TFContext.Consumer;

export const TFProvider = ({children}) => {
  const [isTFReady, setIsTFReady] = useState(false);

  useEffect(() => {
    tf.ready().then(() => {
      setIsTFReady(true);
    });
  }, []);

  return (
    <TFContext.Provider value={{tf, isTFReady}}>{children}</TFContext.Provider>
  );
};
