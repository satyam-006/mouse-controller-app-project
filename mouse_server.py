import asyncio
import websockets
import pyautogui
import json

import os
from dotenv import load_dotenv

load_dotenv()

IP_ADDRESS = os.getenv('IP_ADDRESS')
PORT = os.getenv("PORT")

pyautogui.FAILSAFE = False

async def handle_client(websocket):
    print("Client connected")
    try:
        async for message in websocket:
            try:
                # Parse the JSON message
                data = json.loads(message)
                action = data.get("action")

                # Perform actions based on the received data
                if action == "move":
                    x = data.get("x", 0)
                    y = data.get("y", 0)
                    print("Quardinates:",x,y)
                    # Ensuring the coordinates are within the screen bounds
                    screen_width, screen_height = pyautogui.size()
                    x = max(0, min(x, screen_width - 1))
                    y = max(0, min(y, screen_height - 1))
                    pyautogui.moveTo(x, y)  

                elif action == "click":
                    pyautogui.click()

                elif action == "right_click":
                    pyautogui.rightClick()

                elif action == "scroll":
                    pyautogui.scroll(data.get("amount", 0))
                    
                elif action == "press_backward":
                     pyautogui.hotkey('ctrl', 'b')
                    
                elif action == "press_play_pause":
                    pyautogui.hotkey('ctrl', 'p')
                    
                elif action == "press_forward":
                    pyautogui.hotkey('ctrl', 'f')

            except json.JSONDecodeError:
                print("Error decoding JSON message")
            except Exception as e:
                print(f"Error during action '{action}': {e}")

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")

async def main():
    print("Server is starting...")
    # Start the server on the specified IP and port
    async with websockets.serve(handle_client, IP_ADDRESS, PORT):
        print(f"Server is running on ws://{IP_ADDRESS}:{PORT}")
        await asyncio.Future()  # Keeps the server running

# Run the main function
if __name__ == "__main__":
    asyncio.run(main())
