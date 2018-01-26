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
            <div class="filterSide">
                <div class="personographyAbout">Lorem ipsum</div>
                <personFilter></personFilter>
            </div>
            <div class="personSide">
                <biblDisplay></biblDisplay>
                <personIndex></personIndex>
            </div>
        </div>
</template>