import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const Sensitivity = () => {
    const [senstivity, setSenstivity] = useState(50);
    const SLIDER_WIDTH = 250;
    const HANDLE_RADIUS = 15;

    // Ref to hold the initial position when gesture starts
    const initialPositionRef = useRef(0);


    const calculateSenstivity = (translationX) => {

        const clampedX = Math.min(Math.max(initialPositionRef.current + translationX, 10), SLIDER_WIDTH);
        return Math.round((clampedX / SLIDER_WIDTH) * 100);
    };

    // Pan gesture handler for senstivity adjustment
    const handlePanGesture = (event) => {
        if (event.nativeEvent.state === State.BEGAN) {
            initialPositionRef.current = (senstivity / 100) * SLIDER_WIDTH;
        } else if (event.nativeEvent.state === State.ACTIVE) {
            const newSenstivity = calculateSenstivity(event.nativeEvent.translationX);
            setSenstivity(newSenstivity);
        } else if (event.nativeEvent.state === State.END) {
            const finalSenstivity = calculateSenstivity(event.nativeEvent.translationX);
            setSenstivity(finalSenstivity);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack} />

                <View style={[styles.senstivityFill, { width: (senstivity / 100) * SLIDER_WIDTH }]} />

                <PanGestureHandler onGestureEvent={handlePanGesture} onHandlerStateChange={handlePanGesture}>
                    <View
                        style={[
                            styles.handle,
                            { transform: [{ translateX: (senstivity / 100) * SLIDER_WIDTH - HANDLE_RADIUS }] },
                        ]}
                    />
                </PanGestureHandler>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        width: 250,
        height: 30,
        justifyContent: 'center',
    },
    sliderTrack: {
        position: 'absolute',
        height: 5,
        width: 250,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    senstivityFill: {
        position: 'absolute',
        height: 5,
        backgroundColor: '#2196f3',
        borderRadius: 5,
    },
    handle: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: '#2196f3',
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff'
    },
});

export default Sensitivity;
