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
                <div class="mainColumn">
                    <issue-view-toggle v-if="this.$root.state.active === 'issue'"></issue-view-toggle>
                    <main-window ></main-window>
                    <footer-bar></footer-bar>
                </div>
                <issue-bar></issue-bar>
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
