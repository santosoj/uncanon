export type SortDirection = 'asc' | 'desc'

export type SortArgs = {
  fields: string[]
  order: SortDirection[]
}

export type SortOption = {
  displayName: string
  args: SortArgs
}

export function toggleSortDirections(
  sortOption: SortOption,
  toggleStatus: boolean
): SortOption {
  if (!toggleStatus) {
    return sortOption
  }

  return {
    displayName: sortOption.displayName,
    args: {
      fields: sortOption.args.fields,
      order: sortOption.args.order.map((d) => (d === 'asc' ? 'desc' : 'asc')),
    },
  }
}

export function allSortArgs(sortOptions: SortOption[]): SortArgs[] {
  const allSortArgs: SortArgs[] = []
  for (let opt of sortOptions) {
    allSortArgs.push(opt.args)
    allSortArgs.push(toggleSortDirections(opt, true).args)
  }
  return allSortArgs
}
