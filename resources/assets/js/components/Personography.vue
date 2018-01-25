<script>
    import personIndex from './personIndex'
    import personFilter from './personFilter'
    export default {
        components: { personIndex, personFilter },
        data(){
            return {
                modalActive:false,
                personography:[],
                chosen: ''
            }
        }
    }
</script>
<template>
    <div class="personography">
        <div class="personographyAbout">Lorem ipsum</div>
        <personFilter></personFilter>
        <personIndex></personIndex>
    </div>
</template>