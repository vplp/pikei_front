export default {
  title: 'Global/footer',
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
  render: (args) => require('./_footer.pug')(),
}
