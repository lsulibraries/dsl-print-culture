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
       	  <headerTitle></headerTitle>
	  <headerNav></headerNav>
      <div class="contrast" @click='toggleContrast'>
        <div class="contrastTitle">High Contrast</div>
        <div class="contrastSwitch">
          <div class="contrastOff">Off</div>
          <div class="contrastOn">On</div>
        </div>
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
	  <div v-bind:class="{active: this.content == 'issues'}" @click="activeContentClicked('issues')"><i class="fa fa-bookmark" aria-hidden="true"></i>Read Issues</div>
	<div v-bind:class="{active: this.content == 'personography'}" @click="activeContentClicked('personography')"><i class="fa fa-user-circle" aria-hidden="true"></i>Authors</div>
        <div v-bind:class="{active: this.content == 'abouts'}" @click="activeContentClicked('abouts')"><i class="fa fa-flask" aria-hidden="true"></i>About</div>
	</div>
	`
});

Vue.component('headerTitle',{
    template: `
	<a href="." class="headerTitle">The<br>Broadway<br>Journal</a>
    `
})

Vue.component('vue-footer',{
    template: `
    <div class='footer'>
        <div class="leftFooter">
            <section id='infoFooter' class='flex'>
                <div id='creativeCommons'>
                    This work is licensed under a <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>Creative Commons Attribution 4.0 International License</a>.<br>
                    Contact the <a href='mailto:dsl@lsu.edu' target='_blank'>Digital Scholarship Lab</a> at LSU Libraries with any questions or comments. 
                </div>
            </section>
        </div>
        <div class="rightFooter">
            <div class="rightContainer">
            <headerLogo></headerLogo>
            </div>
        </div>
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
        <div class="personographyAbout">Lorem ipsum</div>
        <personFilter></personFilter>
        <personIndex></personIndex>
        </div>
    `
})

Vue.component('personographyDescription', {
    template: `
	<div class="personographyDiscription">
          <div class="personographyDiscriptionHeader" v-html="this.personographyDescription"></div>
	  <div class="personographyDiscriptionText" ></div>
        </div>
	`,
    data() {
	return {
	    personographyDescription: this.$root.xhrDataStore.abouts.personographyDescription
	}
    },
    created() {
	if(this.$root.xhrDataStore.abouts.personographyDescription.length > 1){
	    this.aboutText = this.$root.xhrDataStore.abouts.personographyDescription
	}else{
	    url = '/api/broadwayjournal/abouts/personographyDescription'
	    axios.get(url).then(response => this.personographyDescription = response.data);
	}
    }
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
	rawIndex = this.$root.xhrDataStore.personography.personIndex
        deduped = {};
        entries = Object.entries(rawIndex)
        for (const [key, value] of entries) {
            if (Array.isArray(value)) {
                console.log(key + ' has multiple records, arbitrarily(-ish) using the first...')
                deduped[key] = value[0]
            }
            else {
                deduped[key] = value
            }
        }
        this.index = deduped
    }
})

Vue.component('personFilter', {
    template: `
      <div class="peopleFilters">
	<div class='personFilter'>
	  <label for="personFilter" v-if="this.$root.state.contrast == 'high'">Filter people</label>
	  <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Filter people by name">
        </div>
	<div class="roleFilter">
        <div class="roleFilterContributor"     v-bind:class="{active: roleFilter == 'cont'}" @click="updateRoleFilter('cont')">Contributor</div>
	  <div class="roleFilterMentioned"     v-bind:class="{active: roleFilter == 'ment'}" @click="updateRoleFilter('ment')">Mentioned</div>
	  <div class="roleFilterEditor"        v-bind:class="{active: roleFilter == 'edit'}" @click="updateRoleFilter('edit')">Editor</div>
	  <div class="roleFilterCorrespondent" v-bind:class="{active: roleFilter == 'corr'}" @click="updateRoleFilter('corr')">Correspondent</div>
	 <!-- <div class="numberFilterContributions" v-bind:class="{active: numFilter == 'num'}" @click="updateRoleFilter('num')">Contribution Number</div> -->
        </div>
      </div>
	`,
    methods: {
	updateFilterString: function () {
	    Event.$emit('filterStringUpdated', this.filterString)
	},
	updateRoleFilter: function (role) {
	    this.roleFilter = role
	    Event.$emit('filterRoleUpdated', this.roleFilter)
	}
    },
    data() {
	return {
	    filterString: '',
	    roleFilter: ''
	}
    }
})
Vue.component('personMeta', {
    template: `
	<div class="personMeta">
	  <div class="personName">{{this.getName()}}</div>
	  <div class="personRole">{{this.getRole(personMeta)}}</div>
          <div class="personViaf">
	    <!--
	    <a v-if="!this.$root.empty(personMeta.personViaf)" v-bind:href="personMeta.personViaf" target="_blank"><i class="fa fa-globe" aria-hidden="true"></i>VIAF</a>
	    -->
          </div>
        </div>
	`,
    props: ['personMeta'],
    methods: {
        getName: function () {
            if((typeof this.personMeta.personName) !== 'string') {
                return this.personMeta.personId + ' (Full name not given)'
            }
            else {
                return this.personMeta.personName
            }
        },
        getRole: function getRole(personMeta) {
            if (typeof personMeta.personRole !== 'string') {
                return ''
            }
            roles = Object.values(personMeta.personRole.split(' '))
            ret = ''
            for (role of roles) {
                if (role == 'Mentioned') {
                    count = personMeta.personTotalMention
                    if (!personMeta.personTotalMention) {
                        console.log("totalMention missing for " + personMeta.personId)
                        count = '?'
                    }
                    ret += role + ' (' + count + ')'
                }
                else if (role == 'Contributor') {
                    count = personMeta.personTotalContrib
                    if (!personMeta.personTotalContrib) {
                        console.log("totalContrib missing for " + personMeta.personId)
                        count = '?'
                    }
                    ret += role + ' (' + count + ')'
                }
                else {
                    ret += ' ' + role
                }
            }
            
            return ret
        }
    }
})

Vue.component('person', {
    template: `
      <div  class='person' @click="toggleBibls" v-if="this.passesFilter()" v-bind:class="[person.personMeta.personRole, {active: activePerson}]">
	<personMeta :personMeta="person.personMeta"></personMeta>
    <div class="personBlurb" v-if="this.getBlurb().length > 0 && showBibls">{{ this.getBlurb() }}</div>
	<div class="personListBibl">
          <personBibl v-if="showBibls" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>
	</div>
      </div>
	`,
    props: ['person'],
    data() {
	return {
	    showBibls: false,
	    filterString: '',
	    filterRole: false,
            activePerson: false
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
	    this.showBibls = !this.showBibls;
        this.activePerson = !this.activePerson;
            },
	passesFilter: function () {
	    passesString = false
	    passesRole   = false

	    if(this.filterString.length < 1){
		passesString = true
	    }

            if((typeof this.person.personMeta.personName) !== 'string') {
                console.log(this.person.personMeta.personId + ' is missing a name!')
                return true
            }

	    if(this.person.personMeta.personName.toLowerCase().includes(this.filterString.toLowerCase())){
		passesString = true
	    }

	    if(!this.filterRole){
		passesRole = true
	    }else if(!this.$root.empty(this.person.personMeta.personRole) && this.person.personMeta.personRole.toLowerCase().includes(this.filterRole.toLowerCase())){
		passesRole = true
	    }
	    
	    return passesString && passesRole
	},
    getBlurb: function() {
        bioExists = !this.$root.empty(this.person.personMeta.personBio)
        if (!bioExists) {
            return ''
        }
        noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote)
        return bioExists && noteExists ? this.person.personMeta.personBio.personNote : ''
    }
    },
    created() {
	Event.$on('filterStringUpdated', (filterString) => {
	    this.filterString = filterString
	})
	Event.$on('filterRoleUpdated', (filterRole) => {
	    this.filterRole = filterRole
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
    <!--
    <div class="authorRole">{{personPieceMeta.personPieceRole}}</div>
    -->
    <div class="authorShip" v-if="showAuthorship()" :title="this.getAuthorshipTitle()">{{this.getAuthorship()}}</div>
    </div>
    `,
    props: ['personPieceMeta'],
    methods: {
        showAuthorship: function () {
            hasValue     = !this.$root.empty(this.personPieceMeta.personPiecePseudo)
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
	  <h1 class="pieceTitle" @click="goToPiece">{{pieceMeta.pieceTitle}}</div>
        </div>
    `,
    props: ['pieceMeta', 'issueId'],
    methods: {
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

Vue.component('personBibl', {
    template: `
	<div class="personBibl">
          <biblSectionMeta v-if="!this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>
          <div class="pieceTitleContainer">
          <biblPieceMeta v-if="!this.$root.empty(bibl.pieceMeta)"  :pieceMeta="bibl.pieceMeta" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>
          <biblIssueMeta v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="bibl.issueMeta"></biblIssueMeta>
          </div>
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
            <div class="context">{{this.result.contextBefore}}<span class="searchHit">{{this.result.hit}}</span>{{this.result.contextAfter}}</div>
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
	    biblId: '',
        showModal: false,        
	    issueHeaderData: {}
	}
    },
    created() {
	Event.$on('issueSelected', (id) => {
	    headerUrl = '/api/broadwayjournal/issue/'+ this.$root.state.content.issue.id +'/header';
	    axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
        this.biblId = ''
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
        Event.$on('close', () => {
            this.showModal = false
        })

	this.biblId = this.$root.state.content.issue.decls_id
//	this.setPpm()
	//	this.setBiblData()
	this.getIssueHeaderData()
    },
    template: `
        <div class="issueHeader" v-if="!this.$root.empty(this.issueHeaderData)">
         
          <div class="issueInfo">
              <div class='issueDate'>{{this.formatDate()}}</div>
              <biblIssueMeta :issueMeta="this.issueHeaderData.issueMeta"></biblIssueMeta>
          <biblSectionMeta :sectionMeta="this.issueHeaderData.listBibl[this.biblId].sectionMeta" v-if="this.showBiblSectionMeta()"></biblSectionMeta>

          </div>          
          <div class="bibl" v-if="haveData()">
            <div class="issue">
              <a class="downloadLink" v-bind:href='stateHref()'>
                <div class="downloadIcon"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>
                <div class="downloadText">View {{this.dlLabel()}}</div>
              </a>
              <biblPieceMeta :pieceMeta="this.issueHeaderData.listBibl[this.biblId].pieceMeta" v-if="!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta) && !pdfMode()"></biblPieceMeta>
            </div>
            <personMeta :personMeta="this.getPersonMeta()" v-if="this.getPersonMeta()"></personMeta>
            <!-- <biblPersonPieceMeta :personPieceMeta="this.getPersonPieceMeta()" v-if="this.getPersonPieceMeta()"></biblPersonPieceMeta> -->

  <button id="show-modal" @click="showModal = true" v-if="this.drawerIsAvailable()">More from this author</button>

            <div class="issueData"></div>
            <div class="authorShipLegend">{{this.authorShipLegend}}</div>
            </div>
  <!-- use the modal component, pass in the prop -->
  <modal v-if="this.showModal" :authorId="this.getPersonId()" :declsId="this.biblId" :issueId="this.issueHeaderData.issueMeta.issueId"  @close="showModal = false">
    <h3 slot="header">More from this author</h3>
  </modal>

        </div>
	`,
    methods: {
        showBiblSectionMeta: function () {
            biblIdSet  = this.biblId !== ''
            if (!biblIdSet) {
                return false
            }
            metaExists = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
            return metaExists
        },
	pdfMode: function () {
	    return this.$root.state.content.issue.viewer == 'pdf'
	},
	haveData: function() {
	    empty = this.$root.empty
	    if(empty(this.issueHeaderData)){
            console.log('headerData is empty')
	    
}	    if(empty(this.issueHeaderData.listBibl)){
            console.log('issueHeaderData.listBibl is empty') 
	    }
        if(this.biblId == '') {
            return false
        }
	    if(empty(this.issueHeaderData.listBibl[this.biblId])){
            console.log('listBibl does not exist for '+ this.biblId)
	    }
	    if(empty(this.issueHeaderData.issueMeta)){
            console.log('missing issueMeta')
	    }
        return true
	},
	getSectionMeta: function () {
	},
	getIssueHeaderData: function () {
	    headerUrl = '/api/broadwayjournal/issue/'+ this.$root.state.content.issue.id +'/header';
	    axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
	},
	getPersonId: function() {
        // if section, get section list person, if set.
	    if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)){
            if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)){
                return Object.keys(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)[0]
            }
	    }
	    if(!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)){
            if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)) {
                return Object.keys(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)[0]
            }
            else if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)) {
                const sid = this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionId
                if (!this.$root.empty(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)) {
                    return Object.keys(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)[0]
                }
            }
	    }
	    return false
	},
	getPersonMeta: function () {
        pid = this.getPersonId()
        let bibl = this.biblId

        if(!pid){
            return false
        }
        if(this.$root.empty(this.$root.xhrDataStore.personography.personIndex[pid])){
            console.log('person ' + pid + ' not found!')
            return {
                personRole: 'unknown',
                personName: 'unknown',
                personViaf: false
            }
	    }
        if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId])) { // have bibl
            if (!this.biblIsSection(this.biblId)) {
                if (this.authorlessPieceInSection(this.biblId)) {
                    sid = this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionId
                    if(!this.$root.empty(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)) {
                        personMeta = { personName: this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson[pid].personName }
                    }
                }
                else {
                    personMeta = { personName: this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName }
                }
                // personMeta = this.$root.xhrDataStore.personography.personIndex[pid].personMeta
            }
            else {
                personMeta = { personName: this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson[pid].personName }
            }
            if(this.$root.empty(personMeta.personName)){
              return false
            }
            return personMeta
        }
        console.log('missing list bibl for' + this.biblId)
        return false

	},
    authorlessPieceInSection: function (biblId) {
        if (this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)) {
            if (!this.$root.empty(this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta))) {
                return true
            }
        }
        return false
    },
	getPersonPieceMeta: function () {
	    pid = this.getPersonId()
	    if(!pid){
		return false
	    }
	    bid = 'bibl-' + this.issueHeaderData.issueMeta.issueId + '-' + this.biblId
	    meta = this.$root.xhrDataStore.personography.personIndex[pid].personListBibl[bid].personPieceMeta
	    return meta
	},
	drawerIsAvailable: function() {
            isAnon = this.getPersonId() == 'anon'
            biblExists_notSection = !this.biblIsSection(this.biblId) && this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson
            sectionMetaNotEmpty = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
            personInSection = this.getPersonMeta()
	    return !isAnon && (personInSection || biblExists_notSection)
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
	    if(this.issueHeaderData.listBibl[biblId].sectionMeta && this.$root.empty(this.issueHeaderData.listBibl[biblId].pieceMeta)){
		return true
	    }
	    return false
	},
	biblBelongsToSection: function(biblId) {
	    if(this.bibl_data[biblId].sectionId){
		return true
	    }
	    return false
	},
        lookupMonth: function(monthInt){
            monthConvert = {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}
            return monthConvert[monthInt]
        },
        formatDate: function() {

            d = Util.datePartsForIssueId(this.$root.state.content.issue.id)
            date = this.lookupMonth(d.month) + ' ' + d.day + ', ' + d.year;
            return date
        }
    },

    mounted() {
//	Event.$emit('issueSelected', this.$root.state.content.issue.id)
    }
})

Vue.component('modal', {
    data() {
	return {
	    authorShipLegend: `Author will have 2-3 a`,
	    bibl_data: {},
	    ppm: {},
	    biblId: 's1',
            showModal: false,        
	    issueHeaderData: {}
	}
    },
    props: ['authorId', 'issueId', 'declsId'],
  template: `<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
            <drawer  :authorId="this.authorId" :declsId="this.biblId" :issueId="this.issueId"></drawer>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`,
})

Vue.component('drawer', {
    template: `
<div>
    <div class="personBlurb">{{ this.getBlurb() }}</div>
	  <personBibl v-for="bibl in getBibls()" :bibl="bibl"></personBibl>
        </div>
	`,
    props: ['authorId', 'issueId', 'declsId'],
    methods: {
	getBibls: function () {
	    currentDecls = 'bibl-' + this.issueId + '-' + this.declsId
	    bibls = []
	    allBibls = this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl
	    for(k in allBibls){
		if(k != currentDecls){
		    bibls.push(allBibls[k])
		}
	    }
	    return bibls
	},
	authorIsAnonymous: function () {
	    return this.authorId == 'anon'
	},
	authorWroteSomethingBesidesThis: function () {
	    pieces = Object.keys(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl).length
	    return parseInt(pieces) > 1
	},
	isBibls: function (){
	    return this.authorId && !this.$root.empty(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl)
	},
    getBlurb: function() {
        person = this.$root.xhrDataStore.personography.personIndex[this.authorId]
        if (this.$root.empty(person)) {
            return ''
        }
        bioExists = !this.$root.empty(person.personMeta.personBio)
        if (!bioExists) {
            return ''
        }
        noteExists = !this.$root.empty(person.personMeta.personBio.personNote)
        return bioExists && noteExists ? person.personMeta.personBio.personNote : ''
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
	  <h1><div class="logoThe">The</div>
	  <div class="logoBroadway">Broadway</div>
	  <div class="logoJournal">Journal</div></h1>
	  <div class="logoSubtitle">A Digital Edition</div>
	</div>
    `
})

Vue.component('abouts',{
    template: `
       <div class="abouts">
         <div class="aboutToggle">
	   <div class="about" v-bind:class="{active: this.abouts == 'about'}" @click="selectMe('about')">Project</div>
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
	}
    },
})

Vue.component('creditsPersonList', {
    template: `
    <div class="creditsPersonsList">
        <div class="creditsPersonListActive">
            <div class="personRoleName" v-for="role in this.rolesActive">
            <h3>{{ role }}</h3>
                <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == 'active' && person.personMeta.personRoleName == role"></creditsPerson>
            </div>
        </div>
        <div class="creditsPersonListPast">
            <h2>Past</h2>
            <div class="personRoleName" v-for="role in this.rolesPast">
                <h3>{{ role }}</h3>
                <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == 'past' && person.personMeta.personRoleName == role"></creditsPerson>
            </div>
        </div>
    </div>
	`,
    methods: {
        includePersonInList: function (state, role) {
            console.log('hello')
            return person.personMeta.personRole == state && person.personMeta.personRoleName == role
        },
        dataLoaded: function() {
            return this.$root.empty(this.creditsData)
        }
    },
    created() {
	   this.creditsData = this.$root.xhrDataStore.personography.projectStaff
       this.rolesPast = []
       this.rolesActive = []
       for (let person in this.creditsData) {
        role = this.creditsData[person].personMeta.personRoleName
        state = this.creditsData[person].personMeta.personRole
        if (state == 'active') {
            if (this.rolesActive.indexOf(role) === -1) {
                this.rolesActive.push(role)
            }
        }
        else {
            if (this.rolesPast.indexOf(role) === -1) {
                this.rolesPast.push(role)
            }
        }
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
	  <!-- <div class="creditsPersonAffiliation" v-if="this.hasBio()">{{ this.getAffiliation() }}</div> -->
 	  <div class="creditsPersonNote" v-if="this.hasBio() && this.person.personMeta.personRole != 'past'">{{ this.getNote() }}</div>
        </div>
	`,
    props: ['person'],
    methods: {
        getAffiliation: function () {
            console.log(this.person.personMeta.personName)
            affiliation = this.$root.empty(this.person.personMeta.personBio.personAffiliation) ? '' : this.person.personMeta.personBio.personAffiliation
            return affiliation
        },
        getNote: function () {
            note = this.$root.empty(this.person.personMeta.personBio.personNote) ? '' : this.person.personMeta.personBio.personNote
            return note
        },
        hasBio: function () {
            return !this.$root.empty(this.person.personMeta.personBio)
        },
        getRoleName: function () {
            return this.person.personMeta.personRoleName
        }
    }
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
	    issueID: this.$root.state.content.issue.id,
	    tocContent: false
	}
    },
    created() {
	this.issueID = this.$root.state.content.issue.id
	this.setTocContent()
	Event.$on('issueSelected', (id) => {
	    this.issueID = id;
	    this.tocContent = false
	    this.setTocContent()
	})
	Event.$on('issueBiblSelected', (data) => {
	    this.issueID = data.issueId;
	    this.tocContent = false
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
        isActive: function(){
            if(this.id.decls_id == this.$root.state.content.issue.decls_id){
                console.log('match')
                return true
            }
         },
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
	      <div class='tocToggle'  @click='tocItemSelected' v-bind:class="{tocActive: this.isActive()}">
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
                isActive: function(){
                    if(this.id.decls_id == this.$root.state.content.issue.decls_id){ 
                        return true
                    }
                },
		tocItemSelected: function() {
		    Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
		    this.id.issueId = this.$root.state.content.issue.id
		    Event.$emit("issueBiblSelected", this.id)
		}
	},
        template:`
            <div class='childPiece' @click='tocItemSelected'  v-bind:class='{tocActive: this.isActive()}'>
              <div class="childPieceTitle">{{id.title}}</div>
              <div v-if='id.auth_name' class="childPieceAuthor">{{id.auth_name}}</div>
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
                toggled: this.isToggledMonth(),
		monthConvert: {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'},
	    }
	},
	props: {month: '',	list: ''},
        methods: {
	    showChildren: function(){
                this.$root.state.content.issue.current_month_y = this.list[0].substring(0,6)
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
		},
            isToggledMonth: function(){
                if(this.list[0].substring(0,6) == this.$root.state.content.issue.current_month_y){
                    this.toggled = true
                    return true
                }
                else{
                    this.toggled =false
                    //turn off this.children
		    for (each in this.$children){
		        this.$children[each].meSeen=false;
                    }

                    return false
                }
	    }
        },
        template: `
            <div v-bind:class="{activeMonth: this.isToggledMonth()}">
              <div @click="showChildren()">
                <div class="singleText" >{{this.month}}</div>
                <div class="indicatorIndex"></div>
              </div>
              <div class="childContainer">
              <index-child :id="each" v-for="each in this.list"></index-child>
              </div>
            </div>
        `
});

Vue.component('index-child',{
    data() {
	return { meSeen:false,toggled:false }
    },
    props: ['id'],
    methods: {
	selectIssue: function(id){
	    Event.$emit('issueSelected', id);
	},
        isCurrentIssue: function(){
            console.log(this.id)
            if(this.id == this.$root.state.content.issue.id){
                return true
            }
        },
        isMonthShown: function(){
            if(this.$parent.toggled == true){
                return true
            }
        }
    },
    created() {
        Event.$on('activeContentChanged', (content) =>{
            if(content == 'issues' && this.$root.state.content.issue.id == this.id){
                this.meSeen = true
               console.log( this.$parent.$children)
            }
        })
    },

    template: `
	<div v-if="this.isMonthShown()" @click="selectIssue(id)" class="childIndex">
	  <div v-bind:class="[{active: this.isCurrentIssue()}, 'childText']" v-text="id.slice(-2)"></div>
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

window.Event = new Vue();

new Vue({
	el:'#vue-root',
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
                    current_month_y: '184501',
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
            this.state.content.issue.current_month_y = id.substring(0,6)
	})
	Event.$on('issueBiblSelected', (bibl) => {
	    this.state.content.issue.id = bibl.issueId
	    this.state.content.issue.decls_id = bibl.decls_id
            this.state.content.issue.current_month_y = bibl.issueId.substring(0,6)
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
	});
    },
});
