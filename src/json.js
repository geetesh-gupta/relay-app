import { AsyncStorage } from 'react-native'

export const validateJson = (json) => {
    let validJson;

    try {
        validJson = JSON.stringify(json, null, 2);
    } catch (e) {
        throw e;
    }

    return validJson;
}

export const loadJson = async (key) => {
    const data = await AsyncStorage.getItem(key)
        .then((json) => {
            const data = JSON.parse(json);
            // console.warn(json);
            // console.warn(data);
            return data;
        });
    return data;
}

export const saveJson = async (key, json) => {
    const validJson = validateJson(json)
    if (!validJson) return;
    await AsyncStorage.setItem(key, validJson);
    return validJson;
}
