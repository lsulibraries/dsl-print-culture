<template>
    <div class="personListBibl">
        <div class="personListBiblLabel">Author Works</div>
        <div class="personListBiblInner">
            <div v-if="!biblActive" class="fillerWork"><div class="fillerMessage">Choose an author to view their works</div></div>
            <personMeta v-if="biblActive" :personMeta="person.personMeta"></personMeta>
            <div class="personBlurb" v-if="biblActive &&  this.getBlurb().length > 0 ">{{ this.person.personMeta.personBio.personNote }}</div>
            <personBibl v-if="biblActive" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>
        </div>
    </div>
</template>
<script>
    import personMeta from './personMeta'
    import personBibl from './personBibl'
    export default {
        components: {
            personBibl,
            personMeta,
        },

        data(){
            return {
                person:'',
                biblActive:false,
            }
        },

        created() {
            Event.$on('emitPerson', (person, active) => {
                if(this.person == '' ){
                    this.biblActive = active;
                    this.person = person;
                }
                if(this.person.personMeta.personId == person.personMeta.personId){
                    this.biblActive = active;
                }
                else{
                this.biblActive = active;
                this.person = person;
                }
            })
        },
        methods: {
            deDupeBibls: function(bibl){
                if(Object.keys(bibl).length < 3){
                    return bibl[0]
                }
                return bibl
            },
            getBlurb: function() {
                bioExists = !this.$root.empty(this.person.personMeta.personBio)
                if (!bioExists) {
                    return ''
                }
                noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote)
                return bioExists && noteExists ? this.person.personMeta.personBio.personNote : ''
            }
         }
     }
     </script>
