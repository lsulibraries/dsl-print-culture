<!DOCTYPE html>
<meta charset="UTF-8">
    <head>

        <link rel="stylesheet" type="text/css" href="css/nineteenth.css">
        <link rel="icon" href="favicon_purple.ico">        
        <title>The Broadway Journal</title>
        <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
    </head>
    <body>
      <div id="container" class="<?php echo $route; ?>">
              <div class="nav">
                <div class="libLogo">
                    <img src="images/libraries_logo.png"></img>
                </div>
                                    <view-mode-toggle></view-mode-toggle>

                                <meta-menu></meta-menu>

            </div>     
            <div class="documentSection">
                <div class="documentUnder"></div>
                <div class="documentOverflow"></div>
                <navigation></navigation>
                <div class="mainColumn">
                    <main-window ></main-window>
                    <footer-bar></footer-bar>
                </div>
                <issue-bar></issue-bar>

            </div>

            <author-section class="authorSection">
            </author-section>
        </div>
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
