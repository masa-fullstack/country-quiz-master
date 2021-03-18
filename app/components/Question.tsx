import Image from 'next/image'
import { Country } from '../lib/useCountry'
import { Quiz } from '../lib/useQuiz'

type Props = {
  quiz: Quiz
  question: Country
}

const Question: React.FC<Props> = ({ quiz, question }) => {
  let questionString = quiz.quiz
  if (questionString.includes('{')) {
    const replaceString = questionString.substring(
      questionString.indexOf('{'),
      questionString.indexOf('}') + 1
    )
    const fieldName = replaceString.substr(1, replaceString.length - 2)
    questionString = questionString.replace(replaceString, question[fieldName])
  }

  return (
    <>
      {quiz.isImage && (
        <div className="shadow-lg w-20 h-12 mb-3">
          <Image
            src={question.flag}
            width={80}
            height={56}
            unoptimized={true}
          />
        </div>
      )}
      <div className="text-2xl font-bold text-purple-800">{questionString}</div>
    </>
  )
}

export default Question
