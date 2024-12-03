# React Native Character Picker

A React Native application that allows users to search and select characters from an API, displaying information such as their episodes. This app uses various libraries and tools to provide a seamless user experience.

## Features
- **Character Search**: Allows users to search characters by typing their names.
- **Multi-Select**: Users can select multiple characters, and the app will display selected characters.
- **Episode Information**: Clicking on a character shows a list of episodes they appear in.

## Tech Stack
- **React Native**: A framework for building native mobile apps using JavaScript and React.
- **Expo Router**: A tool for managing routing in Expo projects with a file-system-based routing approach.
- **React Query**: For data fetching and caching to manage API requests efficiently.
- **Expo Checkbox**: A custom checkbox component for multi-select functionality.
- **React Context (Custom Store)**: Used to manage the state of selected characters across components.
- **Modal**: Display a modal with episode details when a character is selected.
- **ActivityIndicator**: Display a loading spinner while fetching data.

## Libraries and Tools

### 1. **React Native**  
A framework for building native apps using React. This app is built using React Native to ensure a native performance on both iOS and Android devices.

### 2. **Expo Router**  
Expo Router is used to handle navigation within the app, simplifying the routing logic by providing a file-based routing system. It makes managing routes much easier in large React Native applications.

### 3. **React Query**  
React Query is used to fetch, cache, and synchronize data from APIs. It simplifies the management of server-state and ensures efficient data fetching.

### 4. **Expo Checkbox**  
The app uses the `expo-checkbox` library to handle multi-selection for characters. The checkbox component is used to mark the selected characters from the list.

### 5. **React Context (useMultiSelectStore)**  
Custom React Context (via a store) is used to manage the state of selected characters across different components. It provides a global state for the app that can be accessed and modified by any component.

### 6. **Modal**  
A modal component is used to display detailed information (such as episodes) about a selected character. When a user clicks on a character, the modal appears, showing the list of episodes.

### 7. **ActivityIndicator**  
The `ActivityIndicator` component from React Native is used to display a loading spinner while the app is fetching character data from the API.

### 8. **Image**  
The app displays character images using React Native's `Image` component, which loads character photos from a URL.

### 9. **FlatList**  
The `FlatList` component is used to render lists of characters and episodes efficiently. It supports scrolling and rendering only the visible items to improve performance.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/rn-character-picker.git
