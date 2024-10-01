export default {
  title: 'Components/sprite',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        code: `+sprite('icon-name')`,
        language: 'pug',
      },
    },
  },
  argTypes: {
    name: {
      description: 'Название иконки',
      control: 'text',
    },
  },
}

export const Default = {
  args: {
    name: 'file',
  },
  render: (args) => {
    setTimeout(window.APP.refresh)

    return require('./_sprite.pug')({ props: args.name })
  },
}
