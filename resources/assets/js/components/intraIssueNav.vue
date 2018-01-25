<template>
    <div class='intraIssueNav'>
        <div class='tocDropdown'>Table of Contents</div>
        <toc-item  v-for='id in tocContent.toc' :id='id'></toc-item>
    </div>
</template>
<script>
    import tocItem from './tocItem'
    export default {
        components: { tocItem },
        data(){
            return {
                issueId: '',
                tocContent: false
            }
        },
        created() {
            // order matters here; see conditional in called fn.
            this.setTocContent()
            this.issueId = this.$route.params.id
        },
        methods: {
            setTocContent: function () {
                if(this.issueId !== this.$route.params.id) {
                    this.tocContent = false
                    this.issueId = this.$route.params.id
                    let url = '/api/broadwayjournal/' + this.issueId + '/toc';
                    axios.get(url).then(response => this.tocContent = response.data);
                }
            },
        },
        watch: {
            '$route': 'setTocContent'
        },
    }
</script>