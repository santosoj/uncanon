import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import FilmDetail from '.'

export default {
  title: 'Screens/FilmDetail',
  component: FilmDetail,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof FilmDetail>

const Template: ComponentStory<typeof FilmDetail> = (args) => (
  <FilmDetail {...args} />
)

export const Default = Template.bind({})
Default.args = {
  route: {
    params: {
      id: 23,
    },
    key: 'hehehe',
    name: 'Film',
  },
  // @ts-ignore
  navigation: {
    setOptions: () => {},
  },
}
