<template>
    <div class="pieceMeta">
        <div @click="$emit('close')">
            <router-link :to="this.getIssueLink()" tag='h1' :class="'pieceTitle'">{{ this.getTitle() }}</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['pieceMeta', 'issueId'],
        methods: {
            getTitle: function () {
                return this.pieceMeta.pieceTitle
            },
            getIssueLink: function () {
                const viewerMode = this.$route.query.viewer == 'pdf' ? '?viewer=pdf' : ''
                return '/issues/' + this.issueId + '/' + this.pieceMeta.pieceId + viewerMode
            },
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
    }
</script>