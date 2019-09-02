export default ({ body, title }) => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="icon" href="/assets/favicon.ico">
        <link rel="stylesheet" href="/main.css"/>
        <link rel="stylesheet" href="/assets/bootstrap.min.css">
      </head>

      <body>
        <div id="root">${body}</div>
        <script src="/app.js"></script>
      </body>
    </html>
  `
);
