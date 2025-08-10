# S4Labour Tech Test

## Core Requirements Based off Spec

- [x] **Task Management**  
  - [x] Users can add new tasks  
  - [x] Mark tasks as complete/incomplete  
  - [x] Delete tasks  

- [x] **Task Organisation**  
  - [x] Implement filtering: "All", "Active", "Completed"  

- [x] **Persistent Storage**  
  - [x] Tasks persist between app sessions (using AsyncStorage or similar)  

- [x] **User Experience**  
  - [x] Clean, intuitive interface  
  - [x] Proper loading states  
  - [x] Form validation  
----

## Thought Process

I really enjoyed this task. A typical task manager usually has a title, a short description of what needs doing, an expected completion date, and a priority level – all displayed on a card.

We’ll have tab buttons to switch between different views, e.g. Active, In Progress, and Completed Tasks. Since this will be a list of cards, we’ll use a FlatList instead of .map(), as it’s optimised for mobile rendering. FlatList only renders the items currently on screen (plus a small buffer) rather than the entire list at once.

We’ll create some components in isolation:

Tabbed component – switches between Active, In Progress, and Completed cards.

Header component – displays the title for each screen. I’m making a custom header so I can style it exactly how I want.

Card component – shows all the task information. This card should be swipeable left or right to either mark a task as complete or delete it. The card should have a color as a side bar to distinguish the task progress instantly too.

Above components will be unit tested to ensure they function as they should.

## Areas for Improvement / Points of Concern
Currently, tasks are set to “In Progress” by default. Instead, new tasks should default to “To Do”, allowing the user to move them into “In Progress” or “Completed” as needed.

Users should also be able to edit tasks in the early stages – for example, updating the priority, adding more detail to the description, and so on.

A confirmation/deletion modal should be shown to prevent accidental deletions or completions. In addition, when an action like deletion or completion does occur, a snackbar should appear to confirm it (e.g. “Task deleted” or “Task completed”), with an Undo button to reverse the action while the snackbar is still visible. Also prevent creation of empty or duplicate tasks, and provide clear inline error messages.

##  Screenshot

<img width="733" height="753" alt="Screenshot 2025-08-08 at 23 13 10" src="https://github.com/user-attachments/assets/07ad18f5-4cc4-4ef6-9777-26e852484269" />


## Installation
run `npm install` on the root of the directory.

## To Run

Either have the IOS or Android emulator before hand or download the Expo app installed on your physical device.

### 📱 Run on a Physical Device
1. Run `npm start` in your terminal.
2. Install the **Expo Go** app from the Google Play Store or Apple App Store.
3. Open **Expo Go** and scan the QR code shown in your terminal.

---

### 💻 Run on a Simulator
1. Start your iOS and/or Android simulator.
2. Run `npm start` in your terminal.
3. Follow the on-screen instructions, for example:
   - Press **i** to open the iOS simulator.
   - Press **a** to open the Android simulator.
----

### Run unit tests
```npm run test```
----
