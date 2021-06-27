# Sample messenger application ##

* Mocked old messages to illustrate the messages received from friend. 
* Varied olours of avatars and text box borders to differentiate the messages sent by friend and the user.
* Once the message is sent, it is shown and the box is cleared to facilate user to send fresh messages thereafter.

* Additional: Toggle button that gives an option to user to switch between modes - 
* Press enter to send message or to include new line break, while typing message 

\
&nbsp;
\
&nbsp;

# Implementation ##

* Wrapped all logic in App.js file for simplicity.
* Added dynamic colours to the other users to differentiate between them.
* Once the message is sent, it is shown and the box is cleared to facilate user to send fresh messages thereafter.
* Additional: Toggle button that gives an option to user to switch between modes
* Press enter to send message or to include new line break, while typing message
* Assigned user name with the name 'Supername'
* On initial load, it triggers API GET call to fetch all the messages. Back end API provides them in sorted order based on timestamp. However, logic is written in UI to sort them.
* On sending message, POST API call is triggered to feed the new message. It responds back with the same message, which could be used to display in the history
* Observation: One discrepancy in Back end response: Data type of timestamp is Number in GET API, whereas it is String in POST API. To resolve this, UI code handles the type conversion to show date expected format
* Included background image. Loading indicator(GIF) is shown till all the messages get loaded completely
* Tested in major browsers: Google Chrome, Safari, Edge

* Improvements foreseen: More modularity for API Calls and CSS

# How to run the app in local?

1. clone the repo
2. Execute the command - npm install
3. Execute the command - npm start
4. Check the app in http://localhost:3000/ in browser
