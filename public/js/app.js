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
          <headerLogo></headerLogo>
       	  <headerTitle></headerTitle>
	  <div class="contrast" @click='toggleContrast'>
	    <div class="contrastTitle">High Contrast</div>
	    <div class="contrastSwitch">
	      <div class="contrastOff">Off</div>
	      <div class="contrastOn">On</div>				
	    </div>				
	  </div>
	  <headerNav></headerNav>
	<div class="searchInput">
	<label for="fullTextSearchInput" class="visuallyhidden" v-if="this.$root.state.contrast == 'high'">Full Text Search: </label>
	  	<button class="searchSubmit" value="search" @click="searchSubmitted" aria-label="Search Full Text"><i class="fa fa-search" aria-hidden="true"></i></button>
	        <input id="fullTextSearchInput" @keyup.esc="resetSearchString"  @keyup.enter="searchSubmitted" v-model="searchString" onfocus="if(this.value == 'Search') { this.value = ''; }" placeholder="Search"></input>
	  </div>
        </div>
	`,
    methods: {
	resetSearchString: function(){
	    this.searchString = this.$root.state.content.searchString = ''
	},
	toggleContrast: function (){
	    this.$root.state.contrast = this.$root.state.contrast == 'high' ? 'normal' : 'high';
	    Event.$emit('toggleContrast');
	},
	searchSubmitted: function (){
	    Event.$emit('activeContentChange', 'search')
	    Event.$emit('searchSubmitted', this.searchString)
	}
    },
    data(){
	return {
	    searchString: ''
	}
    }
})

Vue.component('headerLogo',{
    template: `
	<a href="http://lib.lsu.edu"  class="headerLogo"><div>
          <img src="images/libraries_logo.png" alt="LSU Libraries logo"></img>
        </div></a>
    `
})

Vue.component('headerNav',{
    data() {
	return {
	    content: this.$root.state.activeContent
	}
    },
    methods: {
	activeContentClicked: function(content) {
	    this.content = content
	    Event.$emit('activeContentChange', content)
	},
	showSearch: function () {
	    return this.$root.state.activeContent == 'issues'
	}
    },
    template: `
	<div class='headerNav'>

	<div v-bind:class="{active: this.content == 'issues'}" @click="activeContentClicked('issues')"><i class="fa fa-bookmark" aria-hidden="true"></i> Issues</div>
	  <div v-bind:class="{active: this.content == 'abouts'}" @click="activeContentClicked('abouts')"><i class="fa fa-flask" aria-hidden="true"></i>
 About</div>
	  <div v-bind:class="{active: this.content == 'personography'}" @click="activeContentClicked('personography')"><i class="fa fa-user-circle" aria-hidden="true"></i>
People</div>
	</div>
	`
});

Vue.component('headerTitle',{
    template: `
	<a href="." class="headerTitle">The<br>Broadway<br>Journal</a>
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
    },
    template: `
        <div class="personography">
	  <personFilter></personFilter>
	  <personIndex></personIndex>
        </div>
    `
})

Vue.component('personIndex', {
    template: `
	<div class='personIndex' v-if="!this.$root.empty(this.index)">
          <person v-for="personObj in this.index" :person="personObj"></person>
        </div>
	`,
    data() {
	return {
	    index: {}
	}
    },
    created(){
	this.index = this.$root.xhrDataStore.personography.personIndex
    }
    
})

Vue.component('personFilter', {
    template: `
	<div class='personFilter'>
	<label for="personFilter" v-if="this.$root.state.contrast == 'high'">Filter people</label>
	  <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Filter people by name">
        </div>
	`,
    methods: {
	updateFilterString: function () {
	    Event.$emit('filterStringUpdated', this.filterString)
	}
    },
    data() {
	return {
	    filterString: ''
	}
    }
})
Vue.component('personMeta', {
    template: `
	<div class="personMeta">
	  <div class="personName">{{personMeta.personName}}</div>
	  <div class="personRole">{{personMeta.personRole}}</div>
          <div class="personViaf"><a  v-if="!this.$root.empty(personMeta.personViaf)" v-bind:href="personMeta.personViaf" target="_blank"><i class="fa fa-globe" aria-hidden="true"></i>VIAF</a></div>
        </div>
	`,
    props: ['personMeta']
})

Vue.component('person', {
    template: `
      <div class='person' @click="toggleBibls" v-if="this.passesFilter()" v-bind:class="person.personMeta.personRole">
	<personMeta :personMeta="person.personMeta"></personMeta>
	<div class="personListBibl">
	<personBibl v-if="showBibls" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>
	</div>
      </div>
	`,
    props: ['person'],
    data() {
	return {
	    showBibls: false,
	    filterString: ''
	}
    },
    methods: {
	deDupeBibls: function (bibl){
	    if(Object.keys(bibl).length < 3){
		return bibl[0]
	    }
	    return bibl
	},
	toggleBibls: function () {
	    this.showBibls = !this.showBibls
	},
	passesFilter: function () {
	    if(this.filterString.length < 1){
		return true
	    }

	    if(this.person.personMeta.personName.toLowerCase().includes(this.filterString.toLowerCase())){
		return true
	    }
	    return false
	},
    },
    created() {
	Event.$on('filterStringUpdated', (filterString) => {
	    this.filterString = filterString
	})
    }
})

Vue.component('biblIssueMeta', {
    template: `
	<div class="issueMeta">
	  <div class="issueVol">Vol. {{issueMeta.issueVol}}</div>
	  <div class="issueNum">No. {{issueMeta.issueNum}}</div>
	</div>
	
    `,
    props: ['issueMeta']
})

Vue.component('biblSectionMeta', {
    template: `
	<div class="sectionMeta">
	<div class="sectionTitle">{{sectionMeta.sectionTitle}}</div>
        </div>
    `,
    props: ['sectionMeta']
})

Vue.component('biblPersonPieceMeta',{
    template: `
        <div class="personPieceMeta">
          <div class="authorRole">{{personPieceMeta.personPieceRole}}</div>
	  <div class="authorShip" v-if="!this.$root.empty(personPieceMeta.authorShip)">
            <div class="authorStatus">{{personPieceMeta.authorShip.authorStatus}}</div>
            <div class="authorCertainty">{{personPieceMeta.authorShip.authorCertainty}}</div>
	  </div>
        </div>
	`,
    props: ['personPieceMeta']
})

Vue.component('biblPieceMeta', {
    template: `
	<div class="pieceMeta">
	  <div class="pieceTitle" @click="goToPiece">{{pieceMeta.pieceTitle}}</div>
        </div>
    `,
    props: ['pieceMeta', 'issueId'],
    methods: {
	goToPiece: function () {
	    this.$root.state.content.issue.id = this.issueId
	    this.$root.state.content.issue.decls_id = this.pieceMeta.pieceId
	    this.$root.state.content.issue.page = parseInt(this.pieceMeta.piecePdfIndex)

	    Event.$emit('activeContentChange', 'issues')
	    Event.$emit('issueBiblSelected', {
		issueId: this.issueId,
		pdf_index: this.pieceMeta.piecePdfIndex,
		decls_id: this.pieceMeta.pieceId
	    })
	},
    }
})

Vue.component('personBibl', {
    template: `
	<div class="personBibl">
          <biblIssueMeta v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="bibl.issueMeta"></biblIssueMeta>
          <biblSectionMeta v-if="!this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>
          <biblPieceMeta v-if="!this.$root.empty(bibl.pieceMeta)"  :pieceMeta="bibl.pieceMeta" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>
          <biblPersonPieceMeta v-if="!this.$root.empty(bibl.personPieceMeta)" :personPieceMeta="bibl.personPieceMeta"></biblPersonPieceMeta>
        </div>
	`,
    props: ['bibl']
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
            <div class="context">{{this.result.contextBefore}}<span class="searchHit">{{this.result.hit}}</span>{{this.result.contextAfter}}
	  </div>
	</div>
    `
})

Vue.component('issueViewer',{
    template: `
	<div class="viewer">
	  <transition name="fade"><pdf-viewer v-if="viewer == 'pdf'"></pdf-viewer></transition>
	  <transition name="fade"><tei-markup v-if="viewer == 'text'"></tei-markup></transition>
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
	<div class="issueBody">
	  <viewerSelector></viewerSelector>
	  <issueHeader></issueHeader>
	  <issueViewer></issueViewer>
	</div>
    </div>
	`,
})

Vue.component('issueHeader', {
    data() {
	return {
	    authorShipLegend: `Author will have 2-3 attributes: status, cert, and ref.

Status: identify as “supplied” (journal doesn’t say but you found it elsewhere), “attested” (the journal says), “unknown” (anonymous), or “inferred” (journal provides a byline that doesn’t provide full name, but makes it obvious, e.g. “EAP”).

If  you have only a pen name, but you know the author's real name, the author status should be "inferred," and the certainty will be "high," "medium," or "low," depending on what you've found in your research. The name in the ref should be the author's real name.

If an article only has initials for a byline and you can't find a reasonable full-name match for the initials, the author status will be "unknown," but you will use the initials of the author instead of "anon" in the ref.

Certainty: identify cert as “high,” “medium,” or “low.”
If the author is anonymous DO NOT provide certainty.`,
	    bibl_data: {},
	    ppm: {},
	    biblId: 's1',
	    issueHeaderData: {}
	}
    },
    created() {
	Event.$on('issueSelected', (id) => {
	    this.biblId = this.firstSection()
	    headerUrl = '/api/broadwayjournal/issue/'+ this.$root.state.content.issue.id +'/header';
	    axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
//	    bibl_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/bibl_data';
//	    axios.get(bibl_url).then(response => this.bibl_data = response.data);
//	    this.setPpm()
	})
	Event.$on('issueBiblSelected', (bibl) => {
	    this.biblId = bibl.decls_id
	    this.getIssueHeaderData()
//	    this.ppm = this.bibl_data = undefined
//	    this.setPpm()
//	    this.setBiblData()
	})

	this.biblId = this.$root.state.content.issue.decls_id
//	this.setPpm()
	//	this.setBiblData()
	this.getIssueHeaderData()
    },
    template: `
	<div class="issueHeader" v-if="!this.$root.empty(this.issueHeaderData)">
          <div class="bibl" v-if="haveData()">
  	    <div class="issue" v-if="!this.$root.empty(this.issueHeaderData.issueMeta)">
              <biblPieceMeta :pieceMeta="this.issueHeaderData.listBibl[this.biblId].pieceMeta" v-if="!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)"></biblPieceMeta>              
              <biblIssueMeta :issueMeta="this.issueHeaderData.issueMeta"></biblIssueMeta>
              <a class="downloadLink" v-bind:href='stateHref()' download>
                <div class="downloadIcon"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>
                <div class="downloadText">Download {{this.dlLabel()}}</div>
    	      </a>	      
	    </div>
          </div>
          <biblSectionMeta :sectionMeta="this.issueHeaderData.listBibl[this.biblId].sectionMeta" v-if="!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)"></biblSectionMeta>
	<personMeta :personMeta="this.getPersonMeta()" v-if="this.getPersonMeta()"></personMeta>
	<biblPersonPieceMeta  :personPieceMeta="this.getPersonPieceMeta()" v-if="this.getPersonPieceMeta()"></biblPersonPieceMeta>
	  <div class="authorShipLegend">{{this.authorShipLegend}}</div>
          <drawer  v-if="this.getPersonId()" :authorId="this.getPersonId()"></drawer>
	</div>
	`,
    methods: {
	haveData: function() {
	    empty = this.$root.empty
	    if(empty(this.issueHeaderData)){
		alert('headerData is empty')
	    }
	    if(empty(this.issueHeaderData.listBibl)){
		alert('issueHeaderData.listBibl is empty') 
	    }
	    if(empty(this.issueHeaderData.listBibl[this.biblId])){
		alert('listBibl does not exist for '+ this.biblId)
	    }
	    if(empty(this.issueHeaderData.issueMeta)){
		alert('missing issueMeta')
	    }
	},
	getSectionMeta: function () {
	    
	},
	getIssueHeaderData: function () {
	    headerUrl = '/api/broadwayjournal/issue/'+ this.$root.state.content.issue.id +'/header';
	    axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
	},
	getPersonId: function() {
	    if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceListPerson)){
		return Object.keys(this.issueHeaderData.listBibl[this.biblId].pieceListPerson)[0]
	    }
	    return false
	    
	},
	getPersonMeta: function (){
	    pid = this.getPersonId()
	    if(!pid){
		return false
	    }
	    if(this.$root.empty(this.$root.xhrDataStore.personography.personIndex[pid])){
		alert('person ' + pid + ' not found!')
		return {
		    personRole: 'unknown',
		    personName: 'unknown',
		    personViaf: false
		}
	    }
	    personMeta = this.$root.xhrDataStore.personography.personIndex[pid].personMeta
	    if(this.$root.empty(personMeta)){
		return false
	    }
	    return personMeta
	},
	getPersonPieceMeta: function () {
	    pid = this.getPersonId()
	    if(!pid){
		return false
	    }
	    bid = 'bibl-' + this.issueHeaderData.issueMeta.issueId + '-' + this.biblId
	    meta = this.$root.xhrDataStore.personography.personIndex[pid].personListBibl[bid].personPieceMeta
	    console.log(pid)
	    return meta
	},
	drawerIsAvailable: function() {
	    return this.issueHeaderData.listBibl[this.biblId] && (!this.biblIsSection(this.biblId) || !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta))
	},
	dlLabel: function(){
    	    if(this.$root.state.content.issue.viewer == 'pdf'){
    		return 'PDF'
    	    }
    	    else{
    		return 'TEI'
    	    }
    	},
	firstSection: function (){
	    return 's1'
	},
	setBiblData: function (){
	    bibl_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/bibl_data';
	    axios.get(bibl_url).then(response => this.bibl_data = response.data);
	},
	setPpm: function (){
	    ppm_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/ppm';
	    axios.get(ppm_url).then(response => this.ppm = response.data);
	},
	pieceMeta: function (attribute){
	    if(this.bibl_data[this.biblId].sectionMeta){
		return ''
	    }
	    return this.bibl_data[this.biblId].pieceMeta[attribute]
	},
	stateHref:function(){
	    let iid   = Util.datePartsForIssueId(this.$root.state.content.issue.id);
	    let format = this.$root.state.content.issue.viewer
	    if(format == 'text'){
		format = 'tei'
	    }
	    return `/broadwayjournal/issue/${iid.year}/${iid.month}/${iid.day}/${format}`
	},
	sectionTitle: function(biblId) {
	    bibl = this.bibl_data[biblId]
	    if(!bibl.sectionMeta){
		return "sectionMeta is missing!"
	    }
	    if(this.biblIsSection(biblId)){
		return bibl.sectionMeta.sectionTitle
		
	    }else if(this.biblBelongsToSection(biblId)){
		return this.bibl_data[bibl.sectionId].sectionMeta.sectionTitle
	    }else{
		return ''
	    }
	},
	biblIsSection: function(biblId) {
	    if(this.issueHeaderData.listBibl[biblId].sectionMeta){
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
//	Event.$emit('issueSelected', this.$root.state.content.issue.id)
    }
})

Vue.component('drawer', {
    template: `
	<div class="drawer" v-bind:class="{active: showBibls}">
	  <div class="drawerActuator" @click="showBibls = !showBibls">
	    <div class="drawerIcon">
	      <i class="fa fa-list" aria-hidden="true"></i>
	    </div>
    	    <div class="drawerText">More from this author</div>
	  </div>
	  <personBibl v-if="showBibls && isBibls()" v-for="bibl in this.$root.xhrDataStore.personography.personIndex[authorId].personListBibl" :bibl="bibl"></personBibl>
        </div>
	`,
    props: ['authorId'],
    methods: {
	isBibls: function (){
	    return this.authorId && !this.$root.empty(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl)
	}
    },
    created() {
	axios.get('/api/BroadwayJournal/personography/comprehensive/json').then(response => {
	    this.personography = response.data
	    this.authorBibls = this.personography.personIndex[this.authorId]
	})
	Event.$on('issueBiblSelected', (bibl) => {
	    this.showBibls = false
	    this.authorBibls = this.personography.personIndex[this.authorId]
	})

    },
    data() {
	return {
	    personography: {},
	    authorBibls: {},
	    showBibls: false
	}
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
<div class="aboutToggle">

	<div class="about" v-bind:class="{active: this.abouts == 'about'}" @click="selectMe('about')">About</div>
	<div class="technical" v-bind:class="{active: this.abouts == 'tech'}" @click="selectMe('tech')">Methodology</div>
	<div class="credits" v-bind:class="{active: this.abouts == 'credits'}" @click="selectMe('credits')">Staff</div>
</div>
    <div class="aboutViewer">
    <logo v-if="this.abouts == 'about'"></logo>
	   <div v-if="this.abouts == 'about'" v-html="this.aboutText"></div>
	   <div v-if="this.abouts == 'tech'" v-html="this.techText"></div>
	   <div v-if="this.abouts == 'credits'">
            <creditsPersonList></creditsPersonList>
        </div>
    </div>
    </div>
	`,
    data() {
	return {
	    abouts: this.$root.state.content.abouts,
	    aboutText: this.$root.xhrDataStore.abouts.about,
	    techText: this.$root.xhrDataStore.abouts.tech
	}
    },
    methods: {
    	selectMe: function(about) {
	    this.abouts = about;
	    Event.$emit('aboutsSelected', this.abouts);
	},
    },
    created() {
	if(this.$root.xhrDataStore.abouts.about.length > 1){
	    this.aboutText = this.$root.xhrDataStore.abouts.about
	}else{
	    url = '/api/broadwayjournal/abouts/about'
	    axios.get(url).then(response => this.aboutText = response.data);
	}
	if(this.$root.xhrDataStore.abouts.tech.length > 1){
	    this.techText = this.$root.xhrDataStore.abouts.tech
	}else{
	    url = '/api/broadwayjournal/abouts/tech'
	    axios.get(url).then(response => this.techText = response.data);
	    console.log('fetching tech now')
	}
    },
})

Vue.component('creditsPersonList', {
    template: `
	<div class="creditsPersonsList">
	  <creditsPerson v-for="person in creditsData.personList" :person="person"></creditsPerson>
        </div>
	`,
    methods: {
	dataLoaded: function() {
	    return this.$root.empty(this.creditsData)
	}
    },
    created() {
	if(this.$root.empty(this.$root.xhrDataStore.abouts.credits)){
	    url = '/api/broadwayjournal/abouts/credits'
	    axios.get(url).then(response => this.creditsData = response.data);
	}else{
	    this.creditsData = this.$root.xhrDataStore.abouts.credits
	}
    },
    data() {
	return {
	    creditsData: {}
	}
    }
})

Vue.component('creditsPerson', {
    template: `
	<div class="creditsPerson">
	  <div class="creditsPersonName">{{person.personMeta.personName}}</div>
	  <div class="creditsPersonAffiliation">{{person.personMeta.personBio.personAffiliation}}</div>
 	  <div class="creditsPersonNote">{{person.personMeta.personBio.personNote}}</div>
        </div>
	`,
    props: ['person']
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
                <div class="viewerPdfIcon"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>
</div>            
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
	    issueID: this.$root.state.content.issue.id,
	    tocContent: {}
	}
    },
    created() {
	this.issueID = this.$root.state.content.issue.id
	this.setTocContent()
	
	Event.$on('issueSelected', (id) => {
	    this.issueID = id;
	    this.setTocContent()
	})
	Event.$on('issueBiblSelected', (data) => {
	    this.issueID = data.issueId;
	    this.setTocContent()
	})
    },
    methods: {
	setTocContent: function () {
	    url= '/api/broadwayjournal/' + this.issueID + '/toc';
	    axios.get(url).then(response => this.tocContent = response.data);
	},
	getTocContent: function () {
	    if(this.$root.empty(this.tocContent.toc)){
		alert('Toc content is empty for ' + this.issueId)
		return false
	    }
	    return true
	}
    },
	template:`
	<div class='intraIssueNav'>
          <div class='tocDropdown'>Table of Contents</div>
          <toc-item v-if="getTocContent()" v-for='id in tocContent.toc' :id='id'></toc-item>
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
		     this.id.issueId = this.$root.state.content.issue.id
		     Event.$emit("issueBiblSelected", this.id)
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
		    this.id.issueId = this.$root.state.content.issue.id
		    Event.$emit("issueBiblSelected", this.id)
		}
	},
	template:`
		<div class="childPiece" @click='tocItemSelected'>
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
	    if(this.$root.state.content.issue.viewer == 'text'){
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

		canvas.height = viewport.height; //1014
		canvas.width = viewport.width; //735

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
	    this.biblId = ''
	    this.getText();
	}),
	Event.$on('issueBiblSelected', (bibl) => {
	    this.biblId = bibl.decls_id
	    this.id = bibl.issueId
	    this.getText(this.biblId);
	})
	this.id = this.$root.state.content.issue.id
	this.biblId = this.$root.state.content.issue.decls_id
	this.page = this.$root.state.content.issue.page
	this.getText()
    },
    methods: {
	highlightText: function(){
	    needle = this.$root.state.content.searchString
	    if(needle.length < 1){
		return this.issueText
	    }
	    //Thanks !! http://stackoverflow.com/questions/29433696/create-regex-from-variable-with-capture-groups-in-javascript
	    pattern = new RegExp('('+needle+')', 'gi')
	    return this.issueText.replace(pattern, "<span class='searchHit'>$1</span>")
	},
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
	<div class='teiMarkup' v-html="this.highlightText()"><div>
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
    mounted(){
        //this.today = parseInt(this.state.content.issue.id) - parseInt(18450209)
    },
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
        todayIssue: '',
	journals:[],
	years: [],
	state: {
	    activeContent: 'abouts', // issues | personography | search
	    content: {
		abouts: 'about', // technical | credits
		issue: {
		    id: '',//'18450104', // yyyy-mm-dd
		    viewer: 'text', // text|pdf
		    page: 1, // int
		    decls_id: 'p1'
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
	}
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
	axios.get('/api/BroadwayJournal/personography/comprehensive/json').then(response => this.xhrDataStore.personography = response.data);

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
        let d = new Date();
        let today = {};
        today.year = d.getFullYear();
        today.month = d.getMonth() + 1
        today.day = d.getDate()
        let todayIssue = ''
        if(today.year % 2 && today.month == 1){
            todayIssue = '1846'
        }else{
            todayIssue = '1845'
        }
        if(today.month > 9){
            todayIssue += today.month
        }else{
            todayIssue += '0' + today.month
        }
        if(today.day > 9){
            todayIssue += today.day
        }else{
            todayIssue += '0' + today.day
        }
        this.todayIssue = todayIssue
        let olJournalIds = [];
        for(issue in this.journals){
            olJournalIds.push(this.journals[issue].id)
        }
        olJournalIds = olJournalIds.sort();
        for( i in olJournalIds){
            if(olJournalIds[i].slice(4,6) == this.todayIssue.slice(4,6) && Math.abs(parseInt(olJournalIds[i].slice(-2)) - parseInt(this.todayIssue.slice(-2))) <= 4){
           this.state.content.issue.id = olJournalIds[i];
            }
        }

	});
    },
});
