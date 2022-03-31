interface GraphQLObject {
  _id: string
}

export type PageURLField = {
  page: string
}

export type PlainTextHTMLField = {
  plainText: string
  html: string
}

export type FilmStub = Pick<Film, '_id' | 'title' | 'image'>

export interface Director extends GraphQLObject {
  lexKey: string
  name: string
  birthYear: number
  deathYear: number
  thumbnail?: { source: string }
  contentURLs: { desktop?: PageURLField; mobile?: PageURLField }
  extract: string
  extractHTML: string
  film: FilmStub
}

export type DirectorStub = Pick<
  Director,
  '_id' | 'name' | 'lexKey' | 'birthYear' | 'deathYear'
>

export interface Film extends GraphQLObject {
  imdbID: string
  title: string
  year: number
  directors: DirectorStub[]
  directorsText: string
  image: string
  plot: string
  wikipedia: {
    url: string
    plotShort: PlainTextHTMLField
    plotFull: PlainTextHTMLField
  }
}

export interface PageContentAsset {
  slug: string
  uri: string
}

export interface PageContent extends GraphQLObject {
  slug: string
  tabTitle: string
  contentTitle: string
  contentSubtitle: string
  assets: PageContentAsset[]
  body: string
}

export type DirectorListItem = Pick<Director, '_id' | 'name' | 'lexKey' | 'birthYear' | 'deathYear' | 'film' | 'thumbnail'>

export type FilmListItem = Pick<Film, '_id' | 'title' | 'year' | 'directorsText' | 'image'> & {
  directors: DirectorStub[]
}

type ObjectResponse<Key extends string, T> = { [key in Key]: T }

type ListResponse<Key extends string, T> = { [key in Key]: T[] }

export type DirectorResponse = ObjectResponse<'director', Director>

export type DirectorListResponse = ListResponse<'directors', DirectorListItem>

export type FilmResponse = ObjectResponse<'film', Film>

export type FilmListResponse = ListResponse<'films', FilmListItem>

export type PageContentResponse = ObjectResponse<'pageContent', PageContent>
