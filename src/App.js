import React from 'react'
import './App.css';
import {Die} from'./Die'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [toggle, setToggle] = React.useState(false)
  
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
    return setToggle(!toggle)
  }

  React.useEffect(() => {
    const timing = setTimeout(() => {
      toggle && setToggle(!toggle)
    }, 3000)

    return () => {
      clearTimeout(timing)
    }
  }, [toggle])

  function winScript () {
    let value = <h1></h1>
    if (tenzies && toggle) {
      value = <h1 className='Check-Win'>Congratulations!</h1>
      return value
    } else if (!tenzies && toggle) {
      value = <h1 className='Check-Lose'>Keep trying!</h1>
      return value
    } else {
      return 
    }
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
    <main className="Main">
      <section className='Intro'>
        <h1>Tenzies!</h1>
        <h3>The Rules are simple!</h3>
        <p>You need to get all ten numbers to be the same. You can hold a numbers value by clicking on the number.</p>
      </section>
      <div className='Game-Container'>
        <div className='Die-Container'>
          {renderDieComponent}
        </div>
        <div className='Button-Container'>
          {tenzies ? <button onClick = {resetGame}>New Game</button> : <button onClick = {randomiseDice}>Roll</button>}
          <button onClick = {checkWin}>Check Win</button>
        </div>
        <div className='Win-Script-Container'>
          {winScript()}
        </div>
      </div>
    </main>
  );
}

export default App;
