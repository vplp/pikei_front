export default {
  title: 'Layout/app-section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story: '',
      },
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Заголовок',
      control: 'text',
    },
  },
}

const DefaultCode = `
+app-section()
  .ui-example-content._small
`
export const Default = {
  parameters: {
    docs: {
      source: {
        code: DefaultCode,
      },
    },
  },
  render: (args) =>
    require('./_app-section.pug')({
      props: args.title,
      contents: `
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const WithTitleCode = `
+app-section()
  .ui-example-content._small
`
export const WithTitle = {
  args: {
    title: 'Заголовок секции',
  },
  parameters: {
    docs: {
      source: {
        code: WithTitleCode,
      },
    },
  },
  render: (args) =>
    require('./_app-section.pug')({
      props: args.title,
      contents: `
        <div class="ui-example-content _small"></div>
      `,
    }),
}
