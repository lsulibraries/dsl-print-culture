<script>
    import issueHeader from './issueHeader'
    import {Circle9} from 'vue-loading-spinner'
    export default {
        components: { issueHeader,  Circle9 },
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
            // Event.$on('personographyLoaded', (index) => {
            //     this.loading = false;
            // })
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
        <div class="issueBody">
            <viewerSelector></viewerSelector>
            <circle9 v-if="this.loading" :size="'40px'"></circle9>
            <issueHeader v-if="!this.loading"></issueHeader>
            <issueViewer v-if="!this.loading" :issueId="this.issueId" :biblId="this.biblId"></issueViewer>
        </div>
    </div>
</template>