<template>
    <div class="personPieceMeta">
    <!--
    <div class="authorRole">{{personPieceMeta.personPieceRole}}</div>
    -->
    <div class="authorShip" v-if="showAuthorship()" :title="this.getAuthorshipTitle()">{{this.getAuthorship()}}</div>
    </div>
</template>
<script>
    export default {
        props: ['personPieceMeta'],
        methods: {
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