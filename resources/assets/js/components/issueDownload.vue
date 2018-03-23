<template>
  <div class="issue-download-wrapper">
    <a class="downloadLink issue-download-link" :class="'issue-download-format-' + format" v-bind:href='link' target="_blank">
        <div class="downloadIcon issue-download-icon">
            <i class="fa fa-floppy-o" aria-hidden="true"></i>
        </div>
        <div class="downloadText issue-download-label">Download {{ this.format }}</div>
    </a>
  </div>
</template>

<script>
  export default {

    computed: {
      format: function () {
        return this.$route.query.viewer ? 'pdf' : 'tei'
      },
      link: function(){
        const date = Util.datePartsForIssueId(this.$route.params.id)
        return `/broadwayjournal/issue/${date.year}/${date.month}/${date.day}/${this.format}`
      },
    },

  }
</script>
