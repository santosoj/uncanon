import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from '@shopify/restyle'
import { useCallback } from 'react'
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import ChevronLeft from '../../graphics/chevron-left.png'
import { Box, Text, Theme } from '../../theme/restyle-theme'

interface TabbedStackNavigationHeaderProps {
  title?: string
  navigation: StackNavigationProp<ParamListBase, string>
}

function TabbedStackNavigationHeader({
  title,
  navigation,
}: TabbedStackNavigationHeaderProps) {
  const { breakpoints, spacing } = useTheme<Theme>()
  const { width } = useWindowDimensions()
  const horizontalPadding = width >= breakpoints.desktopMin ? 0 : spacing.tiny

  const handleLinkPress = useCallback((ev) => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }, [])

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      backgroundColor='white'
      paddingVertical='small'
      style={{
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
      }}
    >
      <TouchableOpacity onPress={handleLinkPress}>
        <Image
          source={ChevronLeft}
          style={{ width: 30, height: 30 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Text variant='cardHeader' numberOfLines={1} color='secondarySalmon'>
        {title}
      </Text>
    </Box>
  )
}

export default TabbedStackNavigationHeader
