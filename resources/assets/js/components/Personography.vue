<script>
    import personIndex from './personIndex'
    import personFilter from './personFilter'
    import biblDisplay from './biblDisplay'
    export default {
        components: { biblDisplay, personIndex, personFilter },
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
        <div class="workSide">
            <biblDisplay></biblDisplay>
            <div class="personographyAbout">Lorem ipsum</div>
        </div>
        <div class="personSide">
            <personFilter></personFilter>
            <personIndex></personIndex>
        </div>
    </div>
</template>