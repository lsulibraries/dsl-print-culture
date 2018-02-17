<template>
   <div class="abouts">
     <div class="aboutToggle">
       <router-link :to="'/project'" tag='div' class="about about-link-project" active-class="active">Project</router-link>
       <router-link :to="'/methodology'" tag='div' class="technical about-link-methodology" active-class="active">Methodology</router-link>
       <router-link :to="'/staff'" tag='div' class="credits about-link-staff" active-class="active">Staff</router-link>
     </div>
     <div class="aboutViewer" v-if="!this.isLoading">
       <logo v-if="showLogo"></logo>
       <div :class="'about-'+ context" v-if="this.context != 'staff'" v-html="this.contextMap[context].text"></div>
       <div class="about-staff" v-if="this.context == 'staff'">
        <creditsPersonList></creditsPersonList>
       </div>
     </div>
   </div>
</template>

<script>
  import logo from './logo'
  import creditsPersonList from './creditsPersonList'
  export default {
      components: {
        creditsPersonList,
        logo
      },

      data() {
          return {
            contextMap: {
              home: {
                file: 'home.html',
                urlParam: '',
                text: ''
              },
              project: {
                file: 'about.project.html',
                urlParam: 'project',
                text: ''
              },
              methodology: {
                file: 'about.method.data.html',
                urlParam: 'methodology',
                text: ''
              },
              staff: {
                file: false,
                urlParam: 'staff',
                text: false
              },
            },
          }
      },

      computed: {
        context: function () {
          let context = 'home'
          if (['project', 'methodology', 'staff'].indexOf(this.$route.params.id) != -1) {
            context = this.$route.params.id
          }
          return context
        },
        showLogo: function () {
          return this.context == 'home'
        },
        text: function () {
          if (this.isLoading) {
            return ''
          }
          return this.$root.xhrDataStore.abouts[this.context]
        },
        isLoading: function () {
          if (this.context == 'staff') {
            return this.$root.empty(this.$root.xhrDataStore.personography.personIndex)
          }
          return this.$root.xhrDataStore.abouts[this.context] && this.$root.xhrDataStore.abouts[this.context].length < 1
        }
      },
      watch: {
          '$route': 'routeUpdated'
      },
      methods: {
        routeUpdated: function () {

        },
      },
      created() {
        // get abouts data
        for(const context of ['home', 'project', 'methodology']) {
          const contextElement = this.contextMap[context]
          if (!this.contextMap[context].text) {
              axios.get('/api/broadwayjournal/abouts/' + contextElement.file).then(response => {
                this.$root.xhrDataStore.abouts[context] = response.data
                this.contextMap[context].text = response.data
              });
          }
        }
        axios.get('/api/broadwayjournal/abouts/staff').then(response => this.$root.xhrDataStore.abouts.staff = response.data);
      }
  }
</script>
