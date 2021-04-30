import React, { useState, useRef } from "react";
import { Box, Paper, TextareaAutosize, Typography, Switch } from '@material-ui/core';
import logo from './images/logo-cognite.png'
import './App.css';

function App() {
  const [userMessages, setUserMessages] = useState([]);
  const [clientMessages] = useState(['Hi..', 'How are you, buddy?']); // Hard coding old chat messages from friend
  const [newMessage, setNewMessage] = useState('');

  const messageInput = useRef(null);
  const [state, setState] = React.useState({
    checkedEnter: true,
  });

  const handleClick = (e) => {
    e.preventDefault();
    submitMessage();
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewMessage(e.target.value)
  }

  const handleToggleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const submitMessage = () => {
    newMessage && setUserMessages(state => [...state, newMessage]);
    messageInput.current.focus(); // setting focus back to the field where user types
    setNewMessage('');
  }

  const getFormatted = (um) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var parser = new DOMParser();

    const result = um.replace(urlRegex, function (url) {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });
    var htmlDoc = parser.parseFromString(result, 'text/html');

    console.log('hd1', htmlDoc);
    return result;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo}
          alt="logo"
          style={{ height: '6rem' }} />


      </header>
      <Typography variant="h4" style={{ textAlign: 'center', color: '#45B8AC', margin: '1rem auto' }}>Cognite Messenger App</Typography>

      <Switch
        checked={state.checkedEnter}
        onChange={handleToggleChange}
        name="checkedEnter"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      Press 'Enter' key to send message

      <div className="Content-container" style={{
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '4px solid #45B8AC'
      }}>


        {clientMessages.length > 0 && (
          <Box style={{
            float: 'left', margin: '1rem', display: 'flex', flexDirection: 'column',
            gap: '1rem',
          }}>

            {clientMessages.map((cm, index) => (

              <Box key={index} style={{ width: 'fit-content' }}>

                <Paper elevation={3} style={{ padding: '0.5rem', border: '2px solid #EFC050' }}
                >
                  <i className="fa fa-user-circle-o" aria-hidden="true" style={{ color: '#EFC050' }}></i>
                  <br></br>
                  {cm}
                </Paper>
              </Box>
            ))}

          </Box>

        )}

        <Box className="User-message-box" style={{

          float: 'right', margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-end'
        }}>
          {userMessages.map((um, index) => (
            <Box key={index} style={{
              width: 'fit-content',
              float: 'right',
              whiteSpace: 'pre'
            }}>
              <Paper elevation={3} style={{
                padding: '0.5rem', border: '2px solid #9B2335',
              }}
              >
                <i className="fa fa-user-circle-o" aria-hidden="true" style={{ color: '#9B2335' }}></i>
                <br></br>
                {<div dangerouslySetInnerHTML={{ __html: `${getFormatted(um)}` }} />}
              </Paper>
            </Box>
          ))}


        </Box>

        <Box style={{ margin: '2rem', }}>


          <TextareaAutosize aria-label="empty textarea" placeholder=""
            onChange={handleChange}
            onKeyPress={(e) => {
              state.checkedEnter && newMessage && e.key === 'Enter' && submitMessage();
            }}
            value={newMessage}
            ref={messageInput}
            style={{

              padding: '0.5rem',
              width: '90%',
              textAlign: 'center',
            }}
          />

          <span onClick={handleClick} style={{
            cursor: 'pointer'
          }}>
            <i className="fa fa-paper-plane" style={{ margin: 'auto 1rem', color: '#45B8AC' }}
              aria-hidden="true">
            </i>
          </span>
        </Box>

      </div>
    </div >
  );
}

export default App;
