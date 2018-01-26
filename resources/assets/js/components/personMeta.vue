<template>
    <div class="personMeta">
      <div class="personName">{{this.getName()}}</div>
      <div class="personRole">{{this.getRole(personMeta)}}</div>
          <div class="personViaf">
        <!--
        <a v-if="!this.$root.empty(personMeta.personViaf)" v-bind:href="personMeta.personViaf" target="_blank"><i class="fa fa-globe" aria-hidden="true"></i>VIAF</a>
        -->
          </div>
        </div>
</template>
<script>
    export default {
        props: ['personMeta'],
        methods: {
            getName: function () {
                if((typeof this.personMeta.personName) !== 'string') {
                    return this.personMeta.personId + ' (Full name not given)'
                }
                else {
                    return this.personMeta.personName
                }
            },
            getRole: function getRole(personMeta) {
                if (typeof personMeta.personRole !== 'string') {
                    return ''
                }
                const roles = Object.values(personMeta.personRole.split(' '))
                let ret = ''
                for (let role of roles) {
                    if (role == 'Mentioned') {
                        let count = personMeta.personTotalMention
                        if (!personMeta.personTotalMention) {
                            console.log("totalMention missing for " + personMeta.personId)
                            count = '?'
                        }
                        ret += role + ' (' + count + ')'
                    }
                    else if (role == 'Contributor') {
                        let count = personMeta.personTotalContrib
                        if (!personMeta.personTotalContrib) {
                            console.log("totalContrib missing for " + personMeta.personId)
                            count = '?'
                        }
                        ret += role + ' (' + count + ')'
                    }
                    else {
                        ret += ' ' + role
                    }
                }
                
                return ret
            }
        }   
    }
</script>