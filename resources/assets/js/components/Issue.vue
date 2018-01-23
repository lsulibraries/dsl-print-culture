<script>
    import issueHeader from './issueHeader'
    export default {
        components: { issueHeader }
    }
</script>
<template>
    <div class="issue">
        <interIssueNav></interIssueNav>
        <div class="issueBody">
            <viewerSelector></viewerSelector>
            <issueHeader></issueHeader>
            <issueViewer></issueViewer>
        </div>
    </div>
</template>