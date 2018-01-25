<template>
    <div class="issueMeta">
      <div class="issueVol">Vol. {{issueMeta.issueVol}}</div>
      <div class="issueNum">No. {{issueMeta.issueNum}}</div>
    </div>
</template>
<script>
    export default {
        props: ['issueMeta']
    }
</script>
