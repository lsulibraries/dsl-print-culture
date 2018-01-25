import './bootstrap'
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

Vue.component('biblPersonPieceMeta',{
    template: `
    <div class="personPieceMeta">
    <!--
    <div class="authorRole">{{personPieceMeta.personPieceRole}}</div>
    -->
    <div class="authorShip" v-if="showAuthorship()" :title="this.getAuthorshipTitle()">{{this.getAuthorship()}}</div>
    </div>
    `,
    props: ['personPieceMeta'],
    methods: {
        showAuthorship: function () {
            let hasValue     = !this.$root.empty(this.personPieceMeta.personPiecePseudo)
            if(hasValue){
                return true
            }
            return false
        },
        hasUnusualAuthorship: function () {
           attested = this.personPieceMeta.authorShip.authorStatus == 'attested'
           totallyCertain = this.personPieceMeta.authorShip.authorCertainty == 'high'
           return !(attested && totallyCertain)
        },
        getAuthorship: function () {
            return this.personPieceMeta.personPiecePseudo
        },
        getAuthorshipTitle() {
            return !this.$root.empty(this.personPieceMeta.authorShip) ? this.personPieceMeta.authorShip : ''
        }

    }
})

Vue.component('biblPieceMeta', {
    template: `
    <div class="pieceMeta">
        <div @click="$emit('close')">
            <router-link :to="this.getIssueLink()" tag='h1'>{{pieceMeta.pieceTitle}}</router-link>
        </div>
    </div>
    `,
    props: ['pieceMeta', 'issueId'],
    methods: {
        getIssueLink: function () {
            return '/issues/' + this.issueId + '/' + this.pieceMeta.pieceId
        },
        goToPiece: function () {
            this.$root.state.content.issue.id = this.issueId
            this.$root.state.content.issue.decls_id = this.pieceMeta.pieceId
            this.$root.state.content.issue.page = parseInt(this.pieceMeta.piecePdfIndex)

            Event.$emit('activeContentChange', 'issues')
            Event.$emit('close')
            Event.$emit('issueBiblSelected', {
                issueId: this.issueId,
                pdf_index: this.pieceMeta.piecePdfIndex,
                decls_id: this.pieceMeta.pieceId
            })
        },
    }
})

Vue.component('searchResults',{
    template: `
	<div class="searchResults">
	  <div class="searchResultsHeader" v-if="this.results.searchResult">
	    <div class="searchResultsTitle">Search Results</div>
            <div class="searchResultsCount">{{this.searchResultCount()}}</div>
            <div class="searchResultsString">{{this.searchString}}</div>
      	  </div>
          <searchResult v-for="result in results.searchResult" :result="result" :searchString="searchString"></searchResult>
        </div>
    `,
    data(){
	return {
	    results: {},
	    searchString: this.$root.state.content.searchString
	}
    },
    created() {
	this.executeSearch()
	Event.$on('searchSubmitted', (searchString) => {
	    this.searchString = searchString
	    this.executeSearch()
	})
    },
    methods: {
	searchResultCount: function() {
	    return this.results.searchResult.length
	},
	executeSearch: function() {
	    search_url = '/api/broadwayjournal/issue/search/' + this.searchString;
	    axios.get(search_url).then(response => this.results = response.data);	    
	}
    }
})

Vue.component('searchResult',{
    props: ['result', 'searchString'],
    methods: {
	resultClicked: function(){
	    this.$root.state.content.issue.id = this.result.issueMeta.issueId
	    this.$root.state.content.issue.decls_id = this.result.pieceMeta.pieceId

	    Event.$emit('activeContentChange', 'issues')
	    Event.$emit('issueBiblSelected', {
		issueId: this.result.issueMeta.issueId,
		pdf_index: 1,
		decls_id: this.result.pieceMeta.pieceId
	    })
	},
	pieceTitle: function() {
	    if(this.$root.empty(this.result.pieceMeta.pieceTitle)){
		return "---No title found---"
	    }
	    return this.result.pieceMeta.pieceTitle
	},
    },
    template: `
	<div class="searchResult" @click="resultClicked">
	  <div class="pieceTitle"><strong>{{this.pieceTitle()}}</strong></div>
            <div class="context">{{this.result.contextBefore}}<span class="searchHit">{{this.result.hit}}</span>{{this.result.contextAfter}}</div>
	</div>
    `
})

Vue.component('issueViewer',{
    template: `
	<div class="viewer">
	  <transition name="fade"><pdf-viewer v-if="viewer == 'pdf'"></pdf-viewer></transition>
	  <transition name="fade"><tei-markup v-if="viewer == 'text'" :issue="this.issueId" :bibl="this.biblId"></tei-markup></transition>
	</div>
	`,
    data() {
        return {
            viewer: this.$root.state.content.issue.viewer,
        }
    },
    props: ['issueId', 'biblId'],
    created() {
    	Event.$on('viewerSelected', (viewer) => {
    	    this.viewer = viewer
    	})
    },
})

Vue.component('logo', {
    template: `
	<div class="logo" v-if="this.$root.state.active != 'issue'">
	  <h1><div class="logoThe">The</div>
	  <div class="logoBroadway">Broadway</div>
	  <div class="logoJournal">Journal</div></h1>
	  <div class="logoSubtitle">A Digital Edition</div>
	</div>
    `
})

Vue.component('viewerSelector',{
    created(){
    	Event.$on('viewerSelected', (viewer) =>{
	    this.active = viewer
    	})

    },
    template: `
	<div class='viewerSelector' v-bind:class="{pdfSelected: pdfSelected}" @click="toggleViewer">
          <div class="viewerTitle">Toggle View</div>
          <div class="viewerSwitch">
            <div class="viewerText">
              <div class="viewerTextIcon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>
              <div class="viewerTextLabel">Text</div>
            </div>
            <div class="viewerPdf">
              <div class="viewerPdfIcon"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>
              <div class="viewerPdfLabel">PDF</div>
            </div>
          </div>
	</div>
	`,
    methods: {
	isActive: function(viewerType){
	    return viewerType == this.active
	},
	toggleViewer: function(){
	    this.pdfSelected = !this.pdfSelected
	    this.active = this.active == 'pdf' ? 'text' : 'pdf'
	    Event.$emit('viewerSelected', this.active)
	}
    },
    data(){
	return {
	    active: this.$root.state.content.issue.viewer,
	    pdfSelected: false
	}
    }
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
        return {
            issueId: '',
            tocContent: false
        }
    },
    created() {
        // order matters here; see conditional in called fn.
    	this.setTocContent()
        this.issueId = this.$route.params.id
    },
    methods: {
        setTocContent: function () {
            if(this.issueId !== this.$route.params.id) {
                this.tocContent = false
                this.issueId = this.$route.params.id
                let url = '/api/broadwayjournal/' + this.issueId + '/toc';
                axios.get(url).then(response => this.tocContent = response.data);
            }
        },
    },
    watch: {
        '$route': 'setTocContent'
    },
	template:`
	<div class='intraIssueNav'>
          <div class='tocDropdown'>Table of Contents</div>
          <toc-item  v-for='id in tocContent.toc' :id='id'></toc-item>
        </div>
			`
})

Vue.component('toc-item',{
	 data(){
	 	return { 
            toggled:false,
            issueId: 18450104
        }
	 },
	 props:['id'],
     created() {
        if(this.$route.params.id) {
            this.issueId = this.$route.params.id
        }
     },
	 methods:{
	    showChildren: function(){
		if(this.toggled==false){
		    //turn on this.$children
		    for (let each in this.$children){
			this.$children[each].meSeen=true;
			this.toggled=true;
		    }
		    //turn off everyone else's children
		    for(let one in this.$parent.$children){
			//create new check for toc

    			if (this.$parent.$children[one].id != this.id){
    			    for(let two in this.$parent.$children[one].$children){
    				this.$parent.$children[one].$children[two].meSeen=false;
    				//remove activeMonth from everyone else
    				this.$parent.$children[one].toggled=false;
    			    }							}
    			}
		    }
		    else{
			//turn off this.children
			for (let each in this.$children){
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
		 let page = 1;
		 if(this.id.pieces){
		     for(const key in this.id.pieces){
			 page = parseInt(this.id.pieces[key].pdf_index);
			 Event.$emit("pdf-pageChange",parseInt(this.id.pieces[key].pdf_index))
			 break
		     }
		 }
		 if(this.id.decls_id){
		     if(!this.id.pdf_index){
			 this.id.pdf_index = page;
		     }
		     this.id.issueId = this.$root.state.content.issue.id
		     Event.$emit("issueBiblSelected", this.id)
		 }
	     },
        getLink: function() {
            const issueId = this.issueId
            const  biblId  = this.id.decls_id
            return '/issues/' + issueId + '/' + biblId;
        }
	},
    template:`
        <div class="tocItem" v-bind:class='id.type'>
            <router-link :to="this.getLink()" class="childPiece" @click='tocItemSelected' tag='div'>
                <div class="tocTitle">{{id.title}}</div>
                <div v-if='id.auth_name' class="author">{{id.auth_name}}</div>
                <div v-if='id.start' class="pageNumber"></div>
            </router-link>
            <child-piece v-if='id.pieces'  v-for='(piece, index) in  id.pieces' :id='id.pieces[index]' :pieceIndex='index'></child-piece>
        </div>
	 `
});


Vue.component('child-piece',{

	data(){
		return {

            issueId: '',
        }
	},

    watch: {
        '$route': 'fetchData'
    },

	props:['id','pieceIndex'],

    created() {
        this.issueId = this.$route.params.id
    },

    methods:{
        fetchData: function() {
            this.issueId = this.$route.params.id
        },
		tocItemSelected: function() {
		    Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
		    this.id.issueId = this.$root.state.content.issue.id
		    Event.$emit("issueBiblSelected", this.id)
		},
        getLink: function() {
            return '/issues/' + this.issueId + '/' + this.pieceIndex;
        }
	},

    template:`
        <router-link :to="this.getLink()" class="childPiece" @click='tocItemSelected' tag='div'>
          <div class="childPieceTitle">{{id.title}}</div>
          <div v-if='id.author' class="childPieceAuthor">{{id.author}}</div>
        </router-link>`
})

Vue.component('zoom-slider',{
	data(){
		return{
			zoomLevel: 1.3
		}
	},
	methods:{
		zoomUpdate: function(){
			Event.$emit('zoomUpdate', this.zoomLevel,this.$root.state.content.issue.page)
	}

	},
	template:`<input class='zoom' id='zoomSlider' min='1.3' max='3.0' step='0.1' v-model="zoomLevel" @change='zoomUpdate(this.zoomLevel)' type='range'></input>`
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
	Event.$on('issueBiblSelected', (bibl) => {
	    this.current_issue = bibl.issueId
	    this.current_page = bibl.pdf_index
//	    this.loadPdf(this.current_issue, bibl.pdf_index);
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
	this.loadPdf(this.current_issue, this.current_page, this.scale);
    },
    template: `
      <div id="pdf-viewer" class="pdf-viewer">
	<button class="next-page" @click="changePage('prev')" v-if="this.$root.state.content.issue.page>1" >Prev Page</button>
	<button class="next-page" @click="changePage('next')" v-if="this.$root.state.content.issue.page<16">Next Page</button>
	<canvas id="pdf" class="pdf-canvas"></canvas>
      </div>
	`,	//<zoom-slider></zoom-slider>
    methods: {
    // reload: function(scale = this.scale){
    // 	page.getViewport(scale);
    // },
	changePage: function (direction) {

	    page = this.$root.state.content.issue.page;
	    switch (direction) {
                case 'next':
                    if(page == 16){break;}
		    else{
                        page += 1;
                        //console.log(page);
		        break;
                    }
	        case 'prev':
                    if(page == 1){break;}
		    else{
                        page -= 1;
                        //console.log(page);
		        break;
                    }
	        default:
		    page = 1;
	        }
	    page = page <= 1 ? 1 : page;
	    Event.$emit('pdf-pageChange', page);

	},
	loadPdf: function(issue, page = 1, scale = 1.3) { 
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	    if(this.$root.state.content.issue.viewer == 'text'){
		return;
	    }
	var url = '/storage/broadway-tei/pdf/BroadwayJournal_'+issue+'.pdf';
	// var pdfData = atob($pdf);

        // Prepare canvas using PDF page dimensions
	var canvas = document.getElementById('pdf');
        var new_canvas = document.createElement('canvas');
        new_canvas.setAttribute("id", "pdf");
        new_canvas.setAttribute("refs", "replaced");
        canvas.parentNode.replaceChild(new_canvas, canvas);
	PDFJS.disableWorker = true;

	// The workerSrc property shall be specified.
	PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

	// Asynchronous download of PDF
	var loadingTask = PDFJS.getDocument(url);
	loadingTask.promise.then(function(pdf) {
	    if(page > pdf.pdfInfo.numPages){
		return;
	    }
	    // Fetch the first page
	    var pageNumber = parseInt(page);
	    pdf.getPage(pageNumber).then(function(page) {
		//scale = 1.3
		var viewport = page.getViewport(scale);
		var canvas = document.getElementById('pdf');
		var context = canvas.getContext('2d');
		canvas.height = viewport.height; //1014
		canvas.width = viewport.width; //735

		// Render PDF page into canvas context
		var renderContext = {
		    canvasContext: context,
		    viewport: viewport
		};
		var renderTask = page.render(renderContext);
		renderTask.then(function () {
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
    props: ['issue', 'bibl'],
    created(){
        if (this.$route) {
            if(this.$route.params.id) {
                this.issueId = this.$route.params.id
            }
            if (this.$route.params.biblid) {
                this.biblId = this.$route.params.biblid
            }
        }

        this.page = this.$root.state.content.issue.page
        this.getText()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function() {
            this.issueId = this.$route.params.id

            if(this.$route.params.id && this.$route.params.biblid) {
                this.biblId = this.$route.params.biblid
            }
            else { // no biblId supplied in the route
                this.biblId = false
            }
            this.page = this.$root.state.content.issue.page
            this.getText()
        },
	highlightText: function(){
	    let needle = this.$root.state.content.searchString
	    if(needle.length < 1){
		  return this.issueText
        }
	    //Thanks !! http://stackoverflow.com/questions/29433696/create-regex-from-variable-with-capture-groups-in-javascript
	    pattern = new RegExp('('+needle+')', 'gi')
	    return this.issueText.replace(pattern, "<span class='searchHit'>$1</span>")
	},
	getText: function(){
	    if(this.biblId){
		  let url = '/api/broadwayjournal/'+ this.issueId + '/piece-text/' + this.biblId;
		  axios.get(url).then(response => this.issueText = response.data);
	    }else {
            this.issueText = ''
		// url = '/api/broadwayjournal/'+ this.id + '/issue-text';
		// axios.get(url).then(response => this.issueText = response.data);
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


    },
	data(){
	    return{
            issueId: '',
            page:'',
            markdown:[],
            issueText: '',
            // biblId: '',
            biblData: {},
	    }
	},
    template: `
        <div class='tei-markup'>
            <div class='teiMarkup' v-html="this.highlightText()"></div>
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
			for(let each in this.$children){
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
		    for (let each in this.$children){
			this.$children[each].meSeen=true;
			this.toggled=true;
		    }
		    //turn off everyone else's children
		    for(let one in this.$parent.$children){
			if (this.$parent.$children[one].list != this.list){
			    for(let two in this.$parent.$children[one].$children){
				this.$parent.$children[one].$children[two].meSeen=false;
				//remove activeMonth from everyone else
				this.$parent.$children[one].toggled=false;
			    }							}
			}
		    }
		    else{
			//turn off this.children
			for (let each in this.$children){
					this.$children[each].meSeen=false;
					this.toggled=false;
					}
			}
		}
	},
        template: `
            <div v-bind:class="{activeMonth: toggled}">
              <div @click="showChildren()">
                <div class="singleText" >{{this.month}}</div>
                <div class="indicatorIndex"></div>
              </div>
              <index-child :id="each" v-for="each in this.list"></index-child>
            </div>
        `
});

Vue.component('index-child',{
    data() {
        return { 
            meSeen:false,
            toggled:false,
        }
    },
    props: ['id'],
    methods: {
        selectIssue: function(){
            this.toggled = this.$route.params.id == this.id
        },
        getLink: function () {
            return '/issues/' + this.id
        },
    },
    watch: {
        '$route': 'selectIssue'
    },
    template: `
    <div v-if="meSeen" @click="selectIssue(id)" class="childIndex">
        <router-link :to="getLink()" tag='div'>
            <div v-bind:class="[{active: toggled}, 'childText']" v-text="id.slice(-2)"></div>
        </router-link>
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
	    let monthConvert = {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'}
	    return monthConvert[month]
	},
	lookup: function(month, year){
	    let intMonth = this.lookupMonth(month);
	    let ret = []
	    for(const j in this.$root.journals){
		let tmp = this.$root.journals[j]
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

//Author-Modal Is UNUSED
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
                <div v-for="(val, key) in authInfo" v-bind:class='key'>{{val}}</div>
                <div v-if='this.$parent.chosen.length  && this.authInfo.totalMentions'  class="mentionNumber">{{this.authInfo.totalMentions.num}}</div>
                <div v-if='this.$parent.chosen.length  && this.authInfo.totalContribs' class="contributionNumber">{{this.authInfo.totalContribs.num}}</div>
                <div @click='closeModal()' class="closeModal">Close</button>
              </div>
            </div></transition>
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


// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// import App from './views/App'
// import Hello from './views/Hello'
// import Home from './views/Home'

// const router = new VueRouter({
//     mode: 'history',
//     routes: [
//         // {
//         //     path: '/',
//         //     name: 'home',
//         //     component: mainComponent
//         // },
//         // {
//         //     path: '/hello',
//         //     name: 'hello',
//         //     component: Hello,
//         // },
//     ],
// });

window.Event = new Vue();

import Vue from 'vue';
import axios from 'axios';
import Container from './components/Container'
import router from './routes';

new Vue({
	el:'#vue-root',
    components: { Container },
    router,
    methods: {
	empty: function (o) {
	    if(o === undefined){
		return true
	    }
	    if(Object.keys(o).length === 0 && o.constructor === Object){
		return true
	    }
	    return false
	},
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
	    activeContent: 'abouts', // issues | personography | search
	    content: {
		abouts: 'about', // technical | credits
		issue: {
		    id: '18450104',//'18450104', // yyyy-mm-dd
		    viewer: 'text', // text|pdf
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
		searchString: ''
	    },
	    contrast: 'normal', // high
	},
	xhrDataStore: {
	    abouts: {
		about: '',
		tech: '',
		credits: {}
	    },
	    personography: {}
	},
    },
    created() {
	Event.$on('aboutsSelected', (about) => {
	    this.state.content.abouts = about;
	})
	Event.$on('viewerSelected', (viewer) => this.state.content.issue.viewer = viewer)
	Event.$on('activeContentChange', (content) => {
	    this.state.activeContent = content
	})
	Event.$on('issueSelected', (id) => {
	    this.state.content.issue.id = id;
	    this.state.content.issue.page = 1;
	    this.state.content.issue.decls_id = '';
	    this.state.content.searchString = '';
	})
	Event.$on('issueBiblSelected', (bibl) => {
	    this.state.content.issue.id = bibl.issueId
	    this.state.content.issue.decls_id = bibl.decls_id
	})
	Event.$on('pdf-pageChange', (page) => {
    	    this.state.content.issue.page = page;
	})
	Event.$on('searchSubmitted', (searchString) => {
	    this.state.content.searchString = searchString
	})
	// get abouts data
	axios.get('/api/broadwayjournal/abouts/credits').then(response => this.xhrDataStore.abouts.credits = response.data);
	axios.get('/api/broadwayjournal/abouts/about').then(response => this.xhrDataStore.abouts.about = response.data);
	axios.get('/api/broadwayjournal/abouts/tech').then(response => this.xhrDataStore.abouts.tech = response.data);
	axios.get('/api/broadwayjournal/abouts/personography').then(response => this.xhrDataStore.abouts.personographyDescription = response.data);

	axios.get('/api/BroadwayJournal/personography/comprehensive/json').then(response => {
        this.xhrDataStore.personography = response.data;
        Event.$emit('personographyLoaded', this.xhrDataStore.personography);
        });

	axios.get('/api/all-issues/json').then((response) => {
	    this.journals = response.data;

	    for (var issue in this.journals){
		var id = this.journals[issue]
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
