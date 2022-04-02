import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import TestBed from '.'

export default {
  title: 'Screens/TestBed',
  component: TestBed,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof TestBed>

const Template: ComponentStory<typeof TestBed> = (args) => <TestBed />

export const Default = Template.bind({})
Default.args = {}
