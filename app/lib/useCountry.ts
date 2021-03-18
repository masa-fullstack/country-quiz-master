import useSWR from 'swr'
import countries from '../data/countries.json'

export type Countries = typeof countries
export type Country = Countries[number]

type UseCountry = (
  isFetch: boolean
) => {
  data: null | Countries
  error: any
}

const useCountry: UseCountry = (isFetch) => {
  //isFetchがtrueの場合のみFetchを行う
  const API_URL = isFetch
    ? 'https://restcountries.eu/rest/v2/all?fields=name;capital;flag'
    : null

  const { data, error } = useSWR<Countries, any>(API_URL, {
    // windowのフォーカス時にRevalidateしないように設定
    revalidateOnFocus: false,
  })

  //全ての項目が存在するものだけ使用する
  const activeData = data?.filter((dat) => dat.capital && dat.flag && dat.name)

  return {
    data: activeData,
    error,
  }
}

export default useCountry
