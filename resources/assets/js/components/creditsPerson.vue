<template>
    <div class="creditsPerson">
        <div class="creditsPersonName">{{person.personMeta.personName}}</div>
        <div class="creditsPersonNote" v-if="this.hasBio() && this.showBio()">{{ this.getNote() }}</div>
    </div>
</template>
<script>
    export default {
        props: ['person'],
        methods: {
            getAffiliation: function () {
                console.log(this.person.personMeta.personName)
                affiliation = this.$root.empty(this.person.personMeta.personBio.personAffiliation) ? '' : this.person.personMeta.personBio.personAffiliation
                return affiliation
            },
            getNote: function () {
                let note = this.$root.empty(this.person.personMeta.personBio.personNote) ? '' : this.person.personMeta.personBio.personNote
                return note
            },
            hasBio: function () {
                return !this.$root.empty(this.person.personMeta.personBio)
            },
            getRoleName: function () {
                return this.person.personMeta.personRoleName
            },
            showBio: function () {
              return this.person.personMeta.personRole != 'past' || this.person.personMeta.personRoleName != 'Research Assistant'
            },
        }
    }
</script>
