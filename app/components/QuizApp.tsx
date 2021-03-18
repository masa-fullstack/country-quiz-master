import Image from 'next/image'
import { useEffect, useState } from 'react'
import { randomSort } from '../lib/randomSort'
import useCountry, { Countries, Country } from '../lib/useCountry'
import useQuiz, { Quiz } from '../lib/useQuiz'
import Choice, { Color } from './Choice'
import Question from './Question'
import Result from './Result'

//Constant
const OPTIONS = ['A', 'B', 'C', 'D'] as const

//type
type DisplayMode = 'question' | 'answer' | 'result'
type QuizAppState = {
  quiz: Quiz
  question: Country
  choices: Countries
}
type CreateNewQuiz = () => void
export type Option = typeof OPTIONS[number]
export type HandleTryAgain = () => void
export type HandleAnswer = (choice: Country, option: Option) => void

//initial value
const initialCountry: Country = {
  flag: '',
  name: '',
  capital: '',
}
const initialQuizAppState: QuizAppState = {
  quiz: {
    quiz: '',
    answerField: '',
    isImage: false,
  },
  question: initialCountry,
  choices: [initialCountry, initialCountry, initialCountry, initialCountry],
}

const QuizApp: React.FC = () => {
  //state
  const [displayMode, setDisplayMode] = useState<DisplayMode>('result')
  const [isInCorrect, setIsInCorrect] = useState(false)
  const [countCorrect, setCountCorrect] = useState(0)
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [quizAppState, setQuizAppState] = useState<QuizAppState>(
    initialQuizAppState
  )

  const createNewQuiz: CreateNewQuiz = () => {
    if (countries) {
      // Quizに使用する４件のデータランダム取得
      const randomFourCountries = randomSort(countries).slice(0, 4)
      // １件目を問題とする
      const newQuestion = randomFourCountries[0]
      // 選択肢をランダムに並び替え、ChoiceTypeにする（答えにはisCorrectをtrueにしておく）
      const newChoices = randomSort(randomFourCountries)
      // Quizの形式をランダムに取得し決定する
      const newQuiz = randomSort(quizMST)[0]

      setQuizAppState({
        quiz: newQuiz,
        question: newQuestion,
        choices: newChoices,
      })
    }
  }

  useEffect(() => {
    createNewQuiz()
  }, [])

  const handleTryAgain: HandleTryAgain = () => {
    setCountCorrect(0)
    setIsInCorrect(false)
    setSelectedOption(null)
    createNewQuiz()
    setDisplayMode('question')
  }

  const handleAnswer: HandleAnswer = (choice, option) => {
    if (choice.name === quizAppState.question.name) {
      //correct
      setCountCorrect((prevState) => prevState + 1)
    } else {
      //incorrect
      setIsInCorrect(true)
    }

    setSelectedOption(option)
    setDisplayMode('answer')
  }

  const handleNext = () => {
    if (isInCorrect) {
      setDisplayMode('result')
    } else {
      createNewQuiz()
      setDisplayMode('question')
    }
  }

  const { data: quizMST, error: errorQuizMST } = useQuiz()
  const { data: countries, error: errorCountries } = useCountry(
    quizMST ? true : false
  )

  if (errorQuizMST || errorCountries)
    return (
      <div className="text-red-500 text-3xl font-light text-center mt-40">
        failed to load
      </div>
    )

  if (!countries)
    return (
      <div className="text-gray-500 text-3xl font-light text-center mt-40">
        loading...
      </div>
    )

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
            let color: Color = null
            if (displayMode === 'answer') {
              //correct
              if (choice.name === quizAppState.question.name) {
                color = 'correct'
              } else if (OPTIONS[idx] === selectedOption) {
                color = 'inCorrect'
              }
            }
            return (
              <div key={idx} className="m-5">
                <Choice
                  choice={choice}
                  option={OPTIONS[idx]}
                  handleAnswer={handleAnswer}
                  disabled={displayMode === 'answer' ? true : false}
                  color={color}
                />
              </div>
            )
          })}
        </div>
      )}
      {displayMode === 'answer' && (
        <div className="flex justify-end">
          <button
            className="focus:outline-none shadow-lg rounded-lg bg-yellow-500 text-white font-semibold py-4 px-9"
            onClick={() => handleNext()}
          >
            next
          </button>
        </div>
      )}
      {displayMode === 'result' && (
        <Result countCorrect={countCorrect} handleTryAgain={handleTryAgain} />
      )}
    </div>
  )
}

export default QuizApp
