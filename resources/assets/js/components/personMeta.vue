<template>
    <div class="personMeta">
      <div class="personName">{{this.getName()}}</div>
      <div class="personRole">
          <div class="role-editor" v-if="this.getRole('Editor')">
              <div class="role-name">Editor</div>
          </div>
          <div class="role-contributor" v-if="this.getRole('Correspondent')">
              <div class="role-name">Correspondent</div>
          </div>
          <div class="role-contributor" v-if="this.getRole('Contributor') && this.totalContrib">
              <div class="role-name">Contributor</div>
              <div class="contrib-count">Contributor: {{ this.totalContrib }}</div>
          </div>
          <div class="role-mentioned" v-if="this.getRole('Mentioned')">
              <div class="role-name">Mentioned</div>
              <div class="mention-statement" v-if="this.isMentioned()">Mentioned: {{ this.personMeta.personTotalMentionsOverall + '/' + this.personMeta.personTotalMentioningPieces }}</div>
          </div>
      </div>
    </div>
</template>
<script>
    export default {
        props: ['personMeta', 'totalContrib'],
        methods: {
            contribCount: function () {
                if (this.$root.empty(this.personMeta.personTotalContrib)) {
                    return ''
                }
                else {
                    return "(" + this.personMeta.personTotalContrib + ")"
                }
            },
            isMentioned: function () {
                return !this.$root.empty(this.personMeta.personTotalMentionStatement)
            },
            getName: function () {
                if((typeof this.personMeta.personName) !== 'string') {
                    return this.personMeta.personId + ' (Full name not given)'
                }
                else {
                    return this.personMeta.personName
                }
            },
            getRole: function (role) {
                if (typeof this.personMeta.personRole !== 'string') {
                    return false
                }
                const roles = Object.values(this.personMeta.personRole.split(' '))
                const idx = roles.indexOf(role);
                return idx == -1 ? false : true
            },
            getRoleOld: function getRole(personMeta) {
                if (typeof personMeta.personRole !== 'string') {
                    return ''
                }
                const roles = Object.values(personMeta.personRole.split(' '))
                let ret = ''
                for (let role of roles) {
                    if (role == 'Mentioned') {
                        if (!personMeta.personTotalMentionStatement) {
                            console.log("totalMentionStatement missing for " + personMeta.personId)
                        }
                        else {
                            ret += personMeta.personTotalMentionStatement
                        }
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
