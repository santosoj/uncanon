import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import DirectorList from '.'

export default {
  title: 'Screens/DirectorList',
  component: DirectorList,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof DirectorList>

const Template: ComponentStory<typeof DirectorList> = (args) => <DirectorList />

export const Default = Template.bind({})
Default.args = {
  // @ts-ignore
  navigation: {
    navigate: () => {},
  },
}
