import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { View } from 'react-native'
import Card from '.'
import SampleImage from './sampleImage.jpg'

export default {
  title: 'Card',
  component: Card,
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

const MultipleTemplate: ComponentStory<typeof Card> = (args) => (
  // @ts-ignore
  <View style={{ gap: 8 }}>
    <Card {...args} />
    <Card {...args} />
    <Card {...args} />
    <Card {...args} />
    <Card {...args} />
  </View>
)

export const Default = Template.bind({})
Default.args = {
  line1: '10 Things I Hate About You',
  line2: '1999',
  line3: 'Gil Junger',
  imageSource: SampleImage,
  onPress: () => {},
}

export const Multiple = MultipleTemplate.bind({})
Multiple.args = Default.args
