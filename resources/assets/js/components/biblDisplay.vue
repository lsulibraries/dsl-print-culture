<template>
    <div class="personListBibl">
        <div class="personListBiblLabel">Author Detail</div>
        <vue-scrollbar classes="person-scrollbar" ref="Scrollbar">
            <div class="personListBiblInner">
                <div v-if="!biblActive && descriptionLoaded" class="person-index-about" v-html="this.$root.xhrDataStore.abouts.personographyDescription"></div>
                <div v-if="!biblActive" class="fillerWork">
                    <div class="fillerMessage">Choose an author to view more</div>
                </div>
                <personMeta v-if="biblActive" :context="'detail'" :personMeta="person.personMeta"></personMeta>
                <div class="personBlurb" v-if="biblActive &&  this.getBlurb().length > 0 ">{{ this.person.personMeta.personBio.personNote }}</div>
                <personBibl v-if="biblActive" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>
                <vueFooter></vueFooter>
            </div>
        </vue-scrollbar>
    </div>
</template>

<style scoped>

.footer{

}
</style>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import personMeta from './personMeta'
    import personBibl from './personBibl'
    import VueFooter from './vueFooter'

    export default {
        components: {
            personBibl,
            personMeta,
            VueScrollbar,
            VueFooter
        },

        data(){
            return {
                personographyDescription: ""
            }
        },

        watch: {
        '$route': 'routeUpdated'
        },

        computed: {
            descriptionLoaded: function() {
                if (this.personographyDescription){
                    return this.personographyDescription.length > 0
                }
                return false
            },
            biblActive: function () {
                if (this.$route.params.id && this.personographyLoaded() && this.person) {
                    return this.$route.params.id == this.person.personMeta.personId
                }
                return false
            },
            person: function () {
                if (this.$route.params.id) {
                    if (this.personographyLoaded() &&  this.$root.xhrDataStore.personography.personIndex[this.$route.params.id]) {
                        const p = this.$root.xhrDataStore.personography.personIndex[this.$route.params.id]
                        return p
                    }
                }
                return false
            },
        },

        created() {
            axios.get('/api/broadwayjournal/abouts/personography').then(response => this.personographyDescription = response.data);
        },
        methods: {
            routeUpdated: function () {
                this.$refs.Scrollbar.scrollToY(0)
            },

            personographyLoaded: function () {
                return !this.$root.empty(this.$root.xhrDataStore.personography)
            },
            deDupeBibls: function(bibl){
                if(Object.keys(bibl).length < 3){
                    return bibl[0]
                }
                return bibl
            },
            getBlurb: function() {
                const bioExists = !this.$root.empty(this.person.personMeta.personBio)
                if (!bioExists) {
                    return ''
                }
                const noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote)
                return bioExists && noteExists ? this.person.personMeta.personBio.personNote : ''
            }
         }
     }
     </script>
