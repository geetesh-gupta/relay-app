import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    ScrollView,
    AppState,
    FlatList,
    Dimensions,
    // Button,
    SafeAreaView
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { stringToBytes, bytesToString } from 'convert-string';

const window = Dimensions.get('window');
import { Buffer } from 'buffer'

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import FormView from './components/FormView';
import { Button } from './components/Button';
import FormColeredTextField from './components/FormColoredTextField';
import { CardHeader } from './components/CardHeader';
import { FormButton } from './components/FormButton';
import { CardSection } from './components/CardSection';
import { Card } from './components/Card';
import { saveJson, loadJson } from './json';
import { getWSService } from './services/WebSocket';


export default class App extends Component {
    constructor() {
        super()

        this.state = {
            scanning: false,
            peripherals: new Map(),
            appState: '',
            selectedDevice: {},
            receivedMsg: {},
            socketConnection: null
        }

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        BleManager.start({ showAlert: false });

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);


        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

        //Initiate the WebSocket connection for the user
        if (!this.state.socketConnection)
            this.setState({ socketConnection: getWSService() });
    }

    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log('Connected peripherals: ' + peripheralsArray.length);
            });
        }
        this.setState({ appState: nextAppState });
    }

    componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerUpdate.remove();
    }

    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals, selectedDevice: {} });
        }
    }

    handleUpdateValueForCharacteristic(data) {
        console.log('Received data "' + bytesToString(data.value) + '" from ' + data.peripheral.name);
    }

    handleStopScan() {
        console.log('Scan is stopped');
        this.setState({ scanning: false });
    }

    startScan() {
        if (!this.state.scanning) {
            BleManager.scan([], 3, true).then((results) => {
                console.log('Scanning...');
                this.setState({ scanning: true });
            });
        }
    }

    retrieveConnected() {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            var peripherals = this.state.peripherals;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                this.setState({ peripherals });
            }
        });
    }

    handleDiscoverPeripheral(peripheral) {
        var peripherals = this.state.peripherals;
        // if (!peripheral.name) {
        //     peripheral.name = 'NO NAME';
        // }
        if (peripheral.name) {
            peripherals.set(peripheral.id, peripheral);
        }
        this.setState({ peripherals });
    }

    loadSaveJson = async (key, json) => {
        loadJson(key).then((data) => {
            var parsedData = []
            if (data)
                parsedData = JSON.parse(data)
            parsedData.push(json)
            saveJson("students", JSON.stringify(parsedData)).then(() => {
                console.log("Saved successfully");
                loadJson("students").then((data) => {
                    parsedData = JSON.parse(data)
                    console.log(parsedData)
                })
            })
        })
    }

    send = (msg = "Test Object, 20, B17CS024, IIT Jodhpur") => {
        peripheral = this.state.selectedDevice
        // setTimeout(() => {
        // BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
        // console.log(peripheralInfo);
        var service = '13333333-3333-3333-3333-333333333337';
        var sendCharacterstic = '13333333-3333-3333-3333-333333330001';
        var msgSplit = msg.split(',');
        var jsonData = {
            "name": msgSplit[0],
            "age": parseInt(msgSplit[1], 10),
            "rollno": msgSplit[2],
            "college": msgSplit[3],
        }
        this.loadSaveJson("students", jsonData)
        const jsonString = JSON.stringify(jsonData)
        const sendData = stringToBytes(jsonString);
        BleManager.write(peripheral.id, service, sendCharacterstic, sendData).then((data) => {
            BleManager.write(peripheral.id, service, sendCharacterstic, stringToBytes("FIN")).then((data) => {
                console.log('Send data', jsonString, "to", peripheral.name);
                console.warn("Sent: " + jsonString);
            });
        });
        // });
        // }, 900);
    }

    sendDataToServer = (msg = "Hello World!") => {
        //Add a timeout to allow WebSocket connection to open
        setTimeout(() => {
            if (this.state.socketConnection) {
                this.state.socketConnection.sendMessage("sendmessage", msg);
            }
        }, 2000);
    }

    receive = () => {
        peripheral = this.state.selectedDevice
        // setTimeout(() => {
        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
            var service = '13333333-3333-3333-3333-333333333337';
            var receiveCharacterstic = '13333333-3333-3333-3333-333333330001';
            BleManager.read(peripheral.id, service, receiveCharacterstic).then((data) => {
                var receivedData = bytesToString(data);
                receivedData = JSON.parse(receivedData)
                this.loadSaveJson("students", receivedData)
                console.log('Received', receivedData, "from", peripheral.name);
                ``
                this.setState({
                    receivedMsg: receivedData
                })
            });
        });
        // }, 900);
    }

    disconnectDevice = (peripheral) => {
        if (peripheral) {
            if (peripheral.connected) {
                BleManager.disconnect(peripheral.id).then(() => {
                    console.log("Disconnected from " + peripheral.name)
                });
            }
        }
    }

    selectDevice = (peripheral) => {
        if (peripheral) {
            if (!peripheral.connected) {
                BleManager.connect(peripheral.id).then(() => {
                    let peripherals = this.state.peripherals;
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        this.setState({ peripherals });
                    }
                }).catch((error) => {
                    console.log('Connection error', error);
                });
            }
            this.setState({
                selectedDevice: peripheral
            })
            console.log("Connected to: " + peripheral.name)
        }
    }

    renderItem(item) {
        var style = undefined;
        if (!item.connected) {
            style = {
                touchableStyle: { backgroundColor: "grey" },
                textStyle: { color: 'white' }
            };
        } else {
            if (item == this.state.selectedDevice) {
                style = {
                    touchableStyle: { backgroundColor: "green", borderColor: 'black', borderWidth: 4 },
                    textStyle: { color: 'white' }
                };
            } else {
                style = {
                    touchableStyle: { backgroundColor: "green" },
                    textStyle: { color: 'white' }
                };
            }
        }
        return (
            <Button
                onPress={() => this.selectDevice(item)}
                onLongPress={() => this.disconnectDevice(item)}
                title={`${item.name}`}
                style={style} />
        );
    }

    render() {
        const list = Array.from(this.state.peripherals.values());
        const btnScanTitle = 'Scan Bluetooth (' + (this.state.scanning ? 'on' : 'off') + ')';
        const selectedDevice = this.state.selectedDevice;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={{ margin: 10 }}>
                        <Button title={btnScanTitle} onPress={() => {
                            this.startScan();
                            this.retrieveConnected();
                        }} />
                    </View>

                    <View style={{ margin: 10 }}>
                        <Button title="Retrieve connected peripherals" onPress={() => this.retrieveConnected()} />
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scroll}>
                        {(list.length == 0) &&
                            <View style={{ flex: 1, margin: 20 }}>
                                <Text style={{ textAlign: 'center' }}>No peripherals</Text>
                            </View>
                        }
                        <FlatList
                            data={list}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={item => item.id}
                        />
                    </ScrollView>
                    <FormView>
                        <CardHeader headerText={"Server Side Connections"} />
                        <FormColeredTextField
                            placeholder="Enter Msg..." onChangeText={(text) => this.setState({ msg: text })}
                            title="Send Msg to Server" />
                        <FormButton title="Send" onFormSubmit={() => this.sendDataToServer(this.state.msg)} />
                    </FormView>

                    <FormView>
                        <CardHeader headerText={`Selected ${selectedDevice.name}`} />
                        {
                            selectedDevice.name != undefined &&
                            <View>
                                <FormColeredTextField placeholder="Enter Msg..."
                                    onChangeText={(text) => this.setState({ msg: text })}
                                    title="Send Msg" />
                                <FormButton title="Send" onFormSubmit={() => this.send(this.state.msg)} />
                                <FormButton title="Receive" onFormSubmit={() => this.receive()} />
                                {Object.keys(this.state.receivedMsg).length != 0 &&
                                    <Card>
                                        <CardHeader headerText={`Received Data:`} />
                                        <CardSection>
                                            <Text>Name: {this.state.receivedMsg.name}</Text>
                                        </CardSection>
                                        <CardSection>
                                            <Text>Age: {this.state.receivedMsg.age}</Text>
                                        </CardSection>
                                        <CardSection>
                                            <Text>Roll No: {this.state.receivedMsg.rollno}</Text>
                                        </CardSection>
                                        <CardSection>
                                            <Text>College: {this.state.receivedMsg.college}</Text>
                                        </CardSection>
                                    </Card>
                                }
                            </View>
                        }
                    </FormView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        // width: window.width,
        // height: window.height
    },
    scroll: {
        flex: 1,
        margin: 10,
    },
    row: {
        margin: 10
    },
});