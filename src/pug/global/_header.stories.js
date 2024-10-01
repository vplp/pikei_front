export default {
  title: 'Global/header',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  argTypes: {},
}

export const Default = {
  args: {},
  render: (args) => require('./_header.pug')(),
}
