<script>
    import personMeta from './personMeta'
    import biblIssueMeta from './biblIssueMeta'
    import biblPieceMeta from './biblPieceMeta'
    import biblSectionMeta from './biblSectionMeta'
    import drawer from './drawer'
    import modal from './modal'
    export default {
        components: { personMeta, biblIssueMeta, biblPieceMeta, biblSectionMeta, drawer, modal },
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
                issueHeaderData: {},
                issueId: ''
            }
    },
    created() {
        Event.$on('issueSelected', (id) => {
            let headerUrl = '/api/broadwayjournal/issue/'+ this.$root.state.content.issue.id +'/header';
            axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
            this.biblId = ''
        })
        Event.$on('issueBiblSelected', (bibl) => {
            this.biblId = bibl.decls_id
            this.getIssueHeaderData()
            this.showModal = false
            // this.showModal = false // needed for when 
        })
        Event.$on('close', () => {
            this.showModal = false
        })

        // this.biblId = this.$root.state.content.issue.decls_id
        if (!this.$root.empty(this.$route.params.id)) {
            // this.$root.state.content.issue.id = this.$route.params.id
            // Event.$emit('issueSelected', this.$route.params.id)
            this.issueId = this.$route.params.id
        }
        if (this.$route.params.biblid) {
            this.biblId = this.$route.params.biblid
        }
        this.getIssueHeaderData()
    },

    watch: {
        '$route': 'fetchData'
    },
    methods: {
        getAuthorsLink: function () {
            let pid = this.getPersonId();
            if (pid) {
                return '/authors/' + pid
            }
            return '' 
        },
        fetchData: function() {
            this.issueId = this.$route.params.id
            if(this.$route.params.id && this.$route.params.biblid) {
                this.biblId = this.$route.params.biblid
            }
            else {
                this.biblId = ''
            }
            this.showModal = false
            this.getIssueHeaderData()
        },
        showBiblSectionMeta: function () {
            const biblIdSet  = this.biblId !== ''
            if (!biblIdSet) {
                return false
            }
            let metaExists = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
            return metaExists
        },
        pdfMode: function () {
            return this.$root.state.content.issue.viewer == 'pdf'
        },
        haveData: function() {
            let empty = this.$root.empty
            if(empty(this.issueHeaderData)){
                console.log('headerData is empty')
            }
            if(empty(this.issueHeaderData.listBibl)){
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
            let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
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
        getPersonMeta: function (){
            const pid = this.getPersonId()
            const bibl = this.biblId

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
                let personMeta;
                if (!this.biblIsSection(this.biblId)) {
                    if (this.authorlessPieceInSection(this.biblId)) {
                        sid = this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionId
                        if(!this.$root.empty(this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson)) {
                            personMeta = { 
                                personName: this.issueHeaderData.listBibl[sid].sectionMeta.sectionListPerson[pid].personName,
                                personId: pid
                            }
                        }
                    }
                    else {
                        personMeta = { 
                            personName: this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName,
                            personId: pid
                        }
                    }
                    // personMeta = this.$root.xhrDataStore.personography.personIndex[pid].personMeta
                }
                else {
                    personMeta = { 
                        personName: this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson[pid].personName,
                        personId: pid
                    }
                }
                if(this.$root.empty(personMeta.personName)){
                    console.log(personMeta.personName)
                    console.log(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName)
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
                let isAnon = this.getPersonId() == 'anon'
                let biblExists_notSection = !this.biblIsSection(this.biblId) && this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson
                let sectionMetaNotEmpty = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)
                let personInSection = this.getPersonMeta()
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
            const monthMap = {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}
            return monthMap[monthInt]
        },
        formatDate: function() {

            let d = Util.datePartsForIssueId(this.issueId)
            let date = this.lookupMonth(d.month) + ' ' + d.day + ', ' + d.year;
            return date
        }
    },
    computed: {
        frontPage: function () {
            return this.$route.params.biblid ? false : true
        }
    },
    mounted() {
//  Event.$emit('issueSelected', this.$root.state.content.issue.id)
    }
}
</script>
<template>
    <div class="issueHeader" v-if="!this.$root.empty(this.issueHeaderData)">
        <div class="issueInfo" v-if="!this.frontPage">
            <div class='issueDate'>{{this.formatDate()}}</div>
            <biblIssueMeta :issueMeta="this.issueHeaderData.issueMeta"></biblIssueMeta>
            <biblSectionMeta :sectionMeta="this.issueHeaderData.listBibl[this.biblId].sectionMeta" v-if="this.showBiblSectionMeta()"></biblSectionMeta>

        </div>
        <div class="bibl" v-if="haveData()">
            <div class="issue">
                <a class="downloadLink" v-bind:href='stateHref()'>
                    <div class="downloadIcon">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </div>
                    <div class="downloadText">View {{this.dlLabel()}}</div>
                </a>
                <biblPieceMeta :pieceMeta="this.issueHeaderData.listBibl[this.biblId].pieceMeta" v-if="!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta) && !pdfMode()"></biblPieceMeta>
            </div>
            <router-link :to="getAuthorsLink()" tag="div">
                <personMeta :personMeta="this.getPersonMeta()" v-if="this.getPersonMeta()"></personMeta>
            </router-link>
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
</template>