<template>
    <div class="creditsPersonsList">
        <div class="creditsPersonListActive">
            <div class="personRoleName" v-for="role in this.roles">
            <h3>{{ getRoleLabel(role) }}</h3>
                <creditsPerson v-for="person in creditsData" :person="person" v-if="getRole(person) == role"></creditsPerson>
            </div>
        </div>
    </div>
</template>
<script>
    import creditsPerson from './creditsPerson'
    export default {
        components: { creditsPerson },
        methods: {
          getRole: function (person) {
            const state = person.personMeta.personRole
            const role = person.personMeta.personRoleName
            if (role == 'Research Assistant' && state == 'past') {
              return 'Past Research Assistant'
            }
            return role
          },
          getRoleLabel: function (role) {
            if (role.includes('Research Assistant')) {
              return role + 's'
            }
            return role
          }
        },
        created() {
            this.creditsData = this.$root.xhrDataStore.personography.projectStaff
            // for (let person in this.creditsData) {
            //     let role = this.creditsData[person].personMeta.personRoleName
            //     if (this.roles.indexOf(role) === -1) {
            //         this.roles.unshift(role)
            //     }
            //
            // }
        },
        data() {
            return {
                creditsData: {},
                roles: ['Project Lead', 'Project Consultant', 'Consultant', 'Project Development', 'Research Assistant', 'Past Research Assistant'],
            }
        }
    }
</script>
