import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import SortControl from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SortControl',
  component: SortControl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {},
} as ComponentMeta<typeof SortControl>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SortControl> = (args) => (
  <SortControl {...args} />
)

export const ToggleFalse = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ToggleFalse.args = {
  options: ['Alif', 'Bat', 'Tak'],
  selectedIndex: 0,
  toggleStatus: false,
  onSelectedIndexChanged: () => {},
  onToggleStatusChanged: () => {},
}

export const ToggleTrue = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ToggleTrue.args = {
  options: ['Alif', 'Bat', 'Tak'],
  selectedIndex: 1,
  toggleStatus: true,
  onSelectedIndexChanged: () => {},
  onToggleStatusChanged: () => {},
}
