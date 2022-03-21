export type StackParamList = {
  Films: undefined
  Film: { id: string }
  Directors: undefined
  Director: { id: string }
}

export type LinkToType = {
  screen: string
  params: { [key: string]: string | number }
}
