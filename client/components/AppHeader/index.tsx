import { Image, View } from 'react-native'
import Logo from '../../graphics/logo.png'

import { Box } from '../../theme/restyle-theme'

function AppHeader({}) {
  return (
    <Box paddingTop='medium' paddingBottom='small'>
      <Image
        source={Logo}
        style={{ height: 64, width: 'auto' }}
        resizeMode='contain'
      />
    </Box>
  )
}

export default AppHeader
