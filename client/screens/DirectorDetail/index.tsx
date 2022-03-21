import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import React, { useEffect } from 'react'
import { Image, ScrollView } from 'react-native'
import { useQuery } from 'urql'
import { DirectorImages, FilmImages } from '../../assets/content-images'
import ExternalLink from '../../components/ExternalLink'
import KnownFor from '../../components/KnownFor'
import WikipediaIcon from '../../graphics/wikipedia.png'
import getDirector from '../../graphql/getDirector.graphql'
import { DirectorResponse, MAXINT32 } from 'uncanon-types'
import { Box, Text, Theme } from '../../theme/restyle-theme'
import { StackParamList } from '../types'

function DirectorDetail({
  route,
  navigation,
}: StackScreenProps<StackParamList, 'Director'>) {
  const { id } = route.params
  const { colors } = useTheme<Theme>()

  const [{ fetching, data, error }] = useQuery<DirectorResponse>({
    query: getDirector,
    variables: {
      id,
    },
  })

  const director = data?.director

  useEffect(() => {
    if (director) {
      navigation.setOptions({ title: director.name })
    }
  }, [director])

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      {!!director && (
        <Box paddingBottom='huge'>
          <Image
            source={FilmImages[Number(director.film._id)]}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box flexDirection='row' paddingTop='large' paddingBottom='medium'>
            <Box>
              <Image
                source={DirectorImages[Number(director._id)]}
                style={{ width: 80, height: 80, marginTop: 8, marginRight: 16 }}
              />
            </Box>
            <Box>
              <Text variant='subheader'>{director.name}</Text>
              <Box flexDirection='row' alignItems='center'>
                <>
                  <Text variant='body'>{`${director.birthYear}${
                    director.deathYear !== MAXINT32
                      ? `\u2000\u2014\u2000${director.deathYear}`
                      : ''
                  }`}</Text>
                </>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box paddingRight='tiny'>
              <KnownFor
                title={director.film.title}
                linkTo={{ screen: 'Film', params: { id: director.film._id } }}
              />
            </Box>
            <Text variant='body' paddingTop='small' paddingRight='small'>
              {director.extract}
            </Text>
            <Box flexDirection='row' paddingTop='medium' alignItems='center'>
              {!!director.contentURLs.desktop?.page && (
                <ExternalLink href={director.contentURLs.desktop.page}>
                  <Image
                    source={WikipediaIcon}
                    style={{ width: 34, height: 34 }}
                  />
                </ExternalLink>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </ScrollView>
  )
}

export default DirectorDetail
