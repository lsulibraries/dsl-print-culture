<script>
    export default {
        data(){
            return {

                issueId: '',
            }
        },

        watch: {
            '$route': 'fetchData'
        },

        props:['id','pieceIndex'],

        created() {
            this.issueId = this.$route.params.id
        },

        methods:{
            fetchData: function() {
                this.issueId = this.$route.params.id
            },
            tocItemSelected: function() {
                Event.$emit("pdf-pageChange",parseInt(this.id.pdf_index))
                this.id.issueId = this.$root.state.content.issue.id
                Event.$emit("issueBiblSelected", this.id)
            },
            getLink: function() {
                return '/issues/' + this.issueId + '/' + this.pieceIndex;
            }
        },
    }
</script>
<template>
        <router-link :to="this.getLink()" class="childPiece" @click='tocItemSelected' tag='div'>
          <div class="childPieceTitle">{{id.title}}</div>
          <div v-if='id.author' class="childPieceAuthor">{{id.author}}</div>
        </router-link>
</template>