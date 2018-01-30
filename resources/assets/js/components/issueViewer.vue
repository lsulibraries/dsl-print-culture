<template>
    <div class="viewer">
        <div class="pdf-viewer" v-if="pdfMode">{{page}} / {{pageCount}}
            <button class="next-page" @click="decrementPage">Prev Page</button>
            <button class="next-page" @click="incrementPage">Next Page</button>
            <pdf :page="this.page" :src="this.pdfSrc" @num-pages="pageCount = $event" @page-loaded="page = $event"></pdf>
        </div>
        <transition name="fade"><tei-markup v-if="!pdfMode" :issue="this.issueId" :bibl="this.biblId"></tei-markup></transition>
    </div>
</template>
<script>
    import teiMarkup from './teiMarkup'
    import pdfViewer from './pdfViewer'
    import pdf from 'vue-pdf'
    export default {
        components: {
            pdfViewer,
            teiMarkup,
            pdf,
        },
        data() {
            return {
                viewer: this.$root.state.content.issue.viewer,
                page: 1,
                currentPage: 0,
                pageCount: 0,
                bibls: {}
            }
        },
        props: ['issueId', 'biblId'],
        created() {
            this.$on('num-pages', (msg) => {
                console.log(msg)
            })
            this.getIssueBiblData()
        },
        watch: {
            '$route': 'routeChanged'
        },
        computed: {
            pdfSrc: function () {
                return '/storage/broadway-tei/pdf/BroadwayJournal_' + this.$route.params.id + '.pdf'
            },
            pdfMode: function () {
                if (this.$route.query.viewer == 'pdf') {
                    return true
                }
                return false
            }
        },
        methods: {
            incrementPage: function() {
                this.page = this.page == 16 ? 16 : this.page = this.page + 1
            },
            decrementPage: function() {
                this.page = this.page == 1 ? 1 : this.page = this.page - 1
            },
            getIssueBiblData: function () {
                let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
                axios.get(headerUrl).then(response => this.bibls = response.data.listBibl);

            },
            routeChanged: function () {
                if (!this.$route.params.biblid) {
                    this.page = 1
                }
                const biblId = this.$route.params.biblid
                const bibl = this.bibls[biblId]
                if(bibl.hasOwnProperty('sectionMeta') && bibl.sectionMeta.hasOwnProperty('sectionPdfIndex')) {
                    this.page = parseInt(bibl.sectionMeta.sectionPdfIndex)
                }
                else if(bibl.hasOwnProperty('pieceMeta') && bibl.pieceMeta.hasOwnProperty('piecePdfIndex')) {
                    this.page = parseInt(bibl.pieceMeta.piecePdfIndex)
                }
                else {
                    console.log('could not determine page on route changed; setting 1')
                    return 1
                }
            },
        },
    }
</script>