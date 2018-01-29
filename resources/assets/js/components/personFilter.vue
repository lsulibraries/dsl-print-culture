<template>
  <div class="peopleFilters">
      <div class='personFilter'>
          <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Enter name here">
      </div>
      <div class="roleFilter">
          <div class="roles">
              <div class="roleFilterContributor"     v-bind:class="{active: roleFilter == 'cont'}" @click="updateRoleFilter('cont')">
                <div class="roleDescription">Contributor</div>
              </div>
              <div class="roleFilterMentioned"     v-bind:class="{active: roleFilter == 'ment'}" @click="updateRoleFilter('ment')">
                <div class="roleDescription">Mentioned</div>
              </div>
              <div class="roleFilterEditor"        v-bind:class="{active: roleFilter == 'edit'}" @click="updateRoleFilter('edit')">
                <div class="roleDescription">Editor</div>
              </div>
              <div class="roleFilterCorrespondent" v-bind:class="{active: roleFilter == 'corr'}" @click="updateRoleFilter('corr')">
                <div class="roleDescription">Correspondent</div>
              </div>
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