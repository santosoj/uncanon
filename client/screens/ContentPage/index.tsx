import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import { PageContentResponse } from '@uncanon/types'
import { MAXINT32 } from '@uncanon/types/constants'
import React, { useEffect } from 'react'
import { Image, ScrollView } from 'react-native'
import { useQuery } from 'urql'
import { DirectorImages, FilmImages } from '../../assets/content-images'
import ExternalLink from '../../components/ExternalLink'
import KnownFor from '../../components/KnownFor'
import getPageContent from '../../graphql/getPageContent.graphql'
import { Box, Text, Theme } from '../../theme/restyle-theme'
import { StackParamList } from '../types'

function ContentPage({
  route,
  navigation,
}: StackScreenProps<StackParamList, 'ContentPage'>) {
  const { slug } = route.params
  const { colors } = useTheme<Theme>()

  const [{ fetching, data, error }] = useQuery<PageContentResponse>({
    query: getPageContent,
    variables: {
      slug,
    },
  })

  const pageContent = data?.pageContent

  let assetMap: {[slug: string]: string} = {}
  if (pageContent) {
    for (let asset of pageContent.assets) {
      assetMap[asset.slug] = asset.uri
    }
  }

  useEffect(() => {
    if (pageContent) {
      navigation.setOptions({ title: pageContent.tabTitle })
    }
  }, [pageContent])

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      {!!pageContent && (
        <Box paddingBottom='huge'>
          <Image
            source={{uri: assetMap['top-banner']}}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box flexDirection='row' paddingTop='large' paddingBottom='medium'>
            <Box>
              <Image
                source={{uri: assetMap['content-header-image']}}
                style={{ width: 80, height: 80, marginTop: 8, marginRight: 16 }}
              />
            </Box>
            <Box>
              <Text variant='subheader'>{pageContent.contentTitle}</Text>
              <Box flexDirection='row' alignItems='center'>
                <>
                  <Text variant='body'>{pageContent.contentSubtitle}</Text>
                </>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text variant='body' paddingTop='small' paddingRight='small'>
              {pageContent.body}
            </Text>
          </Box>
        </Box>
      )}
    </ScrollView>
  )
}

export default ContentPage
