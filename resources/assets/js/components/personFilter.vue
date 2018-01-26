<template>
  <div class="peopleFilters">
      <div class='personFilter'>
          <label for="personFilter">Search by name</label>
          <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Enter name here">
      </div>
      <div class="roleFilter">
          <div class="labelFilter">Filter by role</div>
          <div class="roles">
              <div class="roleFilterContributor"     v-bind:class="{active: roleFilter == 'cont'}" @click="updateRoleFilter('cont')">Contributor</div>
              <div class="roleFilterMentioned"     v-bind:class="{active: roleFilter == 'ment'}" @click="updateRoleFilter('ment')">Mentioned</div>
              <div class="roleFilterEditor"        v-bind:class="{active: roleFilter == 'edit'}" @click="updateRoleFilter('edit')">Editor</div>
              <div class="roleFilterCorrespondent" v-bind:class="{active: roleFilter == 'corr'}" @click="updateRoleFilter('corr')">Correspondent</div>
              <!-- <div class="numberFilterContributions" v-bind:class="{active: numFilter == 'num'}" @click="updateRoleFilter('num')">Contribution Number</div> -->
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        methods: {
            updateFilterString: function () {
                Event.$emit('filterStringUpdated', this.filterString)
            },
            updateRoleFilter: function (role) {
                this.roleFilter = role
                Event.$emit('filterRoleUpdated', this.roleFilter)
            }
        },
        data() {
            return {
                filterString: '',
                roleFilter: ''
            }
        }
    }
</script>