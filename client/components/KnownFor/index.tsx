import { Link } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import { Card as UIKittenCard } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'
import ExternalLinkIcon from '../../graphics/external-link.png'
import { LinkToType } from '../../screens/types'
import { Box, Text, Theme } from '../../theme/restyle-theme'
import Shadow from './shadow.png'

interface KnownForProps {
  title: string
  linkTo: LinkToType
}

function KnownFor({ title, linkTo }: KnownForProps) {
  const { radii, spacing } = useTheme<Theme>()

  return (
    <Box flexDirection='column'>
      {/* @ts-ignore */}
      <UIKittenCard style={{ borderRadius: radii.soft, cursor: 'default' }}>
        <Box>
          <Text variant='body' numberOfLines={1} fontWeight='600'>
            Known for
          </Text>
          <Text variant='body' numberOfLines={1}>
            <Link to={linkTo} style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                source={ExternalLinkIcon}
                style={{ width: 16, height: 16 }}
              />
              <Text variant='body' marginLeft='tiny'>
                {title}
              </Text>
            </Link>
          </Text>
        </Box>
      </UIKittenCard>

      <Box
        height={spacing.shadow}
        paddingLeft='tiny'
        style={{
          borderBottomLeftRadius: radii.rounded,
          borderBottomRightRadius: radii.rounded,
        }}
      >
        <Image source={Shadow} resizeMode='stretch' style={{ flex: 1 }} />
      </Box>
    </Box>
  )
}

export default KnownFor
