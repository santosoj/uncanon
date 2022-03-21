import React, { useCallback } from 'react'
import { GestureResponderEvent, Linking, TouchableOpacity } from 'react-native'

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}): JSX.Element {
  const handlePress = useCallback((event: GestureResponderEvent) => {
    Linking.openURL(href)
  }, [])
  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
}

export default ExternalLink
