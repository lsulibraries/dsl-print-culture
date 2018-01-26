<template>
  <div class="personBibl">
    <div class="issueData"> 
      <biblIssueMetaModal v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="this.bibl.issueMeta"></biblIssueMetaModal>
      <biblSectionMeta v-if="!this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>
    </div>
    <div class="pieceTitleContainer">
      <biblPieceMeta v-if="!this.$root.empty(this.bibl.pieceMeta)"  :pieceMeta="bibl.pieceMeta" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>
    </div>
    <biblPersonPieceMeta v-if="!this.$root.empty(this.bibl.personPieceMeta)" :personPieceMeta="this.bibl.personPieceMeta"></biblPersonPieceMeta>
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
        props: ['bibl']
    }
</script>