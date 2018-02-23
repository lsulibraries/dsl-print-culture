<template>
    <div class="personMeta">
      <div class="personIcons">
          <div class="contIcon">
          </div>
          <div class="corrIcon">
          </div>
          <div class="editIcon">
          </div>
          <div class="mentIcon">
          </div>
        </div>
      <div class="personName">{{this.getName()}}</div>
      <div class="personRole">
          <div class="role-editor" v-if="this.getRole('Editor')">
              <div class="role-name"><div class="roleIcon"></div></div>
          </div>
          <div class="role-contributor" v-if="this.getRole('Correspondent')">
              <div class="role-name"><div class="roleIcon"></div></div>
          </div>
          <div class="role-contributor" v-if="this.getRole('Contributor')">
              <div class="role-name"><div class="roleIcon"></div></div>
              <div class="contrib-count">{{ getContribStmt() }}</div>
          </div>
          <div class="role-mentioned" v-if="this.getRole('Mentioned')">
              <div class="role-name"><div class="roleIcon"></div></div>
              <div class="mention-statement" v-if="this.isMentioned()">{{ this.getMention() }}</div>
          </div>
      </div>
    </div>
</template>

<style scoped>

.role-editor .roleIcon{
    width: 30px;
    height: 30px;
    background-image: url(https://i.imgur.com/re5qSAd.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;    
}

.role-contributor .roleIcon{
    width: 30px;
    height: 30px;
    background-image: url(https://i.imgur.com/C0aKQ8I.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;    
}

.role-mentioned .roleIcon{
      width: 30px;
    height: 30px;
    background-image: url(https://i.imgur.com/Gs7Ao0H.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;    
}

</style>

<script>
    export default {
        props: ['context', 'personMeta'],
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
            getContribStmt: function () {
              if (this.context == 'detail') {
                const contribs = this.personMeta.personTotalContrib
                const piecesForm = contribs > 1 ? 'pieces' : 'piece'
                return "Contributed " + contribs + " " + piecesForm
              }
              return "Contributions: " + this.personMeta.personTotalContrib
            },
            getMention: function () {
              if (this.context == 'detail') {
                const totalMP = this.personMeta.personTotalMentioningPieces
                const totalM  = this.personMeta.personTotalMentionsOverall
                const totalTimesWords = totalM > 1 ? totalM + " times" : "once"
                const piecesForm = totalMP > 1 ? 'pieces' : 'piece'
                return "Mentioned " +  totalTimesWords + " across " + totalMP + " " + piecesForm
              }
              return "Mentioned: " + this.personMeta.personTotalMentioningPieces
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
