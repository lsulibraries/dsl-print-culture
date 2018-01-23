<template>
    <div class="creditsPersonsList">
        <div class="creditsPersonListActive">
            <div class="personRoleName" v-for="role in this.rolesActive">
            <h3>{{ role }}</h3>
                <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == 'active' && person.personMeta.personRoleName == role"></creditsPerson>
            </div>
        </div>
        <div class="creditsPersonListPast">
            <h2>Past</h2>
            <div class="personRoleName" v-for="role in this.rolesPast">
                <h3>{{ role }}</h3>
                <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == 'past' && person.personMeta.personRoleName == role"></creditsPerson>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            includePersonInList: function (state, role) {
                return person.personMeta.personRole == state && person.personMeta.personRoleName == role
            },
            dataLoaded: function() {
                return this.$root.empty(this.creditsData)
            }
        },
        created() {
            this.creditsData = this.$root.xhrDataStore.personography.projectStaff
            this.rolesPast = []
            this.rolesActive = []
            for (let person in this.creditsData) {
                let role = this.creditsData[person].personMeta.personRoleName
                let state = this.creditsData[person].personMeta.personRole
                if (state == 'active') {
                    if (this.rolesActive.indexOf(role) === -1) {
                        this.rolesActive.push(role)
                    }
                }
                else {
                    if (this.rolesPast.indexOf(role) === -1) {
                        this.rolesPast.push(role)
                    }
                }
            }
        },
        data() {
            return {
                creditsData: {}
            }
        }
    }
</script>