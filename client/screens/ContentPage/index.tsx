import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import { PageContentResponse } from '@uncanon/types'
import React, { useEffect } from 'react'
import { Image, ScrollView } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { useQuery } from 'urql'
import getPageContent from '../../graphql/getPageContent.graphql'
import { Box, Text, Theme } from '../../theme/restyle-theme'
import { StackParamList } from '../types'

const systemFonts = ['Barlow', 'Barlow Semi Condensed']

const tagsStyles = {
  body: { fontFamily: 'Barlow Semi Condensed', fontSize: '16px', paddingRight: '16px' },
  h1: { fontFamily: 'Barlow', fontSize: '28px' },
  h2: { fontFamily: 'Barlow', fontSize: '24px' },
  h3: { fontFamily: 'Barlow', fontSize: '18px' },
  h4: { fontFamily: 'Barlow' },
  h5: { fontFamily: 'Barlow' },
  h6: { fontFamily: 'Barlow' },
}

function ContentPage({
  route,
  navigation,
}: StackScreenProps<StackParamList, 'ContentPage'>) {
  const { slug } = route.params
  const { colors, spacing } = useTheme<Theme>()

  const [{ fetching, data, error }] = useQuery<PageContentResponse>({
    query: getPageContent,
    variables: {
      slug,
    },
  })

  const pageContent = data?.pageContent

  let assetMap: { [slug: string]: string } = {}
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
        <Box style={{paddingBottom: spacing.huge + spacing.medium}}>
          <Image
            source={{ uri: assetMap['top-banner'] }}
            style={{ height: 240 }}
            resizeMode='cover'
          />
          <Box flexDirection='row' paddingTop='large' paddingBottom='medium'>
            <Box>
              <Image
                source={{ uri: assetMap['content-header-image'] }}
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
            <RenderHTML
              source={{ html: pageContent.body }}
              systemFonts={systemFonts}
              tagsStyles={tagsStyles}
            />
          </Box>
        </Box>
      )}
    </ScrollView>
  )
}

export default ContentPage
