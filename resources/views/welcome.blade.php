<html lang="en">
<meta charset="UTF-8">
    <head>
        <link rel="stylesheet" type="text/css" href="css/tachyon.css">
        <link rel="icon" href="favicon_purple.ico">        
        <title>The Broadway Journal</title>
        <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
    </head>
    <body v-bind:class="normal">
      <div id="vue-root">
              <container></container>

        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="js/app.js"></script>
        <script src="https://use.fontawesome.com/feda5854d8.js"></script>       
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
 
    <script>
    $(function() {

        var $sidebar   = $(".authorCard"), 
            $window    = $(window),
            offset     = $sidebar.offset(),
            topPadding = 20;

        $window.scroll(function() {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });
        
    });
    </script>
    </body>
</html>
