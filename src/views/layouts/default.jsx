var React = require('react');

function DefaultLayout(props) {
  return (
    <html>
      <head>
            <link rel="stylesheet" href="/static/css/jquery-ui.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.structure.min.css"></link>
            <link rel="stylesheet" href="/static/css/jquery-ui.theme.min.css"></link>
            <script src="/static/js/jquery.js"></script>
            <script src="/static/js/jquery-ui.min.js"></script>
            <script src="/static/js/main.js"></script>
            <title>{props.title}</title>
        </head>
        <body>{props.children}</body>
    </html>
  );
}

module.exports = DefaultLayout;