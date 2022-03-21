import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import FilmList from '.'

export default {
  title: 'Screens/FilmList',
  component: FilmList,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof FilmList>

const Template: ComponentStory<typeof FilmList> = (args) => <FilmList />

export const Default = Template.bind({})
Default.args = {
  // @ts-ignore
  navigation: {
    navigate: () => {},
  },
}
