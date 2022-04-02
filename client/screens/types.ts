type ContentPageSlug = 'about'

export type StackParamList = {
  Films: undefined
  Film: { id: string }
  Directors: undefined
  Director: { id: string }
  ContentPage: { slug: ContentPageSlug }
}

export type LinkToType = {
  screen: string
  params: { [key: string]: string | number }
}
