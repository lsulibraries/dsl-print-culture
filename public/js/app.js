Vue.component('issues',{
	data() {
		return { journals: []  };
 	},
	mounted() {
		axios.get('/broadwayjournal/issues').then(response => this.journals = response.data);
	 },
        template: `
        <div class="issues">
		<div>
		<issue v-for="journal in journals" v-text='journal["uri"]'></issue>
		</div>
        </div>
        `
});

Vue.component('issue',{
	data() {
		return { xmlLink:'',
		issueXML:''};
	},
	mounted() {
			this.xmlLink = this.$el.origin + this.$el.innerHTML;
			axios.get(this.xmlLink).then(response => this.issueXML = response.data);
	},
	template: `<a :href="this.xmlLink"></a>`
});

Vue.component('tabs', {
	template: `
		<div>
			<div class="tabs">
				<ul>
			    		<li v-for="tab in tabs" :class="{'is-active': tab.isActive}">
				    		<a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a>
		    			</li>
				</ul>
			 </div>
			<div class="tabs-details"><slot></slot></div>
		</div>
		`,
	data() {
		return {tabs: [] };
	},
	created(){
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive= (tab.name==selectedTab.name);
			});
		}
	}

});

Vue.component('tab',{
	template: `
	<div v-show="isActive"><slot></slot></div>
	`,
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		href(){
			return '#' + this.name.toLowerCase().replace(/ /g, '-');
		}
	},
	mounted() {
		this.isActive = this.selected;
	},
	props: {
		name: { required: true },
		selected: {default: false}
		}
});

/*
new Vue.component('path-dict', {
	data() {
		return { journals: []};
	},
	mounted() {
		axios.get('/broadwayjournal/issues').then(response => this.journals = response.data);
	},
	template: `<div><script>
		uriDict = {'1845':{'01':{},'02':{},'03':{},'04':{},'05':{},'06':{},'07':{},'08':{},'09':{},'10':{},'11':{},'12':{},  },'1846':{'01':{}}};
            for(journal in journals){
                split = journals[journal]['uri'].split('/');
                year = split[3];
                month = split[4];
                day = split[5];
                uriDict[year][month][day] =  journals[journal]['uri'];
            }
            console.log(uriDict['1845']['01']['04']);
		</script></div>`
});
*/
new Vue({
	el:'#app',
	data: {
		journals: []
	},
	mounted() {
		axios.get('/broadwayjournal/issues').then(response => this.journals = response.data);
	}
});
