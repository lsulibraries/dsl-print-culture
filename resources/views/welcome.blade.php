<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.css">
    </head>
    <body>
	<style type="text/css">body { padding-left: 40px; padding-right: 40px; }  .issues a {float: left; clear:both;}</style>
        <div id="app">
	<tabs>
		<tab name="About" :selected="true">
			<p>The Digital Scholarship Lab (DSL) advances digitally enabled research, teaching, and learning at LSU. The lab partners with faculty, staff, and students to incorporate computational methods, new media, and digital technologies into classrooms and research. The DSL was founded in Fall 2015 by the LSU Libraries.  Housed in Middleton room 5, the DSL collaborates with students and faculty interested in developing digital scholarship projects and skills. In Fall 2016 and Spring 2017, the DSL is offering a series of six workshops focusing on Digital Pedagogy.  Additionally, the DSL has designated a class of Digital Pedagogy Fellows. The DSL is also working to create a digital edition of the 1845-6 magazine, The Broadway Journal, edited by Edgar Allen Poe.</p>
		</tab>
		<tab name="Issues" :selected="false">
			<issues></issues>
		</tab>
	</tabs>
        </div>
	<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>

