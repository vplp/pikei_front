export default {
  title: 'Layout/app-grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story: '',
      },
      source: {
        code: `+app-grid(cols)`,
      },
    },
  },
  argTypes: {
    cols: {
      description: 'Количество колонок',
      control: 'text',
    },
  },
}

const DefaultCode = `
+app-grid(1)
  .ui-example-content._small
        `
export const Default = {
  args: {
    cols: '1',
  },
  parameters: {
    docs: {
      source: {
        code: DefaultCode,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const Column2Code = `
+app-grid(2)
  .ui-example-content._small
  .ui-example-content._small
`
export const Columns2 = {
  args: {
    cols: '2',
  },
  parameters: {
    docs: {
      source: {
        code: Column2Code,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const Column3Code = `
+app-grid(3)
  .ui-example-content._small
  .ui-example-content._small
  .ui-example-content._small
`
export const Columns3 = {
  args: {
    cols: '3',
  },
  parameters: {
    docs: {
      source: {
        code: Column3Code,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const Column4Code = `
+app-grid(4)
  .ui-example-content._small
  .ui-example-content._small
  .ui-example-content._small
  .ui-example-content._small
`
export const Columns4 = {
  args: {
    cols: '4',
  },
  parameters: {
    docs: {
      source: {
        code: Column4Code,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const Column3WithSpanLeftCode = `
+app-grid(3)
  .ui-example-content._small.app-grid__span-2
  .ui-example-content._small
`
export const Columns3WithSpanLeft = {
  args: {
    cols: '3',
  },
  parameters: {
    docs: {
      source: {
        code: Column3WithSpanLeftCode,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small app-grid__span-2"></div>
        <div class="ui-example-content _small"></div>
      `,
    }),
}

const Column3WithSpanRightCode = `
+app-grid(3)
  .ui-example-content._small
  .ui-example-content._small.app-grid__span-2
`

export const Columns3WithSpanRight = {
  args: {
    cols: '3',
  },
  parameters: {
    docs: {
      source: {
        code: Column3WithSpanRightCode,
      },
    },
  },
  render: (args) =>
    require('./_app-grid.pug')({
      props: args.cols,
      contents: `
        <div class="ui-example-content _small"></div>
        <div class="ui-example-content _small app-grid__span-2"></div>
      `,
    }),
}
