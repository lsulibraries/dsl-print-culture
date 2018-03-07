<template>
  <div class="peopleFilters">
      <div class='personFilter'>
          <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Enter name here">
      </div>
      <div class="roleFilter">
          <div class="roles">
              <div class="role-filter-indicator">{{ roleIndicator }}</div>
              <div :id="role" :class="getRoleClass(role)" @click="updateRoleFilter(role)" v-for="role in roles">
                <div class="roleDescription" @click="updateRoleFilter(role.slice(0,4))">{{ upperCaseWord(role) }}</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        methods: {
          getRoleClass: function (role) {
            const active = this.roleFilter.indexOf(role) != -1 ? ' active' : ''
            return 'roleFilter' + this.upperCaseWord(role) + active
          },
            updateFilterString: function () {
                Event.$emit('filterStringUpdated', this.filterString)
            },
            updateRoleFilter: function (role) {
              let idx = this.roleFilter.indexOf(role)
              console.log("index of " + role + " is " + idx)
                if(idx == -1) {
                  this.roleFilter.push(role)
                }
                else {
                  this.roleFilter.splice(idx, 1)
                }
                console.log(this.roleFilter)
                Event.$emit('filterRoleUpdated', this.roleFilter)
            },
            upperCaseWord: function (word) {
              return word.charAt(0).toUpperCase() + word.slice(1)
            },
        },
        data() {
            return {
                filterString: '',
                roleFilter: [],
                roles: ['contributor', 'editor', 'mentioned'],
            }
        },
        computed: {
          roleIndicator: function () {
            return this.roleFilter.join(' & ')
          },
        },
    }
</script>
