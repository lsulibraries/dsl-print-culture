<template>
    <div class="viewer">
        <div class="pdf-viewer" v-if="pdfMode"><div class="pdf-page-location">{{page}} / {{pageCount}}</div>
            <router-link tag='button' class="pdf-prev-page" :to="getPrevPageLink()" :disabled="firstPage">Prev Page</router-link>
            <router-link tag='button' class="pdf-next-page" :to="getNextPageLink()" :disabled="lastPage">Next Page</router-link>
            <transition name="fade"><pdf :page="this.page" :src="this.pdfSrc" @num-pages="pageCount = $event" @page-loaded="page = $event"></pdf></transition>
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
            loaded: function () {
                return this.bibls ? true : false
            },
            page: {
                get: function () {
                    if (this.$route.query.page) {
                        return parseInt(this.$route.query.page)
                    }
                    else if (this.$route.params.biblid) {
                        return this.pageFromBiblid()
                    }
                    else {
                        return 1
                    }
                },
                set: function (newVal) {
                    return newVal
                }
            },
            lastPage: function () {
                return this.page == this.pageCount
            },
            firstPage: function () {
                return this.page == 1  
            },
            pdfSrc: function () {
                return '/storage/broadway-tei/pdf/BroadwayJournal_' + this.$route.params.id + '.pdf'
            },
            pdfMode: function () {
                if (this.$route.query.viewer == 'pdf' && this.loaded) {
                    return true
                }
                return false
            },
            viewer: function () {
                return this.$route.query.viewer == 'pdf' ? 'pdf' : 'text'
            },
        },
        methods: {
            getNextPageLink: function () {
                if (this.$route.query.page) {
                    return this.$route.path + '?viewer=pdf&page=' + (parseInt(this.$route.query.page) + 1)
                }
                return this.$route.fullPath + '&page=' + (parseInt(this.page) + 1)
            },
            getPrevPageLink: function () {
                if (this.$route.query.page) {
                    return this.$route.path + '?viewer=pdf&page=' + (parseInt(this.$route.query.page) - 1)
                }
                return this.$route.fullPath + '&page=' + (parseInt(this.page) - 1)
            },
            getIssueBiblData: function () {
                let headerUrl = '/api/broadwayjournal/issue/'+ this.issueId +'/header';
                axios.get(headerUrl).then(response => this.bibls = response.data.listBibl);

            },
            pageFromBiblid: function () {
                if (!this.loaded) {
                    return -1
                }
                const biblId = this.$route.params.biblid
                const bibl = this.bibls[biblId]

                if(bibl.hasOwnProperty('sectionMeta') && bibl.sectionMeta.hasOwnProperty('sectionPdfIndex')) {
                    return parseInt(bibl.sectionMeta.sectionPdfIndex)
                }
                else if(bibl.hasOwnProperty('pieceMeta') && bibl.pieceMeta.hasOwnProperty('piecePdfIndex')) {
                    return parseInt(bibl.pieceMeta.piecePdfIndex)
                }
                else {
                    // prob an error in the data
                    console.log('could not determine page on route changed; setting 1')
                    return 1
                }
            },
            routeChanged: function () {
                // Set the page

                // If q param 'viewer' is set, let that override all
                if (this.$route.query.page) {
                    this.page = this.$route.query.page
                }
                // otherwise, lookup the page based on biblid
                else if (this.$route.params.biblid) {
                    this.page = this.pageFromBiblid()
                }
                // or just return 1; no bibl set
                else {
                    this.page = 1
                }
                this.getIssueBiblData()
            },
        },
    }
</script>