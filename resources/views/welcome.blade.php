<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="app">
        <ul>
            <li v-for="skill in skills" v-text='skill'></li>
        </ul>
        </div>
        <!-- <div id ="app">
        </div> -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>

