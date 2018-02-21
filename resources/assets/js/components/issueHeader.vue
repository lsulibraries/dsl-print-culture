<script>
    import drawer from './drawer'
    import issueBibl from './issueBibl'
    import issueDownload from './issueDownload'
    import masthead from './masthead.vue'
    import modal from './modal'

    export default {
        components: {
          drawer,
          issueBibl,
          issueDownload,
          masthead,
          modal
        },
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
        Event.$on('showModal', () => {
          this.showModal = true
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
        getIssueHeaderData: function () {
          let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
          axios.get(headerUrl).then(response => this.issueHeaderData = response.data);
        },
        showIssueHeader: function () {
          return !this.$root.empty(this.issueHeaderData)
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
    },

    mounted() {

    }
}
</script>
<template>
  <div class="issueHeader" v-if="this.showIssueHeader()">
    <masthead></masthead>
    <issueBibl :issueId="this.issueId" :biblId="biblId" :issueHeaderData="this.issueHeaderData"></issueBibl>
    <issueDownload></issueDownload>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="this.showModal" :authorId="this.getPersonId()" :declsId="this.biblId" :issueId="this.issueId"  @close="showModal = false">
      <h3 slot="header">More from this author</h3>
    </modal>
  </div>
</template>
