<!DOCTYPE html>
<meta charset="UTF-8">
    <head>
        <link rel="stylesheet" type="text/css" href="/css/cartridge.css">
        <title>The Broadway Journal</title>
    </head>
    <body>
        <div id="container" class="<?php echo $route; ?>">
                <top-menu></top-menu>
                <title-bar></title-bar>
                <issue-bar></issue-bar>
                <div class="mainColumn">
                    <control-bar ></control-bar>
                    <main-window></main-window>
                    <!-- <vue-pdf-viewer></vue-pdf-viewer> -->
                </div>
                <author-section></author-section>
                <footer-bar></footer-bar>
      <canvas id="the-canvas" data-url={{$pdf}}</canvas>
        </div>
        <!-- <script src="../../public/pdfjs/build/pdf.js"></script> -->
        <!-- <script src="../../node_modules/vue-instant-pdf-viewer/static/lib/pdfobject.min.js"></script> -->
        <!-- <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script> -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
        <script src="/js/app.js"></script>
	<script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
        <script src="/js/broadway-pdf.js"></script>
    </body>
</html>
