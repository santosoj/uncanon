import { useTheme } from '@shopify/restyle'
import { Card as UIKittenCard } from '@ui-kitten/components'
import React from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native'
import { Box, Text, Theme } from '../../theme/restyle-theme'
import Shadow from './shadow.png'

const HEIGHT = 80
const SHADOW_HEIGHT = 5

interface CardProps {
  line1: string
  line2: string
  line3: string
  imageSource: ImageSourcePropType
  onPress: (event: GestureResponderEvent) => void
}

function Card({ line1, line2, line3, imageSource, onPress }: CardProps) {
  const { spacing } = useTheme<Theme>()

  return (
    <Box flexDirection='column' paddingBottom='tiny'>
      <UIKittenCard onPress={onPress}>
        <Box flexDirection='row' justifyContent='space-between'>
          <Box flexGrow={1}>
            <Box
              justifyContent='space-between'
              style={{ height: spacing.cardContent }}
            >
              <Text variant='cardHeader' numberOfLines={1}>
                {line1}
              </Text>
              <Text variant='body' numberOfLines={1}>
                {line2}
              </Text>
              <Text variant='body' numberOfLines={1}>
                {line3}
              </Text>
            </Box>
          </Box>
          <Box flexGrow={0}>
            <Image
              source={imageSource}
              resizeMode='cover'
              style={{
                width: spacing.cardContent,
                height: spacing.cardContent,
              }}
            />
          </Box>
        </Box>
      </UIKittenCard>
      <Box>
        <ImageBackground source={Shadow} style={{ height: spacing.shadow }} />
      </Box>
    </Box>
  )
}

export default Card
