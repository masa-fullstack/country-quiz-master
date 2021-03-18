import Image from 'next/image'
import { useEffect, useState } from 'react'
import { randomSort } from '../lib/randomSort'
import useCountry, { Countries, Country } from '../lib/useCountry'
import useQuiz, { Quiz } from '../lib/useQuiz'
import Choice from './Choice'
import Question from './Question'
import Result from './Result'

//type
type Props = {}
type DisplayMode = 'question' | 'answer' | 'result'
type QuizAppState = {
  countCorrect: number
  quiz: Quiz
  question: Country
  choices: Countries
}
export type HandleTryAgain = () => void
export type HandleAnswer = (choice: Country) => void

//Constant
const OPTIONS = ['A', 'B', 'C', 'D']

const initialQuizAppState: QuizAppState = {
  countCorrect: 0,
  quiz: {
    quiz: '',
    answerField: '',
    isImage: false,
  },
  question: {
    flag: '',
    name: '',
    capital: '',
  },
  choices: [
    {
      flag: '',
      name: '',
      capital: '',
    },
    {
      flag: '',
      name: '',
      capital: '',
    },
    {
      flag: '',
      name: '',
      capital: '',
    },
    {
      flag: '',
      name: '',
      capital: '',
    },
  ],
}

const QuizApp: React.FC<Props> = ({ children }) => {
  //state
  const [displayMode, setDisplayMode] = useState<DisplayMode>('result')
  const [quizAppState, setQuizAppState] = useState(initialQuizAppState)

  const createNewQuiz = () => {
    // Quizに使用する４件のデータランダム取得
    const randomFourCountries = randomSort(countries).slice(0, 4)
    // １件目を問題とする
    const newQuestion = randomFourCountries[0]
    // 選択肢をランダムに並び替える
    const newChoices = randomSort(randomFourCountries)
    // Quizの形式をランダムに取得し決定する
    const newQuiz = randomSort(quizMST)[0]

    setQuizAppState((prevState) => {
      return {
        ...prevState,
        quiz: newQuiz,
        question: newQuestion,
        choices: newChoices,
      }
    })
  }

  useEffect(() => {
    // Quizに使用する４件のデータランダム取得
    const randomFourCountries = randomSort(countries).slice(0, 4)
    // １件目を問題とする
    const newQuestion = randomFourCountries[0]
    // 選択肢をランダムに並び替える
    const newChoices = randomSort(randomFourCountries)
    // Quizの形式をランダムに取得し決定する
    const newQuiz = randomSort(quizMST)[0]

    setQuizAppState((prevState) => {
      return {
        ...prevState,
        quiz: newQuiz,
        question: newQuestion,
        choices: newChoices,
      }
    })
  }, [displayMode])

  const handleTryAgain: HandleTryAgain = () => {
    setQuizAppState((prevState) => {
      return { ...prevState, countCorrect: 0 }
    })
    setDisplayMode('question')
  }

  const handleAnswer: HandleAnswer = (choice) => {
    if (choice.name === quizAppState.question.name) {
      //correct
      alert('正解')
    } else {
      //incorrect
      alert('不正解')
    }
    setDisplayMode('answer')
  }

  const { data: quizMST, error: errorQuizMST } = useQuiz()
  const { data: countries, error: errorCountries } = useCountry(
    quizMST ? true : false
  )

  console.log(quizAppState)

  return (
    <div className="relative bg-white rounded-2xl py-16 px-10 sm:w-120 w-full">
      <div className="text-white text-2xl sm:text-3xl font-bold absolute -top-10 sm:-top-16 left-2 ">
        COUNTRY QUIZ
      </div>
      {displayMode !== 'result' && (
        <div>
          <div className="absolute -top-16 right-1">
            <Image
              src="undraw_adventure_4hum_1.svg"
              width={162}
              height={116}
              unoptimized={true}
            />
          </div>
          <Question quiz={quizAppState.quiz} question={quizAppState.question} />
          {quizAppState.choices.map((choice, idx) => {
            return (
              <div key={idx} className="m-5">
                <Choice
                  choice={choice}
                  option={OPTIONS[idx]}
                  handleAnswer={handleAnswer}
                />
              </div>
            )
          })}
        </div>
      )}
      {displayMode === 'answer' && <button>next</button>}
      {displayMode === 'result' && (
        <Result
          countCorrect={quizAppState.countCorrect}
          handleTryAgain={handleTryAgain}
        />
      )}
    </div>
  )
}

export default QuizApp
