<!DOCTYPE html>
<meta charset="UTF-8">

    <head>
        <link rel="stylesheet" type="text/css" href="../../public/css/cartridge.css">
        <title>The Broadway Journal</title>
    </head>
    <body>
        <div id="container">
            <div class="documentSection">
                <div class="mainColumn">
                    <control-bar></control-bar>
                    <main-window ></main-window> 
                    <footer-bar></footer-bar>
                </div>  
                <issue-bar></issue-bar>          
            </div>
            <div class="authorSection">
                <div class="authorIntro"></div>
                <div class="authorLegend"></div>
                <div class="authorDirectory"></div>
                <div class="authorCard"></div>
            </div>
        </div>



        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="../../public/js/app.js"></script>
        <script src="https://use.fontawesome.com/feda5854d8.js"></script>        
    </body>
</html>
