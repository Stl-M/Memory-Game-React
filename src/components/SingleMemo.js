import './SingleMemo.css'

export default function SingleMemo({memo, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(memo)
        }  
    }

    return (
        <div className='memo'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={memo.src} alt='memo front' />
                <img className='back'
                 src='/img/cover.jpg' 
                 onClick={handleClick}
                 alt='memo back'
                  />
            </div>
      </div>
    )
}