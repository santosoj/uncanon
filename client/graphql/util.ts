import { OperationDefinitionNode } from 'graphql'
import { Operation } from 'urql'
import allDirectors from '../fixtures/getAllDirectors.json'
import allFilms from '../fixtures/getAllFilms.json'
import director from '../fixtures/getDirector.json'
import film from '../fixtures/getFilm.json'

const mockDataForQuery: { [key in QueryName]: object } = {
  getAllDirectors: allDirectors,
  getAllFilms: allFilms,
  getDirector: director,
  getFilm: film,
}

export type QueryName =
  | 'getAllDirectors'
  | 'getAllFilms'
  | 'getDirector'
  | 'getFilm'

export function getQueryName(op: Operation): QueryName | undefined {
  const def = op.query.definitions.find(
    (d: any) => d.kind === 'OperationDefinition'
  ) as OperationDefinitionNode | undefined
  return def?.name?.value as QueryName | undefined
}

export function urqlMock(op: Operation): unknown {
  const queryName = getQueryName(op)
  const data = queryName ? mockDataForQuery[queryName] : {}
  return { data }
}
