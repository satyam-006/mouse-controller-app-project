import React, { useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Sensitivity from './Senstivity';
import { IP_ADDRESS, PORT } from "@env";

const MouseController = () => {
    const ws = useRef(null);
    const cursorPositionRef = useRef({ x: 0, y: 0 });
    const lastMoveTimeRef = useRef(0);
    const throttleLimit = 100;

    useEffect(() => {
        // Initialize WebSocket connection
        try {
            ws.current = new WebSocket(`ws://${IP_ADDRESS}:${PORT}`);

            ws.current.onopen = () => {
                console.log("Connected to the WebSocket server");
            };

            ws.current.onclose = () => {
                console.log("Disconnected from the WebSocket server");
            };

            ws.current.onerror = (error) => {
                console.log("WebSocket error:", error.message);
            };
        } catch (error) {
            console.log("Error in WebSocket connection:", error);
        }

        return () => {
            // Close WebSocket when the component unmounts
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    // Send data to the server
    const sendData = (action, payload = {}) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ action, ...payload }));
        } else {
            console.log("WebSocket is not connected");
        }
    };

    // Mouse control functions
    const handleLeftClick = () => {
        sendData("click");
    };

    const handleRightClick = () => {
        sendData("right_click");
    };

    const handleBackward = () => {
        sendData("press_backward");
    };

    const handlePlaypause = () => {
        sendData("press_play_pause");
    };

    const handleForward = () => {
        sendData("press_forward");
    };

    // Debounced pan gesture handler
    const handlePanGesture = useCallback((event) => {
        const { translationX, translationY } = event.nativeEvent;
        const now = Date.now();
        if (now - lastMoveTimeRef.current < throttleLimit) return;
        lastMoveTimeRef.current = now;

        cursorPositionRef.current = {
            x: cursorPositionRef.current.x + translationX,
            y: cursorPositionRef.current.y + translationY,
        };

        sendData("move", cursorPositionRef.current);
    }, []);

    const handlePanEnd = () => {
        sendData("move", cursorPositionRef.current);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.senstivityContaniner}>
                <Text style={[styles.text, styles.sensText]}>Sensitivity:</Text>
                <Sensitivity />
            </View>
            <View>
                <PanGestureHandler onGestureEvent={handlePanGesture} onEnded={handlePanEnd}>
                    <View style={styles.pan}>
                        <Text style={styles.text}>Drag to Move</Text>
                    </View>
                </PanGestureHandler>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLeftClick} style={styles.button}>
                        <Text style={styles.text}>Left Click</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRightClick} style={styles.button}>
                        <Text style={styles.text}>Right Click</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mediaContanier}>
                <TouchableOpacity style={styles.mediaBtn} onPress={handleBackward}>
                    <AntDesign name='stepbackward' size={20} style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaBtn} onPress={handlePlaypause}>
                    <AntDesign name='playcircleo' size={20} style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaBtn} onPress={handleForward}>
                    <AntDesign name='stepforward' size={20} style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }} />
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
        flexDirection: 'column',
    },
    senstivityContaniner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    pan: {
        width: 350,
        height: 250,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonContainer: {
        width: 350,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
    },
    button: {
        width: 170,
        height: 50,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    },
    mediaContanier: {
        width: 350,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sensText: {
        color: '#2196f3',
    },
    mediaBtn: {
        width: 80,
        backgroundColor: '#2196f3',
        paddingVertical: 10,
        margin: 'auto',
        borderRadius: 5,
    },
});

export default MouseController;


