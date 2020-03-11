const fs = require('fs');

module.exports = function(eleventyConfig) {
    let markdownIt = require('markdown-it');
    let markdownItFootnote = require("markdown-it-footnote");
    let options = {
      html: true
    };

    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('css');

    let markdownLib = markdownIt(options).use(markdownItFootnote);
    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.addCollection("articles", (collection) =>
      collection.getFilteredByGlob("articles/*.md").sort((a, b) => {
        if (a.data.id > b.data.id) return 1;
        else if (a.data.id < b.data.id) return -1;
        else return 0;
      })
    );
  
    eleventyConfig.setBrowserSyncConfig({
      callbacks: {
        ready: function(err, browserSync) {
          const content_404 = fs.readFileSync('_site/404.html');
  
          browserSync.addMiddleware('*', (req, res) => {
            // Provides the 404 content without redirect.
            res.write(content_404);
            res.end();
          });
        },
      },
    });
  
    return {
      templateFormats: ['md', 'njk', 'html', 'liquid'],
  
      // If your site lives in a different subdirectory, change this.
      // Leading or trailing slashes are all normalized away, so don’t worry about it.
      // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
      // This is only used for URLs (it does not affect your file structure)
      pathPrefix: '/',
  
      markdownTemplateEngine: 'liquid',
      htmlTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
      passthroughFileCopy: true,
      dir: {
        input: '.',
        includes: '_includes',
        data: '_data',
        output: '_site',
      },
    };
  };