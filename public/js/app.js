new Vue({
	el:'#app',
data: {
		skills: []
	},

	mounted() {
		//make ajax request to server
		//fetch() needs polyfill
		// $.getJson() jQuery
		//$.ajax jQuery
		// axios.get('/skills').then(function(response){
		// 	console.log(response.data);
		// });
		axios.get('/skills').then(response => this.skills = response.data);
		//cross origin requests not work
		// axios.get('http://52.40.88.89/broadwayjournal/issues') //axios 
		// .then(function (response) {
		// 	console.log(response.data);
		// });

	}

})
