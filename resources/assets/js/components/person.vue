<template>
    <router-link tag='div' class='person' :to="this.getLink()" v-if="this.passesFilter()" v-bind:class="[person.personMeta.personRole, {active: activePerson}]">
        <personMeta :contrib="this.totalContrib" :personMeta="person.personMeta"></personMeta>
    </router-link>
</template>
<script>
    import personMeta from './personMeta';
    import personBibl from './personBibl';
    export default {
        components: { personMeta, personBibl },
        props: ['person'],
        data() {
            return {
                filterString: '',
                filterRole: [],
                totalContrib: 0
            }
        },
        computed: {
            activePerson: function () {
                if (this.$route.params.id) {
                    return this.$route.params.id == this.person.personMeta.personId
                }
                return false
            },
        },
        methods: {
            getLink: function () {
                if (this.$route.params.id == this.person.personMeta.personId) {
                    return '/authors'
                }
                return '/authors/' + this.person.personMeta.personId
            },
            getContribCount: function () {
              if(!this.person.personListBibl) {
                return
              }
              for (const bibl in this.person.personListBibl) {
                if (this.person.personListBibl[bibl].personPieceMeta && bibl.personPieceMeta.personPieceRole == 'Contributor') {
                  this.totalContrib++
                }
              }
            },
            transmitPerson: function () {
                if(this.activePerson == false){
                    Event.$emit('emitPerson', this.person, true)
                    this.activePerson = true
                }
                else{
                    Event.$emit('emitPerson', this.person, false)
                    this.activePerson = false
                }
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
                if(this.filterRole.length == 0){
                    passesRole = true
                }else if(this.filterRole.length == 1 && !this.$root.empty(this.person.personMeta.personRole) && this.filterRole.indexOf(this.person.personMeta.personRole.toLowerCase()) != -1){
                    passesRole = true
                }
                else {
                  if(!this.$root.empty(this.person.personMeta.personRole)) {
                    const personRoles = this.person.personMeta.personRole.toLowerCase().split(' ')
                    let result = true
                    for(const filter of this.filterRole) {
                      if(personRoles.indexOf(filter) == -1) {
                        result = false
                        break
                      }
                    }
                    passesRole = result
                  }
                }
                return passesString && passesRole
            },
            getBlurb: function() {
                const bioExists = !this.$root.empty(this.person.personMeta.personBio)
                if (!bioExists) {
                    return ''
                }
                const noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote)
                return bioExists && noteExists ? this.person.personMeta.personBio.personNote : ''
            }
        },
        created() {
          this.getContribCount();

            Event.$on('emitPerson', (personId) => {
                if(this.person.personMeta.personId != personId){
                    this.activePerson = false;
                }
                if(personId == this.person.personMeta.personId && this.activePerson == true){
                    this.activePerson = false;
                }
            })
            Event.$on('filterStringUpdated', (filterString) => {
                this.filterString = filterString
            })
            Event.$on('filterRoleUpdated', (filterRole) => {
                this.filterRole = filterRole
            })
        }
    }
</script>
