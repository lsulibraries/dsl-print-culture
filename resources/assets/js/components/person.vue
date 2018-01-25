<template>
      <div  class='person' @click="toggleBibls" v-if="this.passesFilter()" v-bind:class="[person.personMeta.personRole, {active: activePerson}]">
    <personMeta :personMeta="person.personMeta"></personMeta>
    <div class="personBlurb" v-if="this.getBlurb().length > 0 && showBibls">{{ this.getBlurb() }}</div>
    <div class="personListBibl">
          <personBibl v-if="showBibls" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>
    </div>
      </div>
</template>
<script>
    import personMeta from './personMeta';
    import personBibl from './personBibl';
    export default {
        components: { personMeta, personBibl },
        props: ['person'],
        data() {
            return {
                showBibls: false,
                filterString: '',
                filterRole: false,
                    activePerson: false
            }
        },
        methods: {
            deDupeBibls: function (bibl){
                if(Object.keys(bibl).length < 3){
                return bibl[0]
                }
                return bibl
            },
            toggleBibls: function () {
                this.showBibls = !this.showBibls;
                this.activePerson = !this.activePerson;
                    },
            passesFilter: function () {
                let passesString = false
                let passesRole   = false

                if(this.filterString.length < 1){
                  passesString = true
                }

                    if((typeof this.person.personMeta.personName) !== 'string') {
                        console.log(this.person.personMeta.personId + ' is missing a name!')
                        return true
                    }

                if(this.person.personMeta.personName.toLowerCase().includes(this.filterString.toLowerCase())){
                passesString = true
                }

                if(!this.filterRole){
                passesRole = true
                }else if(!this.$root.empty(this.person.personMeta.personRole) && this.person.personMeta.personRole.toLowerCase().includes(this.filterRole.toLowerCase())){
                passesRole = true
                }
                
                return passesString && passesRole
            },
            getBlurb: function() {
                let bioExists = !this.$root.empty(this.person.personMeta.personBio)
                if (!bioExists) {
                    return ''
                }
                let noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote)
                return bioExists && noteExists ? this.person.personMeta.personBio.personNote : ''
            }
        },
        created() {
            Event.$on('filterStringUpdated', (filterString) => {
                this.filterString = filterString
            })
            Event.$on('filterRoleUpdated', (filterRole) => {
                this.filterRole = filterRole
            })
    }
}
</script>