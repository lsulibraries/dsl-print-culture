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

Vue.component('container', {
    created() {
	Event.$on('toggleContrast', () => {
	    this.contrast = this.$root.state.contrast;
	})
    },
    methods: {
	contrastString: function () {
	    return this.$root.state.contrast + 'Contrast'
	}
    },
    template: `
        <div id="container" v-bind:class="contrastString()">
          <vue-header></vue-header>
	  <vue-content></vue-content>
	  <vue-footer></vue-footer>
	</div>
	`,
})

Vue.component('vue-header',{
    template: `
        <div class="header">
	  <button @click='toggleContrast'>Vis</button>
          <headerLogo></headerLogo>
	  <headerNav></headerNav>
          <headerTitle></headerTitle>
        </div>
	`,
    methods: {
	toggleContrast: function (){
	    this.$root.state.contrast = this.$root.state.contrast == 'high' ? 'normal' : 'high';
	    Event.$emit('toggleContrast');
	},
    }
})

Vue.component('headerLogo',{
    template: `
	<div class="headerLogo">
          <img src="images/libraries_logo.png"></img>
        </div>
    `
})

Vue.component('headerNav',{
    data() {
	return {
	    content: this.$root.state.activeContent
	}
    },
    computed:{
    	dlLabel: function(){
    	    if(this.$root.state.content.issue.viewer == 'pdf'){
    		return 'PDF'
    	    }
    	    else{
    		return 'TEI'
    	    }
    	}
    },
    methods: {
	activeContentClicked: function(content) {
	    Event.$emit('activeContentChange', content)
	}
    },
    template: `
	<div class='headerNav'>
	  <div @click="activeContentClicked('issues')">Explore Issues</div>
	  <div @click="activeContentClicked('abouts')">About</div>
	  <div @click="activeContentClicked('personography')">Explore People</div>
	  <input>Search</input>
	</div>
	`
});

Vue.component('headerTitle',{
    template: `
	<div class="headerTitle">The Broadway Journal</div>
    `
})

Vue.component('vue-footer',{
    template: `<div class='footer'>
    </div>`
})

Vue.component('vue-content',{
    template: `
        <div class="content">
	  <abouts v-if="this.$root.state.activeContent == 'abouts'"></abouts>
	  <issue v-if="this.$root.state.activeContent == 'issues'"></issue>
	  <personography  v-if="this.$root.state.activeContent == 'personography'"></personography>
	  <searchResults  v-if="this.$root.state.activeContent == 'search'"></searchResults>
        </div>
	`,
})

Vue.component('personography',{
    data(){
	return {
	    modalActive:false,
	    personography:[],
	    chosen: '',
	}
    }
    template: `
        <div class="personography">
	  <personFilter></personFilter>
	  <personIndex></personIndex>
        </div>
    `
})

Vue.component('personIndex', {
    template: `
	<div class='personIndex' v-if="this.personIndex">
          <person v-for="personObject in this.personIndex" person="personObject"></person>
        </div>
	`,
    created() {
	axios.get('/api/personography/summary/json').then(response => this.personIndex = response.data);
    }
})

Vue.component('personFilter', {
    template: `
	<div class='personFilter'>Person Filter...</div>
    `
})

Vue.component('person', {
    template: `
	<div class='person'>Person...</div>
    `
})

Vue.component('searchResults',{
    template: `
	<div class="searchResults">___________SEARCH RESULTS____________
          <searchResult></searchResult> ...
        </div>
	
    `
})

Vue.component('searchResult',{
    props: ['issueId', 'pieceId'],
    methods: {
	resultClicked: function(){
	    console.log('resultClicked ' + this.issueId + this.pieceId)
	}
    },
    template: `
	<div class="searchResult">___________SEARCH RESULT____________
	<div class="context"></div>
	<div class="pieceTitle" @click="resultClicked">Click me</div>
	</div>
    `
})

Vue.component('issueViewer',{
    template: `
	<div class="viewer">
	  <pdf-viewer v-if="viewer == 'pdf'"></pdf-viewer>
	  <tei-markup v-if="viewer == 'tei'"></tei-markup>
	</div>
	`,
        data() {
	return {
	    viewer: this.$root.state.content.issue.viewer,
	}
    },
    created() {
	Event.$on('viewerSelected', (viewer) => {
	    this.viewer = viewer
	})
    },
})

Vue.component('issue',{
    template: `
    <div class="issue">
	<interIssueNav></interIssueNav>
	<viewerSelector></viewerSelector>
	<issueHeader></issueHeader>
	<issueViewer></issueViewer>
    </div>
	`,
})

Vue.component('issueHeader', {
    data() {
	return {
	    dlLabel: 'Hello Download',
	    bibl_data: {},
	    ppm: '',
	    biblId: 's1',
	}
    },
    created() {
	Event.$on('tei-biblChanged', (bibl_obj) => {
	    ppm_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/ppm';
	    axios.get(ppm_url).then(response => this.ppm = response.data);
	    this.biblId = bibl_obj.decls_id
	})
	Event.$on('issueSelected', (id) => {
	    bibl_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/bibl_data';
	    axios.get(bibl_url).then(response => this.bibl_data = response.data);
	})
    },
    template: `
	<div class="issueHeader" v-if="this.bibl_data">
	  <div class="bibl">
  	    <div class="issueMeta" v-if="this.bibl_data.issueMeta">
	      <div class="issueDate">{{this.bibl_data.issueMeta.issueDate}}</div>
	      <div class="issueVol">Vol. {{this.bibl_data.issueMeta.issueVol}}</div>
	      <div class="issueNum">No. {{this.bibl_data.issueMeta.issueNum}}</div>
	    </div>
	  </div>
	  <div class="sectionMeta">
            <div class="sectionTitle" v-if="this.bibl_data[this.biblId]">{{sectionTitle(this.biblId)}}</div>
          </div>
	  <div class="pieceMeta" v-if="this.bibl_data[this.biblId]">
            <div class="pieceTitle">{{this.pieceMeta('pieceTitle')}}</div>
	    <div class="pieceAuthor">{{this.authorMeta('personName')}}</div>
	    <div class="pieceAuthorRole">{{this.authorMeta('personPieceRole')}}</div>
	    <div class="pieceAuthorShip">{{this.authorMeta('authorShip')}}</div>
          </div>
    	  <a v-bind:href='stateHref()' download>Download {{dlLabel}}</a>
	</div>
	`,
    methods: {
	pieceMeta: function (attribute){
	    if(this.bibl_data[this.biblId].sectionMeta){
		return ''
	    }
	    return this.bibl_data[this.biblId].pieceMeta[attribute]
	},
	authorMeta: function (attribute){
	    if(!this.bibl_data[this.biblId].pieceMeta){
		return
	    }
	    ppmId = this.bibl_data[this.biblId].pieceMeta.pieceListPerson.person.personPieceMetaId
	    ppm = this.ppm[ppmId]
	    return ppm[attribute]

	},
	stateHref:function(){
	    let iid   = Util.datePartsForIssueId(this.$root.state.content.issue.id);
	    let format = this.$root.state.content.issue.viewer
	    return `/broadwayjournal/issue/${iid.year}/${iid.month}/${iid.day}/${format}`
	},
	sectionTitle: function(biblId) {
	    bibl = this.bibl_data[biblId]

	    if(this.biblIsSection(biblId)){
		return bibl.sectionMeta.sectionTitle
		
	    }else if(this.biblBelongsToSection(biblId)){
		return this.bibl_data[bibl.sectionId].sectionMeta.sectionTitle
	    }else{
		return ''
	    }
	},
	biblIsSection: function(biblId) {
	    if(this.bibl_data[biblId].sectionMeta){
		return true
	    }
	    return false
	},
	biblBelongsToSection: function(biblId) {
	    if(this.bibl_data[biblId].sectionId){
		return true
	    }
	    return false
	}
    },
    mounted() {
	Event.$emit('issueSelected', this.$root.state.content.issue.id)
    }
})

Vue.component('logo', {
    template: `
	<div class="logo" v-if="this.$root.state.active != 'issue'">
	  <div class="logoThe">The</div>
	  <div class="logoBroadway">Broadway</div>
	  <div class="logoJournal">Journal</div>
	  <div class="logoSubtitle">A Digital Edition</div>
	</div>
    `
})

Vue.component('abouts',{
    template: `

      <div class="abouts">

        <logo></logo>
	<div @click="selectMe('about')">About</div>
	<div @click="selectMe('tech')">Technical</div>
	<div @click="selectMe('credit')">Credits</div>
	<div v-if="this.abouts == 'about'">
	
	        {{ aboutText[0] }}
	        <br/>
	        {{ aboutText[1] }}
        </div>
	      <div v-if="this.abouts == 'tech'">
	        <li v-for="each in techText"  v-text="each"></li>
	      </div>
	      <div v-if="this.abouts == 'credit'">
	        <li v-for="each in creditText" v-text="each"></li>
	      </div>
	    </div>
	`,
    data() {
	return {
	    abouts: this.$root.state.content.abouts,
	    aboutText: ['The Broadway Journal (1845-46), one of the four principal magazines that Edgar Allan Poe helped to edit, is here offered in a digital edition. This edition uses Poe’s career as a magazinist as an entry point into antebellum author networks.','In addition to the corrected pages of the journal available for viewing, this project uses the Text Encoding Initiative (TEI) to identify the author of each piece in the 48 issues, including anonymous, pseudonymous, and unidentified works. As a result, readers can see which authors were published and how frequently, and how they were identified - or not.'],
	    creditText: ['Lauren Coates','TEI markup: The Graduate Students','design and css: Kyle Tanglao','vue.js: Will Conlin','server backend: Jason Peak'],
	    techText: ['TEI is Great','vue.js is reactive!','aws deployed!','php served','laravel inspired','html 5','css','linux deployed'],
	}
    },
    methods: {
    	selectMe: function(about) {
	    this.abouts = about;
	    Event.$emit('aboutsSelected', this.abouts);
	}
    }
})


Vue.component('viewerSelector',{
    created(){
    	Event.$on('viewerSelected', (viewer) =>{
    		if(viewer == 'tei'){
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
	<div class='viewerSelector'>
	<viewerSelectorButton  kind="tei">Text</viewerSelectorButton>
	<span>&nbsp;|&nbsp; </span>
	<viewerSelectorButton kind='pdf'>PDF</viewerSelectorButton>
	</div>
	`
});

Vue.component('viewerSelectorButton',{
	data(){
	    return {
		active: false,
	    }
	},
	props: ['kind'],
	methods: {
	    viewerSelected: (viewer) => {
		Event.$emit('viewerSelected', viewer);  	
	    }
	    
	},
    template: `<span v-bind:class="[{toggled: active}, kind]"  @click="viewerSelected(kind)"><slot></slot></span>`
})


Vue.component('intraIssueNav',{
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
	<div class='intraIssueNav'>
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
		     Event.$emit("pdf-pageChange", parseInt(this.id.pdf_index))
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
	    	current_page: this.$root.state.content.issue.page,
	    	current_issue: this.$root.state.content.issue.id
		}
    },
    mounted(){
	this.loadPdf(this.current_issue, this.current_page,this.scale);
    },
    template: `
      <div id="pdf-viewer" class="pdf-viewer">
	<button class="next-page" @click="changePage('prev')">Prev Page</button>
	<zoom-slider></zoom-slider>
	<button class="next-page" @click="changePage('next')">Next Page</button>
	<canvas id="pdf" class="pdf-canvas"></canvas>
      </div>
	`,
    methods: {
    // reload: function(scale = this.scale){
    // 	page.getViewport(scale);
    // },
	changePage: function (direction) {
	    page = this.$root.state.content.issue.page;
	    switch (direction) {
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
	loadPdf: function(issue, page = 1, scale = 1.3) { 
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	    if(this.$root.state.content.issue.viewer == 'tei'){
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
	Event.$on('issueSelected', (id) => {
	    this.id = id;
	    this.getText();
	}),
	Event.$on("tei-biblChanged", (bibl) => {
	    this.biblId = bibl.decls_id;
	    this.getText(this.bibl);
	})
    },
    methods: {
	getText: function(){
	    if(this.biblId){
		url = '/api/broadwayjournal/'+ this.id + '/piece-text/' + this.biblId;
		axios.get(url).then(response => this.issueText = response.data);
	    }else {
		url = '/api/broadwayjournal/'+ this.id + '/issue-text';
		axios.get(url).then(response => this.issueText = response.data);
	    }
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
				this.biblData = bibl.toc[item].pieces.piece
				return
			    }
			}
		    }
		}
	    });
	}
    },
    mounted() {

	this.id = this.$root.state.content.issue.id
	this.biblId = this.$root.state.content.issue.decls_id
	this.page = this.$root.state.content.issue.page
	this.getText()

    },
	data(){
	    return{
		id: '',
		page:'',
		markdown:[],
		issueText: '',
		biblId: '',
		biblData: {},
	    }
	},
    template: `
      <div class='tei-markup'>
        <div v-if="this.biblData" class='citation'>
        <div class="title">title: {{ this.biblData.title }}</div>
	<div class="title-type">title type: {{ this.biblData.t_type }}</div>
	<div class="author-name">author: {{ this.biblData.auth_name }}</div>
	<div class="author-certainty">author certainty: {{ this.biblData.auth_cert }}</div>
	<div class="author-status">author status: {{ this.biblData.auth_stat }}</div>
	<div class="page" v-if="this.biblData.page">page: {{ this.biblData.page }}</div>
	<div class="page" v-if="this.biblData.pages">pages: {{ this.biblData.pages }}</div>
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
	created(){
		Event.$on('issueSelected',(id) =>{
			for(each in this.$children){	
				if(this.$children[each].id==id){
	    			this.$children[each].toggled=true;
	    		}else{this.$children[each].toggled=false;}
			}
		})
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
	return { meSeen:false,toggled:false }
    },
    props: ['id'],
    methods: {
	selectIssue: function(id){
	    Event.$emit('issueSelected', id);
	}
    },
    template: `
	<div v-if="meSeen" @click="selectIssue(id)" class="childIndex">
	  <div v-bind:class="[{active: toggled}, 'childText']" v-text="id.slice(-2)"></div>
	</div>`
});

Vue.component('interIssueNav',{
    data(){
	return {
	    months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
	    hasData: this.$root.journals ? true : false
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
		<div v-if="hasData" class="interIssueNav">
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
	<issue-month :month='this.months[0]' :list='lookup("JAN","1846")' class="singleIndex"></issue-month>
			</div>
	<intraIssueNav></intraIssueNav>	
    </div>
		`
});

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
	el:'#vue-root',
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
	journals:[],
	years: [],
	state: {
	    activeContent: 'abouts', // issue| personography | search
	    content: {
		abouts: 'about', // technical | credits
		issue: {
		    id: '18450104', // yyyy-mm-dd
		    viewer: 'pdf', // text|pdf
		    page: 1, // int
		    decls_id: ''
		},
		personography: {
		    filterString: '', // ie eapoe
		},
		searchResults:{
		    filter:'', // alpha | by date
		    query: '', //eapoe
		},

	    },
	    contrast: 'normal', // high
	}		
    },
    created() {
	Event.$on('aboutsSelected', (about) => {
	    this.state.content.abouts = about;
	})
	Event.$on('viewerSelected', (viewer) => this.state.content.issue.viewer = viewer)
	Event.$on('activeContentChange', (content) => this.state.activeContent = content )
	Event.$on('issueSelected', (id) => {
	    this.state.content.issue.id = id;
	    this.state.content.issue.page = 1;
	})
	Event.$on('pdf-pageChange', (page) => {
    	    this.state.content.issue.page = page;
	})
	Event.$on('tei-biblChanged', (id) => {
	    this.state.content.issue.page = parseInt(id.pdf_index)
	    this.state.content.issue.decls_id = id.decls_id
	})
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
	});
    },
});

