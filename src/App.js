
import { useEffect, useState } from 'react';
import './App.css';
import SingleMemo from './components/SingleMemo';



const memoImages = [
  {"src": "/img/book.JPG", matched: false},
  {"src": "/img/cousins.jpg", matched: false},
  {"src": "/img/delish.jpg", matched: false},
  {"src": "/img/sea.JPG", matched: false},
  {"src": "/img/toto.jpg", matched: false},
  {"src": "/img/train.JPG", matched: false}
]

function App() {
  const [memos, setMemos] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  //shuffle cards

  const shuffleMemos = () => {
    const shuffledMemos = [...memoImages, ...memoImages]
      .sort(() =>Math.random() -0.5)
      .map((memo) => ({ ...memo, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)  
    setMemos(shuffledMemos)
    setTurns(0)
  }
  
  // handle a choice
  const handleChoice = (memo) => {
   choiceOne ? setChoiceTwo(memo) : setChoiceOne(memo)
  }

  //compare 2 selected memos

  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
       setMemos(prevMemos => {
        return prevMemos.map(memo => {
          if (memo.src === choiceOne.src) {
            return {...memo, matched: true}
          } else {
            return memo
          }
        })
       })



        resetTurn()
      }else {
        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(memos);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a new game automatically

  useEffect(() => {
    shuffleMemos()
  }, [])


  return (
    <div className="App">
      <h1>Fam Memory Game</h1>
      <button onClick={shuffleMemos}>New Game</button>

      <div className='memo-grid'>
        {memos.map(memo => (
          <SingleMemo 
            key={memo.id} 
            memo={memo}
            handleChoice={handleChoice} 
            flipped={memo === choiceOne || memo === choiceTwo || memo.matched}
            disabled={disabled}
           />
        ))}
      </div>
      <p>Turn {turns}</p>
      <p>Stella Mungai &copy; All Rights Reserved 2023</p>
    </div>
    
  );
}

export default App;
