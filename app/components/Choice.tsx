import { Country } from '../lib/useCountry'
import { HandleAnswer, Option } from './QuizApp'

export type Color = 'correct' | 'inCorrect'

type Props = {
  choice: Country
  option: Option
  handleAnswer: HandleAnswer
  disabled: boolean
  color?: Color
}

const Choice: React.FC<Props> = (props) => {
  let editClassName = ''
  if (!props.color) {
    editClassName += ' border-purple-600 text-purple-600'
  } else if (props.color === 'inCorrect') {
    editClassName += ' bg-red-300 text-white'
  } else if (props.color === 'correct') {
    editClassName += ' bg-green-400 text-white'
  }

  if (props.disabled) {
    editClassName += ' cursor-default'
  }

  return (
    <button
      className={`focus:outline-none border rounded-2xl max-w-sm h-14 flex items-center w-full  ${editClassName}`}
      onClick={() => props.handleAnswer(props.choice, props.option)}
      disabled={props.disabled}
    >
      <div className="px-4 text-2xl">{props.option}</div>
      <div className="">{props.choice.name}</div>

      {props.color === 'correct' && (
        <div className="material-icons ml-auto mr-4">check_circle_outline</div>
      )}
      {props.color === 'inCorrect' && (
        <div className="material-icons ml-auto mr-4">highlight_off</div>
      )}
    </button>
  )
}

export default Choice
