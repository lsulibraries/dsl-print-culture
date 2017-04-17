window.Event = new Vue();
window.Util  = new Vue({
    methods: {
	datePartsForIssueId: function(id){
	    let ret       = {};
	    ret.year  = id.slice(0,4);
	    ret.month = id.slice(4,6);
	    ret.day   = id.slice(-2);
	    return ret;
	}
    }

});

Vue.component('pseudo-body', {
    created() {
	Event.$on('toggleVisibility', (content) => {
	    this.visibility = this.$root.visibility;
	})
    },
    data() {
	return {
	    visibility: this.$root.visibility
	}
    },
    template: `
        <div id="pseudo-body" v-bind:class="this.visibility">
        <div class="nav">
                <div class="libLogo">
                    <img src="images/libraries_logo.png"></img>
                </div>
                                    <view-mode-toggle></view-mode-toggle>

                                <meta-menu></meta-menu>

            </div>     
            <div class="documentSection">
                <div class="documentUnder"></div>
                <div class="documentOverflow"></div>
                <navigation></navigation>
                <div class="mainColumn">
                    <main-window ></main-window>
                </div>
                <issue-bar></issue-bar>

            </div>

            <author-section class="authorSection">
            </author-section>
        </div>
	</div>
    `
})


Vue.component('meta-menu',{
    data() {
		return {
	    	content: this.$root.state['meta']['content'],
		}
    },
    computed:{
    	dlLabel: function(){
    		if(this.$root.state.issue.viewMode == 'pdf'){
    			return 'PDF'
    		}
    		else{
    			return 'TEI'
    		}
    		
    	}
    },
    methods: {
	stateHref:function(){
	    let iid   = Util.datePartsForIssueId(this.$root.state.issue.id);
	    let format = this.$root.state.issue.viewMode
	    return `/broadwayjournal/issue/${iid.year}/${iid.month}/${iid.day}/${format}`
	},
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
	  <a v-bind:href='stateHref()' download>Download {{dlLabel}}</a>
	</div>
	`
});

Vue.component('view-mode-toggle',{
    created(){
    	Event.$on('view-mode-toggled', (mode) =>{
    		if(mode == 'tei'){
    			this.$children[0].active=true;
    			this.$children[1].active=false;
    		}
    		else{
    			this.$children[0].active=false;
    			this.$children[1].active=true;
    		}	
    	})

    },
    template: `
	<div class='controlBar' v-if="this.$root.state.active == 'issue'">
	<view-mode-button  kind="tei">Text</view-mode-button>
	<span>&nbsp;|&nbsp; </span>
	<view-mode-button kind='pdf'>PDF</view-mode-button>
	</div>
	`
});

Vue.component('view-mode-button',{
	data(){
		return {
			active: false,
		}
	},
	props: ['kind'],
	methods: {
	issueViewToggled: (to) => {
		Event.$emit('view-mode-toggled', to);  	
		}
	    
    },
	template: `<span v-bind:class="[{toggled: active}, kind]"  @click="issueViewToggled(kind)"><slot></slot></span>`
})

Vue.component('main-window',{
    methods: {
	toggleVis: function (){
	    this.$root.visibility = this.$root.visibility == 'high' ? 'normal' : 'high';
	    Event.$emit('toggleVisibility');
	},
	readerMode: function () {
	    return this.$root.state.active == 'issue' ? true : false;
	},
	changePage: function (which) {
	    page = this.$root.state.issue.page;
	    switch (which) {
	        case 'next':
		    page += 1;
		    break;
	        case 'prev':
		    page -= 1;
		    break;
	    default:
		page = 1;
	    }
	    page = page <= 1 ? 1 : page;
	    Event.$emit('pdf-pageChange', page);
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
	    content: this.$root.state.meta.content,
	    aboutText: ['The Broadway Journal (1845-46), one of the four principal magazines that Edgar Allan Poe helped to edit, is here offered in a digital edition. This edition uses Poe’s career as a magazinist as an entry point into antebellum author networks.','In addition to the corrected pages of the journal available for viewing, this project uses the Text Encoding Initiative (TEI) to identify the author of each piece in the 48 issues, including anonymous, pseudonymous, and unidentified works. As a result, readers can see which authors were published and how frequently, and how they were identified - or not.'],
		creditText: ['Lauren Coates','TEI markup: The Graduate Students','design and css: Kyle Tanglao','vue.js: Will Conlin','server backend: Jason Peak'],
		techText: ['TEI is Great','vue.js is reactive!','aws deployed!','php served','laravel inspired','html 5','css','linux deployed'],
		       }
			},
	template: `
 		<div class="mainWindow">
					<div id="tei" v-if="teiMode && this.readerMode()">
						<tei-markup></tei-markup>
					</div>
		    <div class="mainCenter">
	 	  	    <div class="logoTitle" v-if="this.$root.state.active != 'issue'">
	            	<div class="logoThe">The</div>
	            	<div class="logoBroadway">Broadway</div>
	            	<div class="logoJournal">Journal</div>
		        	<div class="logoSubtitle">A Digital Augmented Edition</div>
		        		<div class="hrMain"></div>
		      	</div>

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
	<button @click='toggleVis'>Vis</button>
	<button v-if="!teiMode" class="next-page" @click="changePage('prev')">Prev Page</button>
					<zoom-slider v-if='!teiMode'></zoom-slider>
					<button v-if="!teiMode" class="next-page" @click="changePage('next')">Next Page</button>
					<pdf-viewer v-if="!teiMode"></pdf-viewer>
				</div>
			</div>	
		</div>
			`
});


Vue.component('navigation',{
	data(){
		return { issueID:'', tocContent:[]
	    }
	},
	created() {
		Event.$on('issueSelected', (id) => {
			this.issueID = id;
			url= '/api/broadwayjournal/' + this.issueID + '/toc';
			axios.get(url).then(response => this.tocContent = response.data);
		})
	},
	template:`
		<div v-if='this.$root.state.active=="issue"' class='navigationIssue'>
                <div class='tocDropdown'>Table of Contents</div>
                <toc-item v-for='id in tocContent.toc' :id='id'></toc-item>
        </div>
			`
})

Vue.component('toc-item',{
	 data(){
	 	return { toggled:false} 
	 },
	 props:['id'],
	 methods:{
	    showChildren: function(){
		if(this.toggled==false){
		    //turn on this.$children
		    for (each in this.$children){
			this.$children[each].meSeen=true;
			this.toggled=true;
		    }
		    //turn off everyone else's children
		    for(one in this.$parent.$children){
			//create new check for toc

			if (this.$parent.$children[one].id != this.id){
			    for(two in this.$parent.$children[one].$children){
				this.$parent.$children[one].$children[two].meSeen=false;
				//remove activeMonth from everyone else
				this.$parent.$children[one].toggled=false;
			    }							}
			}
		    }
		    else{
			//turn off this.children
			for (each in this.$children){
					this.$children[each].meSeen=false;
					this.toggled=false;
					}
			}
		},
	     tocItemSelected: function() {
		     this.showChildren();
			 if(this.id.pdf_index >= 1){
			     Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
			 }
		 page = 1;
			if(this.id.pieces){
			    for(key in this.id.pieces){
				page = parseInt(this.id.pieces[key].pdf_index);
			     	    Event.$emit("pdf-pageChange",parseInt(this.id.pieces[key].pdf_index))
			     	break
				}
				
			}
		 if(this.id.decls_id){
		     if(!this.id.pdf_index){
			 this.id.pdf_index = page;
		     }
			     Event.$emit("tei-biblChanged", this.id)
		 	}
		}
	},
	 template:`
		<div class="tocItem" v-bind:class='id.type'>
	    	<div class='tocToggle' @click='tocItemSelected'>
            	<div class="tocTitle">{{id.title}}</div>
            	<div v-if='id.auth_name' class="author">{{id.auth_name}}</div>
            	<div v-if='id.start' class="pageNumber"></div>
	    	</div>
	    	<child-piece v-if='id.pieces'  v-for='(piece, index) in  id.pieces' :id='id.pieces[index]' :pieceIndex='index'></child-piece>

        </div>
	 `
});


Vue.component('child-piece',{
	data(){
		return { meSeen:false }
	},
	props:['id','pieceIndex'],
	 methods:{
		tocItemSelected: function() {
		    Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
		    Event.$emit("tei-biblChanged", this.id)
		}
	},
	template:`
		<div v-if="meSeen" class="childPiece" @click='tocItemSelected'>
			<div class="childPieceTitle">{{id.title}}</div>
            <div v-if='id.author' class="childPieceAuthor">{{id.author}}</div>
		<div>
	`

})

Vue.component('zoom-slider',{
	data(){
		return{ 
			zoomLevel: 1.3
		}
	},
	methods:{
		zoomUpdate: function(){
			Event.$emit('zoomUpdate', this.zoomLevel,this.$root.state.issue.page)
	}

	},
	template:`<input class='zoom' id='zoomSlider' min='0' max='2.0' step='0.1' v-model="zoomLevel" @change='zoomUpdate(this.zoomLevel)' type='range'></input>`
})

Vue.component('pdf-viewer',{
    created(){
    Event.$on('zoomUpdate',(level,page)=>{
    	this.scale = level;
    	this.loadPdf(this.current_issue, page,this.scale);
    }),
	Event.$on('nextPage', (page) => {
	    this.current_page += 1;
	    this.loadPdf(this.current_issue, this.current_page);
	}),
	Event.$on('issueSelected', (id) => {
	    this.current_page = 1;
	    this.current_issue = id;
	    this.loadPdf(this.current_issue, this.current_page);
	}),
	Event.$on('pdf-pageChange', (page) => {
	    this.loadPdf(this.current_issue, page);
	})
    },
    data() {
		return {
			scale: 1.3,
	    	current_page: this.$root.state.issue.page,
	    	current_issue: this.$root.state.issue.id
		}
    },
    mounted(){
	this.loadPdf(this.current_issue, this.current_page,this.scale);
    },
    template: `
       <div id="pdf-viewer" class="pdf-div"><canvas id="pdf" class="pdf-canvas"></canvas></div>
	`,
    methods: {
    // reload: function(scale = this.scale){
    // 	page.getViewport(scale);
    // },

	loadPdf: function(issue, page = 1, scale = 1.3) { 
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	    if(this.$root.state.issue.viewMode == 'tei'){
		return;
	    }
	var url = '/storage/broadway-tei/pdf/BroadwayJournal_'+issue+'.pdf';
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
	    //console.log('PDF loaded');
	    if(page > pdf.pdfInfo.numPages){
		return;
	    }
	    // Fetch the first page
	    var pageNumber = parseInt(page);
	    pdf.getPage(pageNumber).then(function(page) {
		//console.log('Page loaded');
		//scale = 1.3
		
		var viewport = page.getViewport(scale);

		// Prepare canvas using PDF page dimensions
		var canvas = document.getElementById('pdf');
		var context = canvas.getContext('2d');
		canvas.height = 1014//viewport.height;
		canvas.width = 735// viewport.width;

		// Render PDF page into canvas context
		var renderContext = {
		    canvasContext: context,
		    viewport: viewport
		};
		var renderTask = page.render(renderContext);
		renderTask.then(function () {
		    //console.log('Page rendered');
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
    created(){
	Event.$on('view-mode-toggled', (to) => {
	    if(to == 'tei'){
		this.id = this.$root.state.issue.id;
		this.getTei(this.id);
	    }
	}),
	Event.$on('issueSelected', (id) => {
	    this.id = id;
	    this.getTei(this.id);
	}),
	Event.$on("tei-biblChanged", (bibl) => {
	    this.getBibl(this.id, bibl.decls_id);
	})
    },
    methods: {
	getTei: function(id){
	    url = '/api/broadwayjournal/'+ id + '/issue-text';
	    axios.get(url).then(response => this.issueText = response.data);
	},
	getBibl: function(issueId, biblId){
	    this.biblId = biblId;
	    this.getTocEntry(issueId, biblId);
	    url = '/api/broadwayjournal/'+ issueId + '/piece-text/' + biblId;
	    axios.get(url).then(response => this.issueText = response.data);
	},
	getTocEntry: function(issueId, itemId){

	    url = '/api/broadwayjournal/' + issueId + '/toc';
            axios.get(url).then((response) => {
		bibl = response.data
		for (item in bibl.toc){
		    if(item == itemId){
			this.biblData = bibl.toc[item]
			return
		    }
		    if(bibl.toc[item].pieces){
			for (piece in bibl.toc[item].pieces){
			    if(piece == itemId){
				this.biblData = bibl.toc[item].pieces[piece]
				return
			    }
			}
		    }
		}
	    });
	}
    },
    mounted() {
	this.issueText = this.getTei(this.$root.state.issue.id);
	this.id = this.$root.state.issue.id
	this.page = this.$root.state.issue.page
    },
	data(){
	    return{
		id: '',
		page:'',
		markdown:[],
		issueText: '',
		biblId: '',
		biblData: {}
	    }
	},
    template: `
      <div class='tei'>
        <div v-if="this.biblData" class='citation'>
        <div class="title">title: {{ this.biblData.title }}</div>
	<div class="title-type">title type: {{ this.biblData.t_type }}</div>
	<div v-if="this.biblData.auth_name" class="author-name">author: {{ this.biblData.auth_name }}</div>
	<div v-if="this.biblData.auth_cert" class="author-certainty">author certainty: {{ this.biblData.auth_cert }}</div>
	<div v-if="this.biblData.auth_stat" class="author-status">author status: {{ this.biblData.auth_stat }}</div>
	<div v-if="this.biblData.pages || this.biblData.page">
	  <div class="page" v-if="this.biblData.pages">pages: {{ this.biblData.pages }}</div>
	  <div class="page" v-else>page: {{ this.biblData.page }}</div>
	</div>
    </div>
	<div class='teiMarkup' v-html="this.issueText"><div>
      </div>
	`
})

Vue.component('issue-month',{
	data(){
	    return {
		toggled: false,
		monthConvert: {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'},
	    }
	},
	props: {month: '',	list: ''},
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
			    }							}
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
					<index-child :id="each" v-for="each in this.list"></index-child>
				</div>`
});

Vue.component('index-child',{
    data() {
	return { meSeen:false }
    },
    props: ['id'],
    methods: {
	selectIssue: function(id){
	    Event.$emit('activeModeChange', 'issue');
	    Event.$emit('issueSelected', id);
	}
    },
    template: `
	<div v-if="meSeen" @click="selectIssue(id)" class="childIndex">
	  <div class="childText" v-text="id.slice(-2)"></div>
	</div>`
});

Vue.component('issue-bar',{
    created(){
	Event.$on('dataLoaded', () => this.hasData = true)
    },
	 data(){
	     return {
		 months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
		 hasData: false

		 }
	 },
    methods:{
	lookupMonth: function(month){
	    monthConvert = {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'}
	    return monthConvert[month]
	},
	lookup: function(month, year){
	    intMonth = this.lookupMonth(month);
	    ret = []
	    for(j in this.$root.journals){
		tmp = this.$root.journals[j]
		if(tmp.month == intMonth && tmp.year == year){
		    ret.push(tmp.id)
		}
	    }
	    return ret
	}
    },
	template: `
		<div v-if="hasData" class="issueBar">
			<div class="issueMask"></div>
				<div class="issueIndex">
					<div class="singleIndex">
						<div class="yearText">1845</div>
						<div class="indicatorYear"></div>
					</div>
	<issue-month v-for="month in this.months" :list='lookup(month,"1845")' class="singleIndex" :month="month"></issue-month>

				</div>
				<div class="issueIndex">
					<div class="singleIndex">
						<div class="yearText">1846</div>
						<div class="indicatorYear"></div>
	</div>
	<!-- todo! clean me up!! -->
	<issue-month :month='this.months[0]' :list='lookup("JAN","1846")' class="singleIndex"></issue-month>
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

			<div class="authorLedgend"></div>
			<div class="authorDirectory">
				<div class="authorDirectory_inner">	
				<author-node v-for="(each,index) in personography" :authInfo="personography[index]" :authID='index'></author-node>
				</div>
							<author-preview :authID='chosen' :authInfo="personography[chosen]"></author-preview>

			</div>

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

		<transition name="fade"><div class="authorModal" v-if="this.$parent.modalActive">  

			<div class="modalContent">
			<div   v-for="(val, key) in authInfo" v-bind:class='key'>{{val}}</div>
			<div v-if='this.$parent.chosen.length  && this.authInfo.totalMentions'  class="mentionNumber">{{this.authInfo.totalMentions.num}}</div>
			<div v-if='this.$parent.chosen.length  && this.authInfo.totalContribs' class="contributionNumber">{{this.authInfo.totalContribs.num}}</div>
						<div @click='closeModal()' class="closeModal">Close</button>

			</div>
		</div>
					</transition>

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
			<transition name="fade">
			<div  v-if='this.$parent.chosen.length'>{{this.authInfo.name}}</div>
			</transition>
		</div>
	`
})

Vue.component('footer-bar',{
	data() {
		return{
			fText: ['This work is licensed under a ','Creative Commons Attribution 4.0 International License','. ','Contact the ','Digital Scholarship Lab',' at LSU Libraries with any questions or comments.']
		}
	},
	template: `
		<div>
			<div class="issueFooter"></div>
			<div class="footerBar">
				<div class="ccText">
					{{fText[0]}}
					<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">{{fText[1]}}</a>
					{{fText[2]}}
					<br>
					{{fText[3]}}
					<a href="mailto:dsl@lsu.edu" target="_blank">{{fText[4]}}</a>
					{{fText[5]}}
				</div>
			</div>
		</div>`
});

window.Event = new Vue();

new Vue({
	el:'#container',
    methods: {
	getTocEntry: function(issueId, itemId){

	    url = '/api/broadwayjournal/' + issueId + '/toc';
            axios.get(url).then((response) => {
		bibl = response.data
		for (item in bibl.toc){
		    if(item == itemId){
			return bibl.toc[item]
		    }
		    if(bibl.toc[item].pieces){
			for (piece in bibl.toc[item].pieces){
			    if(piece == itemId){
				return bibl.toc[item].pieces.piece
			    }
			}
		    }
		}
	    });
	}
    },
    data: {
	visibility: 'normal',
    journals:[],
	years: [],
	state: {
	    active: 'meta', // issue | meta
	    meta: {
		content: 'about', // about | tech | credits
	    },
	    issue: {
		id: '18450104', // yyyy-mm-dd
		viewMode: 'pdf', // tei|pdf
		page: 1, // int
	    },
	}		
    },
    created() {
	Event.$on('content', (name) => {
	    this.state['meta']['content'] = name;
	})
	Event.$on('view-mode-toggled', (to) => this.state.issue.viewMode = to)
	Event.$on('activeModeChange', (mode) => this.state.active = mode )
	Event.$on('issueSelected', (id) => {
	    this.state.issue.id = id;
	    this.state.issue.page = 1;
	})
	Event.$on('pdf-pageChange', (page) => {
    	    this.state.issue.page = page;
	})
	Event.$on('tei-biblChanged', (id) => this.state.issue.page = parseInt(id.pdf_index))
	axios.get('/api/all-issues/json').then((response) => {
	    this.journals = response.data;

	    for (issue in this.journals){
		id = this.journals[issue]
		let iid   = Util.datePartsForIssueId(id);
		this.journals[issue] = {
		    'id':id,
		    'year': iid.year,
		    'month': iid.month,
		    'day': iid.day,
		}
		if(this.years.indexOf(iid.year) == -1){
		    this.years.push(iid.year)
		}
	    }
	    Event.$emit('dataLoaded')
	});
    },
});

