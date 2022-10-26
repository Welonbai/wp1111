import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') {
      setHasWon(true)
      console.log('success')
    } else {
      setStatus(response)
      setNumber('')
    }
  }
  
  const startMenu =
    <div> <button onClick={
      // someFunctionToBackend; and setHasStarted
      async () => {
        setHasStarted(true)
        await startGame()
      }
      }> start game </button>
    </div>


  const handleChange = (event) => {
    //setMessage(event.target.value);
    setNumber(event.target.value)
  }

  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input 
      onChange={handleChange}
      // Get the value from input
      ></input>
      <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status}</p>
    </>

  const winningMode = (
    <>
    <p>you won! the number was {number}.</p>
    <button 
    onClick={
      async () => {
        setHasWon(false)
        setStatus('')
        await restart()
      }
    }
    // Handle restart for backend and frontend
    >restart</button>
    </>
  )

  const game =
  <div>
    {hasWon ? winningMode : gameMode} 
  </div>

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
