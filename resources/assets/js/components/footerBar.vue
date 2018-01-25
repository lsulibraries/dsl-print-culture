<script>
    export default {
        data() {
            return{
                fText: ['This work is licensed under a ','Creative Commons Attribution 4.0 International License','. ','Contact the ','Digital Scholarship Lab',' at LSU Libraries with any questions or comments.']
            }
        },
    }
</script>
<template>
    <div>
        <div class="issueFooter"></div>
        <div class="footerBar">
            <div class="ccText">
                {{fText[0]}}
                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">{{fText[1]}}</a>
                {{fText[2]}}
                <br>
                {{fText[3]}}
                <a href="mailto:dsl@lsu.edu" target="_blank">{{fText[4]}}</a>
                {{fText[5]}}
            </div>
        </div>
    </div>
</template>