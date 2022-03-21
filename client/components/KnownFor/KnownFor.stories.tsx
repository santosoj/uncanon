import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import KnownFor from '.'

export default {
  title: 'KnownFor',
  component: KnownFor,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof KnownFor>

const Template: ComponentStory<typeof KnownFor> = (args) => (
  <KnownFor {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: '10 Things I Hate About You',
  linkTo: { screen: 'hehehe' },
}
