<template>
        <div class='tei-markup'>
            <div class='teiMarkup' v-html="this.highlightText()"></div>
        </div>
</template>
<script>
    export default {
        props: ['issue', 'bibl'],
        created(){
            if (this.$route) {
                if(this.$route.params.id) {
                    this.issueId = this.$route.params.id
                }
                if (this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
            }

            this.page = this.$root.state.content.issue.page
            this.getText()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {
                this.issueId = this.$route.params.id

                if(this.$route.params.id && this.$route.params.biblid) {
                    this.biblId = this.$route.params.biblid
                }
                else { // no biblId supplied in the route
                    this.biblId = false
                }
                this.page = this.$root.state.content.issue.page
                this.getText()
            },
        highlightText: function(){
            let needle = this.$root.state.content.searchString
            if(needle.length < 1){
              return this.issueText
            }
            //Thanks !! http://stackoverflow.com/questions/29433696/create-regex-from-variable-with-capture-groups-in-javascript
            pattern = new RegExp('('+needle+')', 'gi')
            return this.issueText.replace(pattern, "<span class='searchHit'>$1</span>")
        },
        getText: function(){
            if(this.biblId){
              let url = '/api/broadwayjournal/'+ this.issueId + '/piece-text/' + this.biblId;
              axios.get(url).then(response => this.issueText = response.data);
            }else {
                let url = '/api/broadwayjournal/issue/'+ this.issueId + '/masthead';
                  axios.get(url).then(response => this.issueText = response.data);
            }
        },
        getTocEntry: function(issueId, itemId){

            url = '/api/broadwayjournal/' + issueId + '/toc';
                axios.get(url).then((response) => {
            bibl = response.data
            for (item in bibl.toc){
                if(item == itemId){
                this.biblData = bibl.toc[item]
                return
                }
                if(bibl.toc[item].pieces){
                for (piece in bibl.toc[item].pieces){
                    if(piece == itemId){
                    this.biblData = bibl.toc[item].pieces.piece
                    return
                    }
                }
                }
            }
            });
        }
        },
        mounted() {


        },
        data(){
            return{
                issueId: '',
                page:'',
                markdown:[],
                issueText: '',
                // biblId: '',
                biblData: {},
            }
        },
    }
</script>
