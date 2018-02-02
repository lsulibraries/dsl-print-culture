<script>
    import interIssueNav from './interIssueNav'
    import issueHeader from './issueHeader'
    import issueViewer from './issueViewer'
    import viewerSelector from './viewerSelector'
    import {Circle9} from 'vue-loading-spinner'
    import VueScrollbar from './vue-scrollbar.vue'  
    export default {
        components: { interIssueNav, issueHeader, issueViewer, Circle9, viewerSelector, VueScrollbar },
        created() {
            if (this.$route) {
                if(this.$route.params.id) {
                    this.issueId = this.$route.params.id
                    Event.$emit('issueSelected', this.$route.params.id);
                }
                if (this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                    Event.$emit('issueBiblSelected', {
                        decls_id: this.$route.params.biblid,
                        issueId: this.$route.params.id,
                        pdf_index: 1
                    });
                }
            }
        },
        data() {
            return {
                issueId: '',
                biblId: ''
            }
        },
        computed: {
            loading: function() {
                return this.$root.empty(this.$root.xhrDataStore.personography);
            }
        }
    }
</script>
<template>
    <div class="issue">
        <interIssueNav></interIssueNav>
        <vue-scrollbar classes="issue-scrollbar" ref="Scrollbar">        
            <div class="issueBody">
                <viewerSelector></viewerSelector>
                <circle9 v-if="this.loading" :size="'40px'"></circle9>
                <issueHeader v-if="!this.loading"></issueHeader>
                <issueViewer v-if="!this.loading" :issueId="this.issueId" :biblId="this.biblId"></issueViewer>
            </div>
        </vue-scrollbar>
    </div>
</template>