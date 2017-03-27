<!DOCTYPE html>
<meta charset="UTF-8">

    <head>
        <link rel="stylesheet" type="text/css" href="../../public/css/nineteenth.css">
        <title>The Broadway Journal</title>
    </head>
    <body>
        <div id="container">
            <div class="documentSection">
                <div class="documentUnder"></div>           
                <div class="documentOverflow"></div>        
                <div class="mainColumn">
                    <control-bar></control-bar>
                    <main-window ></main-window> 
                    <footer-bar></footer-bar>
                </div>  
                <issue-bar></issue-bar>          
            </div>
            <div class="authorSection">
                <div class="authorIntro">
                    <div class="authorHeader">
                        <div class="inBorder"></div>
                        <div class="inText"><span class="swash">A</span>uthors</div>
                        <div class="inBorder"></div>
                    </div>
                </div>
                <div class="authorLegend"></div>
                <div class="authorDirectory"></div>
                <div class="authorCard"></div>
            </div>
            <div class="navigationIssue">
                Table of contents
            </div>
        </div>



        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="../../public/js/app.js"></script>
        <script src="https://use.fontawesome.com/feda5854d8.js"></script>        
    </body>
</html>
