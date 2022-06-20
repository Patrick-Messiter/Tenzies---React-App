import React from 'react'
import './App.css';
import {Die} from'./Die'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [checkWinState, setCheckWinState] = React.useState(false)
  
  React.useEffect(() => {
    let array = []
    let firstValue = dice[0].value
    
    dice.map(currentDice => {
      if (currentDice.isHeld === true && currentDice.value === firstValue) {
        array.push(currentDice.value)
      }
    })

    if (array.length === 10) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    let dieArray = [];
    for (let x = 0; x < 10; x++){
      dieArray.push({value: Math.ceil(Math.random() * 6), isHeld: false, id: x})
    }
    return dieArray
  }

  function resetGame() {
    setDice(allNewDice)
    setTenzies(false)
  }

  function checkWin() {
    return tenzies ? setCheckWinState(true): setCheckWinState(false)
  }

  function randomiseDice () {
    setDice(prevState => {
      return prevState.map(currentDice => {
        return currentDice.isHeld ? currentDice : {...currentDice, value: Math.ceil(Math.random() * 6)}
      })
    })
  }

  function holdDice(id) {
    setDice(prevState => {
      return prevState.map(currentDice => {
        return currentDice.id === id ? {...currentDice, isHeld: !currentDice.isHeld} : currentDice
      })
    })
  }

  const renderDieComponent = dice.map(currentDice=> {
    return <Die key = {currentDice.id} value = {currentDice.value} isHeld = {currentDice.isHeld} holdDice = {() => holdDice(currentDice.id)} />
  })

  return (
    <main className="App">
      <div className='Container'>
        {renderDieComponent}
      </div>
      {tenzies ? <button onClick = {resetGame}>New Game</button> : <button onClick = {randomiseDice}>Roll</button>}
      <button onClick = {checkWin}>Check Win</button> 
      {checkWinState ? <h1>Congratulations YOU WON!</h1> : <h1>Keep trying!</h1>}
    </main>
  );
}

export default App;
