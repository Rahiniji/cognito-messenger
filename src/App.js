import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextareaAutosize,
  Typography,
  Switch,
} from "@material-ui/core";
import { currentAuthorName, apiToken } from "./constants/messengerConstants";
import logo from "./images/doodle-logo.png";
import background from "./images/background.png";
import loadingImage from "./images/loading-indicator.gif";
import "./App.css";

function App() {
  const userName = currentAuthorName;

  const [totalMessages, setTotalMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messageInput = useRef(null);
  const [state, setState] = React.useState({
    checkedEnter: true,
  });

  useEffect(() => {
    if (totalMessages.length === 0) getMessages();
  }, [totalMessages]);


  const getMessages = async () => {
    try {
      const listOfMessages = await fetch(
        `https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=${apiToken}`
      ).then((response) => response.json());

      if (listOfMessages?.length > 0) {
        const sortedMessages = listOfMessages.sort(function (x, y) {
          return x.timestamp - y.timestamp;
        });
        setTotalMessages(sortedMessages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitMessage = async () => {
    try {
      const sendData = JSON.stringify({
        message: newMessage,
        author: userName,
      });

      const sendResponse = await fetch(
        "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token: apiToken },
          body: sendData,
        }
      ).then((response) => response.json());

      if (sendResponse?._id) {
        // alter timestamp to match the type coming in response
        const alteredResponse = {
          ...sendResponse,
          timestamp: parseInt(sendResponse.timestamp)
        }

        setTotalMessages([...totalMessages, alteredResponse]);
        setNewMessage("");
        messageInput.current.focus(); // setting focus back to the field where user types
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        console.log("send api error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // to get dynamic colors to differentiate multiple users
  function hashCode(str) {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function pickColor(str) {
    return `hsl(${hashCode(str) % 360}, 100%, 80%)`;
  }

  const handleClick = (e) => {
    e.preventDefault();
    newMessage && newMessage.trim() && submitMessage();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  const handleToggleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" style={{ height: "6rem" }} />
      </header>
      <Typography
        variant="h4"
        style={{ textAlign: "center", color: "#45B8AC", margin: "1rem auto" }}
      >
        Messenger
      </Typography>
      <Switch
        checked={state.checkedEnter}
        onChange={handleToggleChange}
        name="checkedEnter"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      Press 'Enter' key to send message
      <div
        className="content-container"
        style={{
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          border: "4px solid #45B8AC",
          backgroundImage: `url('${background}')`,
        }}
      >
        {totalMessages?.length > 0 ? (
          <Box
            style={{
              float: "left",
              margin: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {totalMessages.map((tm, index) => (
              <Box
                className="User-message-box"
                style={{
                  margin: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  alignItems:
                    tm.author === currentAuthorName ? "flex-end" : "unset",
                }}
                key={index}
              >
                {(
                  <Box key={index} style={{ width: "fit-content", whiteSpace: "pre", }}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "0.5rem",
                        border: tm.author === currentAuthorName ? '2px solid #45B8AC' : `2px solid ${pickColor(tm.author)}`,
                        background: tm.author === currentAuthorName ? '#faf2bf' : `#ffffff`,
                      }}
                    >


                      <Box style={{ color: "#949ba2", fontSize: "0.8rem" }}>
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                          style={{ color: tm.author === currentAuthorName ? '#45B8AC' : `${pickColor(tm.author)}`, marginRight: '0.5rem' }}
                        ></i>{tm.author}
                      </Box>
                      <Box style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                        {unescape(tm.message)}
                      </Box>
                      <Box style={{ color: "#949ba2", fontSize: "0.8rem" }}>
                        {new Date(tm.timestamp).toString().slice(4, 21)}
                      </Box>
                    </Paper>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ) : (<img src={loadingImage} alt="Loading messages. Kindly wait..."></img>)}



        <Box style={{ margin: "2rem" }}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder=""
            onChange={handleChange}
            onKeyPress={(e) => {
              if (state.checkedEnter && e.key === "Enter") {
                e.preventDefault();
                newMessage &&
                  newMessage.trim() &&
                  submitMessage();
              }
            }}
            value={newMessage}
            ref={messageInput}
            style={{
              padding: "0.5rem",
              width: "90%",
              textAlign: "center",
              fontFamily: "sans-serif"
            }}
          />

          <span
            onClick={handleClick}
            style={{
              cursor: "pointer",
            }}
          >
            <i
              className="fa fa-paper-plane fa-lg"
              style={{ margin: "auto 1rem", color: "#45B8AC" }}
              aria-hidden="true"
            ></i>
          </span>
        </Box>
      </div>
    </div>
  );
}

export default App;
