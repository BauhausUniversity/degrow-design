const fs = require('fs');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('css');
  
    eleventyConfig.setBrowserSyncConfig({
      callbacks: {
        ready: function(err, browserSync) {
          const content_404 = fs.readFileSync('_site/404/index.html');
  
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