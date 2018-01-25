<template>
    <div class="personBibl">
          <biblSectionMeta v-if="!this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>
          <div class="pieceTitleContainer">
          <biblPieceMeta v-if="!this.$root.empty(bibl.pieceMeta)"  :pieceMeta="bibl.pieceMeta" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>
          <biblIssueMeta v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="bibl.issueMeta"></biblIssueMeta>
          </div>
          <biblPersonPieceMeta v-if="!this.$root.empty(bibl.personPieceMeta)" :personPieceMeta="bibl.personPieceMeta"></biblPersonPieceMeta>
        </div>
</template>
<script>
    import biblIssueMeta from './biblIssueMeta'
    import biblSectionMeta from './biblSectionMeta'
    export default {
        components: { biblIssueMeta, biblSectionMeta },
        props: ['bibl']
    }
</script>