<script>
    import interIssueNav from './interIssueNav'
    import issueHeader from './issueHeader'
    import issueViewer from './issueViewer'
    import {Circle9} from 'vue-loading-spinner'
    import VueScrollbar from 'vue2-scrollbar';
    export default {
        components: { interIssueNav, issueHeader, issueViewer, Circle9, VueScrollbar },
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
        watch: {
        '$route': 'routeUpdated'
        },
        computed: {
            loading: function() {
                return this.$root.empty(this.$root.xhrDataStore.personography);
            },
            frontPage: function () {
                return this.$route.params.biblid ? false : true
            }
        },
        methods: {
            routeUpdated: function () {
              if (this.$refs.Scrollbar) {
                this.$refs.Scrollbar.scrollToY(0);
              }
            }
        }
    }
</script>
<template>
    <div class="issue">
        <interIssueNav></interIssueNav>
            <div class="issueBody" :class="{ isFront: frontPage }">
                <circle9 v-if="this.loading" :size="'40px'"></circle9>
                <issueHeader v-if="!this.loading"></issueHeader>
                <issueViewer v-if="!this.loading" :issueId="this.issueId" :biblId="this.biblId"></issueViewer>
            </div>
    </div>
</template>
