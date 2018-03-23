<template>
    <div class='footer'>
        <div class="leftFooter">
            <section id='infoFooter' class='flex'>
                <div id='creativeCommons' class="license-cc-wraper">
                  <a class="license-cc-link" rel="license" href="http://creativecommons.org/licenses/by/4.0/" target="_blank">
                    <img class="license-cc-link-img" alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" />
                    This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
                  </a>
                  <div class="license-contact">
                    Contact the <a href='mailto:dsl@lsu.edu' target='_blank'>Digital Scholarship Lab</a> at LSU Libraries with any questions or comments.
                  </div>
                </div>
            </section>
        </div>
        <div class="rightFooter">
            <div class="rightContainer">
            <headerLogo></headerLogo>
            </div>
        </div>
    </div>
</template>
<script>
    import headerLogo from './headerLogo'
    export default {
        components: { headerLogo }
    }
</script>
