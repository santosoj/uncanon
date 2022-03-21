import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import AppHeader from '.'

export default {
  title: 'AppHeader',
  component: AppHeader,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof AppHeader>

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {}
