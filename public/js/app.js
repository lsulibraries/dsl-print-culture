window.Event = new Vue();


Vue.component('meta-menu',{
    data() {
	return {
	    content: this.$root.state['meta']['content'],
	}
    },
    methods: {
	selectMe: function(which) {
	    this.content = which;
	    Event.$emit('content', this.content);
	    Event.$emit('activeModeChange', 'meta');
	}
    },
    template: `
	<div class='topMenu'>
	  <div @click="selectMe('about')">About</div>
	  <div @click="selectMe('tech')">Technical</div>
	  <div @click="selectMe('credit')">Credits</div>
	</div>
	`
});

Vue.component('view-mode-toggle',{
    methods: {
	issueViewToggled: (to) => {
	    Event.$emit('view-mode-toggled', to);
		}
    },
    template: `
	<div class='controlBar' v-if="this.$root.state.active == 'issue'">
	  <span class="teiToggle" @click="issueViewToggled('tei')">TEI</span>
	  <span class="pdfToggle" @click="issueViewToggled('pdf')">PDF</span>
	</div>
	`
});

Vue.component('main-window',{
    methods: {
	changePage: (which) => {
	    Event.$emit('pageChange', which);
	},
	modeActive: (mode) => {
	    issueMode  = this.$root.state.issue.viewMode;
	    activeMode = this.$root.state.active == 'issue';
	    if(mode == 'tei' && activeMode){
		this.teiMode = true;
	    }else if (mode == 'pdf' && activeMode){
		this.teiMode = false;
	    }
	}
    },
    created() {
	Event.$on('content', (content) => {
	    this.content = content;
	}),
	Event.$on('view-mode-toggled', (to) => {
	    this.teiMode = to == 'tei' ? true : false;
	})
    },
    data() {
	return {
	    teiMode: false,
	    source:'',
	    content: this.$root.state.meta.content,
	    aboutText: ['The Broadway Journal (1845-46), one of the four principal magazines that Edgar Allan Poe helped to edit, is here offered in a digital edition. This edition uses Poe’s career as a magazinist as an entry point into antebellum author networks.','In addition to the corrected pages of the journal available for viewing, this project uses the Text Encoding Initiative (TEI) to identify the author of each piece in the 48 issues, including anonymous, pseudonymous, and unidentified works. As a result, readers can see which authors were published and how frequently, and how they were identified - or not.'],
		creditText: ['Lauren Coates','TEI markup: The Graduate Students','design and css: Kyle Tanglao','vue.js: Will Conlin','server backend: Jason Peak'],
		techText: ['TEI is Great','vue.js is reactive!','aws deployed!','php served','laravel inspired','html 5','css','linux deployed'],
		       }

			},
	props: {src:this.source},
	template: `
 		<div class="mainWindow">
		  <div class="mainCenter">
	 	  <div class="logoTitle" v-if="this.$root.state.active != 'issue'">
	            <div class="logoThe">The</div>
	            <div class="logoBroadway">Broadway</div>
	            <div class="logoJournal">Journal</div>
		    <div class="logoSubtitle">A Digital Augmented Edition</div>
		  </div>

		  <div class="hrMain"></div>
                  <meta-menu></meta-menu>
<div class="content" v-if="this.$root.state.active != 'issue'">
	<div v-if="content == 'about'">
		    {{ aboutText[0] }}
		    <br><br>
	            {{ aboutText[1] }}
		  </div>

				<div v-if="content == 'tech'">
					<li v-for="each in techText"  v-text="each"></li>
				</div>

				<div v-if="content == 'credit'">
					<li v-for="each in creditText" v-text="each"></li>
				</div>
	 	</div>		
	 			<div class="mainInner" v-if="this.$root.state.active == 'issue'">
					<div id="tei" v-if="teiMode">
						<tei-markup v-if='this.$root.iframethis.length' :src=this.$root.iframethis></tei-markup>
						<iframe v-if='this.$root.iframethis.length' :src=this.$root.iframethis></iframe>
					</div>
	<button class="next-page" @click="changePage('prev')">Prev Page</button>
	<button class="next-page" @click="changePage('next')">Next Page</button>
	<pdf-viewer v-if="!teiMode"></pdf-viewer>


				</div>
			</div>
			`
});


Vue.component('navigation',{
	data(){
		return { issueID:'', tocContent:[ 
			{'title':'title1','author':'author1','page':'3','displayPage':'1-17'},
			{'title':'title2','author':'author2','page':'1','displayPage':'3-42'}] //faked data
	    }
	},
	created() {
		Event.$on('issueSelected', (id) => {
			this.issueID = id;
			url= '/api/broadwayjournal/' + this.issueID + '/toc';
			//axios.get(url).then(response => this.tocContent = response.data);
		})
	},
	template:`
				<div v-if='this.$root.state.active=="issue"' class='navigationIssue'> 
                    <div class='tocDropdown'>Table of Contents</div>          
                    <toc-item v-for='item in tocContent' :item='item'></toc-item>
                </div>
			`
})

Vue.component('toc-item',{
	 props:['item'],
	 template:`
		<div class="tocItem">
            <span class="tocTitle">{{item.title}}</span>
            <span class="author">{{item.author}}</span>
            <div class="pageNumber">{{item.displayPage}}</div>
        </div>
	 `
});

Vue.component('pdf-viewer',{
    created(){
	Event.$on('nextPage', (page) => {
	    this.current_page += 1;
	    this.loadPdf(this.current_issue, this.current_page);
	}),
	Event.$on('issueSelected', (id) => {
	    this.current_page = 1;
	    this.current_issue = id;
	    this.loadPdf(this.current_issue, this.current_page);
	}),
	Event.$on('pageChange', (which) => {
    	    newPage = which == 'next' ? this.current_page += 1 : this.current_page -= 1;
	    if(this.current_page > 0){
		this.loadPdf(this.current_issue, newPage);
	    }
	    

	})
    },
    data() {
	return {
	    current_page: 1,
	    current_issue: this.$root.state.issue.id
	}
    },
    mounted(){
	this.loadPdf(this.current_issue, this.current_page);
    },
    template: `
       <div id="pdf-viewer" class="pdf-div"><canvas id="pdf" class="pdf-canvas"></canvas></div>
	`,
    methods: {
	loadPdf: function(issue, page = 1) { 
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.

	    var url = '/storage/broadway-tei/pdf/BroadwayJournal_'+issue+'.pdf';
	    console.log(url);
	//console.log('$pdf');

	// var pdfData = atob($pdf);

	// Disable workers to avoid yet another cross-origin issue (workers need
	// the URL of the script to be loaded, and dynamically loading a cross-origin
	// script does not work).
	// PDFJS.disableWorker = true;

	// The workerSrc property shall be specified.
	PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

	// Asynchronous download of PDF
	var loadingTask = PDFJS.getDocument(url);
	loadingTask.promise.then(function(pdf) {
	    console.log('PDF loaded');
	    if(page > pdf.pdfInfo.numPages){
		return;
	    }
	    // Fetch the first page
	    var pageNumber = page;
	    pdf.getPage(pageNumber).then(function(page) {
		console.log('Page loaded');
		
		var scale = 1;
		var viewport = page.getViewport(scale);

		// Prepare canvas using PDF page dimensions
		var canvas = document.getElementById('pdf');
		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		// Render PDF page into canvas context
		var renderContext = {
		    canvasContext: context,
		    viewport: viewport
		};
		var renderTask = page.render(renderContext);
		renderTask.then(function () {
		    console.log('Page rendered');
		});
	    });
	}, function (reason) {
	    // PDF loading error
	    console.error(reason);
	});
	},
    }
})

Vue.component('tei-markup',{
	data(){
		return{
			page:'',
			markdown:[]
		}
	},
	props: {src:''},
	template: `<div class='teiMarkup'>pageNum:{{page}}<div>`
})

Vue.component('issue-month',{
	data(){
		return { toggled: false,
			issues: this.$parent.$root.paths[this.list],
			monthConvert: {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUN':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'},
		}
	},
	props: {month: '',	list: '', currentIssue: '' },
	 mounted(){
	 	Event.$on('issue-preselected',(data) => { 

	 			if(this.monthConvert[this.month] == data.slice(6,-6) && this.list.slice(-2)== data.slice(12)){
	 				this.showChildren()
		 		}

	 		});
	 },
	methods: { 
	    showChildren: function(){
			if(this.toggled==false){
			//turn on this.$children
				for (each in this.$children){
					this.$children[each].meSeen=true;
					this.toggled=true;
				}
			//turn off everyone else's children
				for(one in this.$parent.$children){
							if (this.$parent.$children[one].list != this.list){
								for(two in this.$parent.$children[one].$children){
								this.$parent.$children[one].$children[two].meSeen=false;
								//remove activeMonth from everyone else
								this.$parent.$children[one].toggled=false;
								 }
							}
					}
			}
			else{
				//turn off this.children
				for (each in this.$children){
					this.$children[each].meSeen=false;
					this.toggled=false;
					}
			}
		}
	},
	template: `<div v-bind:class="{activeMonth: toggled}">
					<div @click="showChildren()">
						<div class="singleText" >{{this.month}}</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="each in this.issues"></index-child>
				</div>`
});

Vue.component('index-child',{
    data() {
	return { meSeen:false }
    },
    props: ['href'],
    methods: {
	selectIssue: function(issueId){
	    Event.$emit('activeModeChange', 'issue');
	    id = issueId.slice(-10).split('/').join('');
	    Event.$emit('issueSelected', id);
	}
    },
    template: `
	<div v-if="meSeen" @click="selectIssue(href)" class="childIndex">
	  <div v-bind:href='href' class="childText" v-text="this.href.slice(-2)"></div>
	</div>`
});

Vue.component('issue-bar',{
	 data(){
	 	return {months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
	 			lists: ['childrenJan45','childrenFeb45','childrenMar45','childrenApr45','childrenMay45','childrenJun45','childrenJul45','childrenAug45','childrenSep45','childrenOct45','childrenNov45','childrenDec45','childrenJan46'],
	 			currentIssue: '',

		 }
	 },
	template: `
		<div class="issueBar">
			<div class="issueMask"></div>
				<div class="issueIndex">
					<div class="singleIndex" href="">
						<div class="yearText">1845</div>
						<div class="indicatorYear"></div>
					</div>
					<issue-month :currentIssue='currentIssue' :month='months[0]' :list='lists[0]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[1]' :list='lists[1]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[2]' :list='lists[2]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[3]' :list='lists[3]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[4]' :list='lists[4]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[5]' :list='lists[5]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[6]' :list='lists[6]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[7]' :list='lists[7]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[8]' :list='lists[8]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[9]' :list='lists[9]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[10]' :list='lists[10]' class="singleIndex"></issue-month>
					<issue-month :currentIssue='currentIssue' :month='months[11]' :list='lists[11]' class="singleIndex"></issue-month>
				</div>
				<div class="issueIndex">
					<div class="singleIndex" href="">
						<div class="yearText">1846</div>
						<div class="indicatorYear"></div>
				</div>
				<issue-month :month='months[0]' :list='lists[12]' class="singleIndex"></issue-month>
			</div>
		</div>
		`
});

Vue.component('author-section',{
	data(){
		return {
			 modalActive:false,
			personography:[],
			chosen: '',
		}
	},
	mounted() {
		axios.get('/api/personography/summary/json').then(response => this.personography = response.data);
	 },
	template: `
				<div class="authorSection">
					<div class="authorIntro"></div>
					<div class="authorHeader">
		                	        <div class="inBorder"></div>
                		        	<div class="inText"><span class="swash">A</span>uthors</div>
		                        	<div class="inBorder"></div>
                	        	</div>
					<div class="authorLedgend"></div>
					<div class="authorDirectory">
						<author-node v-for="(each,index) in personography" :authInfo="personography[index]" :authID='index'></author-node>
					</div>
					<author-preview :authID='chosen' :authInfo="personography[chosen]"></author-preview>
					<author-modal :authID='chosen' :authInfo="personography[chosen]"></author-modal>
				</div>
	`
}) 

Vue.component('author-modal',{
		computed: {mentions: function(){'10'
		return Math.floor(Math.random(1,100)*10);
		},
		contribs: function(){'10'
		return Math.floor(Math.random(1,100)*10);
		}

	},
	methods:{
		closeModal: function(){
			this.$parent.modalActive=false;
		}
	},
	props:['authInfo','authID'],
	template: `
				<div v-if="this.$parent.modalActive">
					<button @click='closeModal()'>CloseMe</button>
					<div  v-for="(val, key) in authInfo" v-bind:class='key'>{{val}}</div>
					<div v-if='this.$parent.chosen.length' class="mentionNumber">{{this.mentions}}</div>
					<div v-if='this.$parent.chosen.length' class="contributionNumber">{{this.contribs}}</div>
					

				</div>
			`
})

Vue.component('author-node',{
	methods:{
		modalClick: function(data){
					Event.$emit('modal-active',this.authID);
					this.$parent.chosen=this.authID;
					this.$parent.modalActive=true;
		},
		cardHover: function(data){
					this.$parent.chosen=this.authID;
		}
	},
	computed:{ authHref: function() {var path = 'author-' + this.authID; return path}
	},
	props: ['authInfo','authID'],
	template: `
				<div class="node" @click='modalClick(authID)' @mouseover='cardHover(authID)'>
					<div v-bind:class="this.authInfo['role']" v-bind:href="authHref" >{{this.authInfo['init']}}</div>
				</div>
	`
})

Vue.component('author-preview',{
	props: ['authID','authInfo'],
	template: `
				<div class="authorCard">
					<div v-if='this.$parent.chosen.length'>{{this.authInfo.name}}</div>
				</div>
	`
})

Vue.component('footer-bar',{
	template: `<div>
					<div class="issueFooter"></div>
					<div class="footerBar">
					<div class="ccText">This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. <br>Contact the <a href="mailto:dsl@lsu.edu" target="_blank">Digital Scholarship Lab</a> at LSU Libraries with any questions or comments. </div>
				</div>`
});

window.Event = new Vue();

new Vue({
	el:'#container',
    data: {
	state: {
	    active: 'meta', // issue | meta
	    meta: {
		content: 'about', // about | tech | credits
	    },
	    issue: {
		id: '18450104', // yyyy-mm-dd
		viewMode: '', // tei|pdf
		page: 1, // int
	    },
	},
			journals:[],
			iframethis: '',
			paths: {'childrenJan45': ['http://52.40.88.89/broadwayjournal/issue/1845/01/04', 'http://52.40.88.89/broadwayjournal/issue/1845/01/11', 'http://52.40.88.89/broadwayjournal/issue/1845/01/18', 'http://52.40.88.89/broadwayjournal/issue/1845/01/25'],
			'childrenFeb45': ['http://52.40.88.89/broadwayjournal/issue/1845/02/01', 'http://52.40.88.89/broadwayjournal/issue/1845/02/08', 'http://52.40.88.89/broadwayjournal/issue/1845/02/15', 'http://52.40.88.89/broadwayjournal/issue/1845/02/22'],
			'childrenMar45': ['http://52.40.88.89/broadwayjournal/issue/1845/03/01', 'http://52.40.88.89/broadwayjournal/issue/1845/03/08', 'http://52.40.88.89/broadwayjournal/issue/1845/03/15', 'http://52.40.88.89/broadwayjournal/issue/1845/03/22', 'http://52.40.88.89/broadwayjournal/issue/1845/03/29'],
			'childrenApr45': ['http://52.40.88.89/broadwayjournal/issue/1845/04/05', 'http://52.40.88.89/broadwayjournal/issue/1845/04/12', 'http://52.40.88.89/broadwayjournal/issue/1845/04/19', 'http://52.40.88.89/broadwayjournal/issue/1845/04/26'],
			'childrenMay45': ['http://52.40.88.89/broadwayjournal/issue/1845/05/03', 'http://52.40.88.89/broadwayjournal/issue/1845/05/10', 'http://52.40.88.89/broadwayjournal/issue/1845/05/17', 'http://52.40.88.89/broadwayjournal/issue/1845/05/24', 'http://52.40.88.89/broadwayjournal/issue/1845/05/31'],
			'childrenJun45': ['http://52.40.88.89/broadwayjournal/issue/1845/06/07', 'http://52.40.88.89/broadwayjournal/issue/1845/06/14', 'http://52.40.88.89/broadwayjournal/issue/1845/06/21', 'http://52.40.88.89/broadwayjournal/issue/1845/06/28'],
			'childrenJul45': ['http://52.40.88.89/broadwayjournal/issue/1845/07/12', 'http://52.40.88.89/broadwayjournal/issue/1845/07/19', 'http://52.40.88.89/broadwayjournal/issue/1845/07/26'],
			'childrenAug45': ['http://52.40.88.89/broadwayjournal/issue/1845/08/02', 'http://52.40.88.89/broadwayjournal/issue/1845/08/09', 'http://52.40.88.89/broadwayjournal/issue/1845/08/16', 'http://52.40.88.89/broadwayjournal/issue/1845/08/23', 'http://52.40.88.89/broadwayjournal/issue/1845/08/30'],
			'childrenSep45': ['http://52.40.88.89/broadwayjournal/issue/1845/09/06', 'http://52.40.88.89/broadwayjournal/issue/1845/09/13', 'http://52.40.88.89/broadwayjournal/issue/1845/09/20', 'http://52.40.88.89/broadwayjournal/issue/1845/09/27'],
			'childrenOct45': ['http://52.40.88.89/broadwayjournal/issue/1845/10/04', 'http://52.40.88.89/broadwayjournal/issue/1845/10/11', 'http://52.40.88.89/broadwayjournal/issue/1845/10/18', 'http://52.40.88.89/broadwayjournal/issue/1845/10/25'],
			'childrenNov45': ['http://52.40.88.89/broadwayjournal/issue/1845/11/01', 'http://52.40.88.89/broadwayjournal/issue/1845/11/08', 'http://52.40.88.89/broadwayjournal/issue/1845/11/15', 'http://52.40.88.89/broadwayjournal/issue/1845/11/22', 'http://52.40.88.89/broadwayjournal/issue/1845/11/29'],
			'childrenDec45': ['http://52.40.88.89/broadwayjournal/issue/1845/12/06', 'http://52.40.88.89/broadwayjournal/issue/1845/12/13', 'http://52.40.88.89/broadwayjournal/issue/1845/12/20', 'http://52.40.88.89/broadwayjournal/issue/1845/12/27'],
			'childrenJan46': ['http://52.40.88.89/broadwayjournal/issue/1846/01/03']
		}
    },
    created() {
	Event.$on('content', (name) => {
	    this.state['meta']['content'] = name;
	}),
	Event.$on('view-mode-toggled', (to) => this.state.issue.viewMode = to),
	Event.$on('activeModeChange', (mode) => this.state.active = mode )
	Event.$on('issueSelected', (id) => this.state.issue.id = id )
	Event.$on('pageChange', (which) => {
    	    newPage = which == 'next' ? this.state.issue.page += 1 : this.state.issue.page -= 1;
	})
    },
    mounted() {			
	axios.get('/api/all-issues/json').then(response => this.journals = response.data);
    }
});

