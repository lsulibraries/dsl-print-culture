<!DOCTYPE html>
<meta charset="UTF-8">
    <head>
        <link rel="stylesheet" type="text/css" href="/css/nineteenth.css">
        <title>The Broadway Journal</title>
        <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
    </head>
    <body>
        <div id="container" class="<?php echo $route; ?>">
            <div class="documentSection">
                <div class="documentUnder"></div>
                <div class="documentOverflow"></div>
                <navigation></navigation>
                <div class="mainColumn">
                    <view-mode-toggle></view-mode-toggle>
                    <main-window ></main-window>
                    <footer-bar></footer-bar>
                </div>
                <issue-bar></issue-bar>
            </div>
            <div class="authorLegend">
                <div class="legendHeader">View authors and their mentions</div>
                <div class="legendBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>

                <div class="legendIcons">
                    <div class="contributingIcon">
                        <div class="legend1">
                            <div class="innerIcon"></div>
                        </div>
                        <div class="legendLabels">
                            <div class="iconTop">Contributing Author</div>
                            <div class="iconBottom">High Frequency</div>
                        </div>
                    </div>
                    <div class="contributingIcon">
                        <div class="legend2">
                            <div class="innerIcon"></div>
                        </div>
                        <div class="legendLabels">
                            <div class="iconTop">Mentioned Author</div>
                            <div class="iconBottom">High Frequency</div>
                        </div>
                    </div>
                    <div class="contributingIcon">
                        <div class="legend3">
                            <div class="innerIcon"></div>
                        </div>
                        <div class="legendLabels">
                            <div class="iconTop">Mentioned Author</div>
                            <div class="iconBottom">Medium Frequency</div>
                        </div>
                    </div>    
                    <div class="contributingIcon">
                        <div class="legend4">
                            <div class="innerIcon"></div>
                        </div>
                        <div class="legendLabels">
                            <div class="iconTop">Mentioned Author</div>
                            <div class="iconBottom">Low Frequency</div>
                        </div>
                    </div>
                </div>
            </div>
            <author-section class="authorSection"></author-section>
        </div>
        <!-- <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="js/app.js"></script>
        <script src="https://use.fontawesome.com/feda5854d8.js"></script>

    </body>
</html>
