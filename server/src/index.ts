import { Director, Film, PageContent } from '@uncanon/types'
import apicache from 'apicache'
import bodyParser from 'body-parser'
import cors from 'cors'
import crypto from 'crypto'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import db, { OrderBy } from './data/store'
import lexObject from './lexObject'

// import seed from './data/seed'
// await seed({
//   reset: true,
//   doMergeIMDB: true,
//   doFetchIMDB: false,
//   doMergeWikipedia: true,
//   doFetchWikipedia: false,
//   doFetchImages: false,
// })
// process.exit(0)

const schema = buildSchema(`#graphql
  enum Sort {
    asc
    desc
  }

  type PageURLField {
    page: String!
  }

  type PlainTextHTMLField {
    plainText: String!
    html: String!
  }

  type Thumbnail {
    source: String!
  }

  type ContentURLs {
    desktop: PageURLField
    mobile: PageURLField
  }

  type FilmStub {
    _id: ID!
    title: String!
    image: String!
  }

  type Director {
    _id: ID!
    name: String!
    lexKey: String!
    birthYear: Int!
    deathYear: Int
    thumbnail: Thumbnail
    contentURLs: ContentURLs!
    extract: String!
    extractHTML: String!
    film: FilmStub!
  }

  type FilmWikipediaSection {
    plotShort: PlainTextHTMLField!
    plotFull: PlainTextHTMLField!
    url: String!
  }

  type Film {
    _id: ID!
    imdbID: String!
    title: String!
    year: Int!
    directors: [Director!]!
    originalTitle: String!
    image: String!
    plot: String!
    directorsText: String!
    writers: String!
    stars: String!
    wikipedia: FilmWikipediaSection!
  }

  type PageContentAsset {
    slug: String!
    uri: String!
  }

  input PageContentAssetInput {
    slug: String!
    uri: String!
  }

  type PageContent {
    slug: String!
    tabTitle: String!
    contentTitle: String!
    contentSubtitle: String
    assets: [PageContentAsset!]!
    body: String!
  }

  input OrderByInput {
    order: [Sort!]
    fields: [String!]
  }

  type Query {
    directors(orderBy: OrderByInput): [Director!]!
    director(_id: ID!): Director
    films(orderBy: OrderByInput): [Film!]!
    film(_id: ID!): Film
    pageContent(slug: String!): PageContent
  }

  type Mutation {
    postPageContent(
      slug: String!,
      tabTitle: String!,
      contentTitle: String!,
      contentSubtitle: String,
      assets: [PageContentAssetInput!]!,
      body: String!
    ): PageContent!
  }
`)

type GraphOperation =
  | 'directors'
  | 'director'
  | 'films'
  | 'film'
  | 'pageContent'
  | 'postPageContent'

const protectedOperations: GraphOperation[] = ['postPageContent']

interface IDArgs {
  _id: string
}

interface SlugArgs {
  slug: string
}

const root = {
  directors: async (args?: { orderBy: OrderBy<Director> }) => {
    const directors = await db.orderBy(db.directors.find({}), args?.orderBy)

    return await directors.map(async (d) => {
      const film = await db.films.findOne({
        directors: { $elemMatch: d._id },
      })
      if (film) {
        return {
          ...d,
          film: { _id: film._id, title: film.title, image: film.image },
        }
      }
      return d
    })
  },
  director: async ({ _id }: IDArgs) => {
    const director = await db.directors.findOne({ _id: Number(_id) })
    if (director) {
      const film = await db.films.findOne({
        directors: { $elemMatch: director._id },
      })
      if (film) {
        return {
          ...director,
          film: { _id: film?._id, title: film.title, image: film.image },
        }
      }
      return director
    }
    return null
  },
  films: async (args?: { orderBy: OrderBy<Film> }) => {
    const films = await db.orderBy(db.films.find({}), args?.orderBy)
    return await films.map((f) =>
      db.populate(f, [{ prop: 'directors', dataStore: db.directors }])
    )
  },
  film: async ({ _id }: IDArgs) => {
    const film = await db.films.findOne({ _id: Number(_id) })
    if (film) {
      return await db.populate(film, [
        { prop: 'directors', dataStore: db.directors },
      ])
    }
    return null
  },
  pageContent: async ({ slug }: SlugArgs) => {
    return await db.pageContents.findOne({ slug })
  },
  postPageContent: async (pageContent: PageContent) => {
    // return await db.pageContents.update (pageContent)
    await db.pageContents.update({ slug: pageContent.slug }, pageContent, {
      upsert: true,
    })
    return await db.pageContents.findOne({ slug: pageContent.slug })
  },
}

const jsonParser = bodyParser.json()

apicache.options({
  appendKey: (req: Request, _: never) => {
    const { query, ...rest } = req.body
    const requestKey = lexObject(rest)
    const hash = crypto.createHash('md5')
    hash.update(JSON.stringify(requestKey))
    const digest = hash.digest('hex')
    return digest
  },
})
const cache = apicache.middleware
const cache200 = cache(
  '3 days',
  (_: never, { statusCode }: Response) => statusCode === 200
)

const app = express()
const port = 3000

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { operationName }: { operationName?: GraphOperation } = req.body
  if (operationName && protectedOperations.includes(operationName)) {
    const authHeader = req.header('Authorization') || ''
    const match = authHeader.match(/^Bearer ([\w=]+)$/)
    if (
      match &&
      match.length > 1 &&
      match[1] === process.env.GRAPHQL_AUTH_TOKEN
    ) {
      next()
    } else {
      res.json({ data: null, errors: ['UNAUTHENTICATED'] }).send()
    }
  } else {
    next()
  }
}

app.use(cors())
app.use(
  '/graphql',
  jsonParser,
  authMiddleware,
  cache200,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Express listening on port ${port}`)
})
