<template>
  <div class="personBibl" :class="roleClass">
    <div class="issueData">
      <biblIssueMetaModal v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="this.bibl.issueMeta"></biblIssueMetaModal>
    </div>
    <biblSectionMeta v-if="!this.isAdvertisements() && !this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>
    <div class="pieceTitleContainer">
      <biblPieceMeta v-if="showPieceMeta()"  :pieceMeta="this.getPieceMeta()" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>
    </div>
    <biblPersonPieceMeta v-if="this.bibl.personPieceMeta" :personPieceMeta="this.bibl.personPieceMeta"></biblPersonPieceMeta>
  </div>
</template>
<script>
    import biblIssueMeta from './biblIssueMeta'
    import biblIssueMetaModal from './biblIssueMetaModal'
    import biblPersonPieceMeta from './biblPersonPieceMeta'
    import biblPieceMeta from './biblPieceMeta'
    import biblSectionMeta from './biblSectionMeta'
    export default {
        components: { biblIssueMeta, biblIssueMetaModal, biblPersonPieceMeta, biblPieceMeta, biblSectionMeta },
        props: ['bibl'],
        computed: {
          roleClass: function () {
            return 'bibl-' + this.bibl.personPieceMeta.personPieceRole.toLowerCase()
          },
        },
        methods: {
          getPieceMeta: function () {
            if (this.isAdvertisements()) {
              return {
                pieceTitle: 'Advertisements',
                pieceId: this.bibl.sectionMeta.sectionId,
                piecePdfIndex: this.bibl.sectionMeta.sectionPdfIndex
              }
            }
            return this.bibl.pieceMeta
          },
          isAdvertisements: function () {
            return this.bibl.sectionMeta && this.bibl.sectionMeta.sectionTitle == 'Advertisements'
          },
          showPieceMeta: function () {
            if(!this.$root.empty(this.bibl.pieceMeta)) {
              return true
            }
            else if (this.isAdvertisements()) {
              return true
            }
            return false
          },
        }
    }
</script>
