# Mouse Controller

This project is a **Mouse Controller** app built with **React Native** that allows users to control the cursor on their computer remotely. The app includes a virtual touchpad, left and right click buttons, as well as functionalities for playing, pausing, and moving through media on the connected system.

## Features

- **Cursor Control**: Control the cursor position using a draggable touch area.
- **Left & Right Click**: Trigger left and right mouse clicks.
- **Scroll Control**: Smooth scrolling functionality.
- **Media Controls**: Play, pause, and navigate to the next/previous media on the connected system.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)

## Requirements

- **React Native** environment set up on your development machine.
- **Node.js** and **npm** (or **yarn**) installed.
- **Python** and `pyautogui` library on the server system to handle mouse actions.
- **WebSocket** server running to handle messages from the app.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/satyam-006/mouse-controller.git

   cd mouse-controller

   npm install
   
   npm install react-native-gesture

   npm install react-native-dotenv

   pip install pyautogui

   python server.py

   npm start

   npx react-native run-android

   npx react-native run-ios


   ```