<template>
    <div class="personPieceMeta">
        <div class="authorShip" v-if="showAuthorship()" :title="this.getAuthorshipTitle()">{{this.getAuthorship()}}</div>
        <div class="personPieceMentionStatement" v-if="this.isMentioned()">{{ this.personPieceMeta.personPieceMentionStatement }}</div>
    </div>
</template>
<script>
    export default {
        props: ['personPieceMeta'],
        methods: {
            isMentioned: function () {
                return !this.$root.empty(this.personPieceMeta.personPieceMentionStatement)
            },
            showAuthorship: function () {
                let hasValue     = !this.$root.empty(this.personPieceMeta.personPiecePseudo)
                if(hasValue){
                    return true
                }
                return false
            },
            hasUnusualAuthorship: function () {
               attested = this.personPieceMeta.authorShip.authorStatus == 'attested'
               totallyCertain = this.personPieceMeta.authorShip.authorCertainty == 'high'
               return !(attested && totallyCertain)
            },
            getAuthorship: function () {
                return this.personPieceMeta.personPiecePseudo
            },
            getAuthorshipTitle() {
                return !this.$root.empty(this.personPieceMeta.authorShip) ? this.personPieceMeta.authorShip : ''
            }

        }
    }
</script>