const { minify } = require('html-minifier-terser')
const fs = require('fs')

module.exports = function compressHtmlPlugin () {
  return {
    async generated (pagePaths) {
      pagePaths.forEach(async (page) => {
        const res = await minify(fs.readFileSync(page, 'utf8'), {
          collapseWhitespace: true,
          removeComments: true,
          removeTagWhitespace: true,
          removeEmptyElements: true
        })
        fs.writeFile(page, res, 'utf-8', () => {})
      })
    }
  }
}
