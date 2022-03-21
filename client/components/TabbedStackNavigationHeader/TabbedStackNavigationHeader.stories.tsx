import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import TabbedStackNavigationHeader from '.'

export default {
  title: 'TabbedStackNavigationHeader',
  component: TabbedStackNavigationHeader,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof TabbedStackNavigationHeader>

const Template: ComponentStory<typeof TabbedStackNavigationHeader> = (args) => (
  <TabbedStackNavigationHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: '10 Things I Hate About You',
  // @ts-ignore
  navigation: { goBack: () => {} },
}
