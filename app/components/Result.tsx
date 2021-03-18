import Image from 'next/image'
import { HandleTryAgain } from './QuizApp'

//type
type Props = {
  countCorrect: number
  handleTryAgain: HandleTryAgain
}

const Result: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="undraw_winners_ao2o_2.svg"
        width={238}
        height={129}
        unoptimized={true}
      />
      <div className="text-5xl font-semibold mt-16 mb-4">Results</div>
      <div className="mb-14 font-light">
        You got{' '}
        <span className="text-3xl font-bold text-green-400 mx-1">
          {props.countCorrect}
        </span>
        correct answers
      </div>
      <button
        className="focus:outline-none text-lg border-2 border-gray-600 rounded-xl py-4 px-14"
        onClick={() => props.handleTryAgain()}
      >
        Try again
      </button>
    </div>
  )
}

export default Result
