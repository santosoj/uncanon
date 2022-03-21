import { useTheme } from '@shopify/restyle'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Box, Theme } from '../../theme/restyle-theme'

function ResponsiveScreen({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null {
  const { breakpoints } = useTheme<Theme>()
  const { width, height } = useWindowDimensions()

  return (
    <Box
      flex={1}
      backgroundColor='white'
      style={{
        paddingHorizontal:
          width >= breakpoints.desktopMin
            ? Math.trunc((width - breakpoints.desktopMin) / 2)
            : 0,
        minHeight: height,
        maxHeight: height,
      }}
    >
      {children}
    </Box>
  )
}

export default ResponsiveScreen
