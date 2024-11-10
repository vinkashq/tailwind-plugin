const postcss = require('postcss')
const plugin = require("../src/index");

const config = {
  content: [
    {
      raw: "",
    },
  ],
  theme: {
  },
  plugins: [plugin],
};

let containerExpected = `
.container {
    margin-left: auto;
    margin-right: auto
}
`

it('container', () => {
  config.content[0].raw = "container"
  let utilitiesCSS = postcss([require("tailwindcss")(config)]).process(
    "@tailwind utilities",
    { from: undefined }
  ).then(({ css }) => {
    expect(css).toBe(containerExpected.trim())
  })
})

let rowExpected = `
.row-0 {
    padding-top: 0px;
    padding-bottom: 0px
}
@media (min-width: 640px) {
    .row-0 {
        padding-top: 1px;
        padding-bottom: 1px
    }
}
.row-0\\.5 {
    padding-top: 0.125rem;
    padding-bottom: 0.125rem
}
@media (min-width: 640px) {
    .row-0\\.5 {
        padding-top: 1px;
        padding-bottom: 1px
    }
}
.row-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem
}
@media (min-width: 640px) {
    .row-1 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem
    }
}
.row-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
@media (min-width: 640px) {
    .row-2 {
        padding-top: 1rem;
        padding-bottom: 1rem
    }
}
.row-px {
    padding-top: 1px;
    padding-bottom: 1px
}
@media (min-width: 640px) {
    .row-px {
        padding-top: 0.125rem;
        padding-bottom: 0.125rem
    }
}
`

it('row', () => {
  config.content[0].raw = "row-0 row-px row-0.5 row-1 row-2"
  let utilitiesCSS = postcss([require("tailwindcss")(config)]).process(
    "@tailwind utilities",
    { from: undefined }
  ).then(({ css }) => {
    expect(css).toBe(rowExpected.trim())
  })
})
