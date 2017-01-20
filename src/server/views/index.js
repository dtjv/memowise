module.exports = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>MEMOWISE</title>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
    </head>
    <body>
      <div id="app"></div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
      <script>
        $('.button-collapse').sideNav();
      </script>
      <script type="text/javascript" src="bundle.js"></script>
    </body>
  </html>
`;
