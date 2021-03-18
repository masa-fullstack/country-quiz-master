import useSWR from 'swr'
import quizMST from '../data/quizMST.json'

export type Quizzes = typeof quizMST
export type Quiz = Quizzes[number]

type UseQuiz = () => {
  data: null | Quizzes
  error: any
}

const useQuiz: UseQuiz = () => {
  const { data, error } = useSWR('/api/quiz', {
    // windowのフォーカス時にRevalidateしないように設定
    revalidateOnFocus: false,
  })

  return {
    data,
    error,
  }
}

export default useQuiz
