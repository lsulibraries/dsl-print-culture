<template>
    <div class="viewer">
      <transition name="fade"><pdf-viewer v-if="viewer == 'pdf'"></pdf-viewer></transition>
      <transition name="fade"><tei-markup v-if="viewer == 'text'" :issue="this.issueId" :bibl="this.biblId"></tei-markup></transition>
    </div>
</template>
<script>
    import teiMarkup from './teiMarkup'
    import pdfViewer from './pdfViewer'
    export default {
        components: {
            pdfViewer,
            teiMarkup
        },
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
    }
</script>