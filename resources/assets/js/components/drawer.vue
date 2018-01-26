<template>
<div>
    <div class="personBlurb">{{ this.getBlurb() }}</div>
      <personBibl v-for="bibl in getBibls()" :bibl="bibl"></personBibl>
        </div>
</template>
<script>
    import personBibl from './personBibl'
    export default {
        components: { personBibl },
        props: ['authorId', 'issueId', 'declsId'],
        methods: {
            getBibls: function () {
                let currentDecls = 'bibl-' + this.issueId + '-' + this.declsId
                let bibls = []
                let allBibls = this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl
                for(let k in allBibls){
                if(k != currentDecls){
                    bibls.push(allBibls[k])
                }
                }
                return bibls
            },
            authorIsAnonymous: function () {
                return this.authorId == 'anon'
            },
            authorWroteSomethingBesidesThis: function () {
                pieces = Object.keys(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl).length
                return parseInt(pieces) > 1
            },
            isBibls: function (){
                return this.authorId && !this.$root.empty(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl)
            },
            getBlurb: function() {
                let person = this.$root.xhrDataStore.personography.personIndex[this.authorId]
                if (this.$root.empty(person)) {
                    return ''
                }
                let bioExists = !this.$root.empty(person.personMeta.personBio)
                if (!bioExists) {
                    return ''
                }
                let noteExists = !this.$root.empty(person.personMeta.personBio.personNote)
                return bioExists && noteExists ? person.personMeta.personBio.personNote : ''
            }
        },
        created() {
            axios.get('/api/BroadwayJournal/personography/comprehensive/json').then(response => {
                this.personography = response.data
                this.authorBibls = this.personography.personIndex[this.authorId]
            })
            Event.$on('issueBiblSelected', (bibl) => {
                this.showBibls = false
                this.authorBibls = this.personography.personIndex[this.authorId]
            })
        },
        data() {
            return {
                personography: {},
                authorBibls: {},
                showBibls: false
            }
        }
    }
</script>
