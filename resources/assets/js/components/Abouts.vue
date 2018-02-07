<template>
   <div class="abouts">
     <div class="aboutToggle">
       <router-link :to="'/project/about'" tag='div' class="about" active-class="active">Project</router-link>
       <router-link :to="'/project/methodology'" tag='div' class="technical" active-class="active">Methodology</router-link>
       <router-link :to="'/project/staff'" tag='div' class="credits" active-class="active">Staff</router-link>
     </div>
     <div class="aboutViewer">
       <logo v-if="this.context == 'about'"></logo>
       <div class="about-about" v-if="this.context == 'about' && !this.isLoading" v-html="this.text"></div>
       <div class="about-methodology" v-if="this.context == 'methodology'  && !this.isLoading">
         <div class="about-methodology-html" v-html="this.text"></div>
       </div>
       <div class="about-staff" v-if="this.context == 'staff'">
        <creditsPersonList v-if="!this.isLoading"></creditsPersonList>
       </div>
     </div>
   </div>
</template>

<script>
  import logo from './logo'
  import creditsPersonList from './creditsPersonList'
  export default {
      components: { creditsPersonList, logo },

      data() {
          return {
            links: [
              {
                label: 'TEI text files',
                link: '/api/broadwayjournal/download/tei',
                description: "placeholder ..."
              },
              {
                label: 'PDF files',
                link: '/api/broadwayjournal/download/pdf',
                description: "placeholder ..."
              },
              {
                label: 'Intermediate data',
                link: '/api/broadwayjournal/download/intermediate_xml',
                description: "placeholder ..."
              },
              {
                label: 'all',
                link: '/api/broadwayjournal/download/all',
                description: "placeholder ..."
              }
            ]
          }
      },

      computed: {
        context: function () {
          let context = 'about'
          if (['project', 'methodology', 'opendata', 'staff'].indexOf(this.$route.params.id) != -1) {
            context = this.$route.params.id
          }
          console.log(context)
          return context
        },
        text: function () {
          return this.$root.xhrDataStore.abouts[this.context]
        },
        isLoading: function () {
          if (this.context == 'staff') {
            return this.$root.empty(this.$root.xhrDataStore.personography.personIndex)
          }
          return this.$root.xhrDataStore.abouts[this.context].length < 1
        }
      },

      methods: {

      },
      created() {

      }
  }
</script>
