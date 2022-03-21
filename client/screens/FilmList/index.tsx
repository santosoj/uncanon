import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useQuery } from 'urql'
import { FilmImages } from '../../assets/content-images'
import Card from '../../components/Card'
import SortControl from '../../components/SortControl'
import {
  SortOption,
  toggleSortDirections,
} from '../../components/SortControl/sorting'
import allFilms from '../../graphql/getAllFilms.graphql'
import { FilmListItem, FilmListResponse } from 'uncanon-types'
import { Box, Theme } from '../../theme/restyle-theme'
import { StackParamList } from '../types'

export const FilmListSortOptions: SortOption[] = [
  {
    displayName: 'Title',
    args: { fields: ['title'], order: ['asc'] },
  },
  {
    displayName: 'Year',
    args: { fields: ['year'], order: ['asc'] },
  },
]

function FilmList({ navigation }: StackScreenProps<StackParamList, 'Films'>) {
  const { spacing } = useTheme<Theme>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toggleStatus, setToggleStatus] = useState(false)

  const [{ fetching, data, error }] = useQuery<FilmListResponse>({
    query: allFilms,
    variables: toggleSortDirections(
      FilmListSortOptions[selectedIndex],
      toggleStatus
    ).args,
  })

  const renderItem = useCallback(({ item }: { item: FilmListItem }) => {
    const handleCardPress = () => {
      navigation.navigate('Film', { id: item._id })
    }

    return (
      <Card
        line1={item.title}
        line2={String(item.year)}
        line3={item.directorsText}
        imageSource={FilmImages[Number(item._id)]}
        onPress={handleCardPress}
      />
    )
  }, [])

  return (
    <Box flex={1} backgroundColor='white' paddingTop='medium'>
      <SortControl
        options={FilmListSortOptions}
        selectedIndex={selectedIndex}
        toggleStatus={toggleStatus}
        onSelectedIndexChanged={setSelectedIndex}
        onToggleStatusChanged={setToggleStatus}
      />
      <Box flex={1} paddingTop='medium'>
        {!!data?.films && (
          <FlatList
            data={data.films}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{ paddingBottom: 3 * spacing.big }}
          />
        )}
      </Box>
    </Box>
  )
}

export default FilmList
