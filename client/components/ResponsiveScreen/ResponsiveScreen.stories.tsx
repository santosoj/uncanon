import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Text, View } from 'react-native'
import ResponsiveScreen from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ResponsiveScreen',
  component: ResponsiveScreen,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {},
} as ComponentMeta<typeof ResponsiveScreen>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ResponsiveScreen> = (args) => (
  <ResponsiveScreen {...args}>
    <View style={{ backgroundColor: '#cdc' }}>
      <Text>View on ResponsiveScreen</Text>
    </View>
  </ResponsiveScreen>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
