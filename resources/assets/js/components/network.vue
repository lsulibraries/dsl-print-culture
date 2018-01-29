<template>
    <div class="network" v-if="this.isLoaded">
      <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
    </div>
</template>
<script>
    import D3Network from 'vue-d3-network'
    export default {
        components: { D3Network },
        data() {
            return {
              // nodesX: [],
              links: [],
              options:
              {
                force: 1500,
                nodeSize: 15,
                nodeLabels: true,
                linkWidth: 1
              }
            }
        },
        computed: {
            isLoaded: function () {
                return !this.$root.empty(this.$root.xhrDataStore.personography)
            },
            nodes: function () {
                if(!this.isLoaded) {
                    return {}
                }

                let nodes = []
                let nodeIds = []
                let linksMap = []
                const excludedAuthors = []
                const includedAuthors = []
                const p = this.$root.xhrDataStore.personography.personIndex

                const filters = {
                    allowSrc: function (linkMapEntry) {
                        return true
                        const allow = includedAuthors.length > 1 && includedAuthors.indexOf(linkMapEntry.source) != -1
                        return allow
                    },
                    allowTarget: function (target, linkMapEntry) {
                        return true
                        const allow = includedAuthors.length > 1 && includedAuthors.indexOf(linkMapEntry.source) != -1
                        return allow
                    }
                }

                for (let id in p) {
                    // don't include anon in the graph
                    if (excludedAuthors.indexOf(id) != -1) {
                        continue
                    }

                    // don't include anyone without a listbibl
                    if (this.$root.empty(p[id].personListBibl)) {
                        // if someone is only mentioned in 'Advertisements' appears as orphaned (John Jay Hardin).
                        continue
                    }
                    // iterate through each author's listBibl
                    let bibls = p[id].personListBibl

                    // figure out a color for this author while looping over bibls
                    const color = {
                        contributor: false,
                        mentioned: false,
                        getColor: function () {
                            if (this.contributor && this.mentioned) {
                                return 'purple'
                            }
                            else if (this.contributor) {
                                return 'red'
                            }
                            else if (this.mentioned) {
                                return '#DDDDFF'
                            }
                            else {
                                return 'black'
                            }
                        }
                    }
                    for (const [key, value] of Object.entries(bibls)) {
                        // only include those bibls for which we can determine the person's role
                        if(value.personPieceMeta) {
                            let role = value.personPieceMeta.personPieceRole

                            // add an entry for each piece
                            if (!linksMap.hasOwnProperty(key)) {
                                linksMap[key] = { 
                                    target: []
                                }
                            }

                            // if the person is a contributor to this piece, add them as the 'source' node
                            if (role == 'Contributor') {
                                linksMap[key].source = id
                                color.contributor = true
                            }
                            // if they are only mentioned, add them to the list of 'target' nodes for this 'source' node
                            else if (role == 'Mentioned') {
                                linksMap[key].target.push(id)
                                color.mentioned = true
                            }
                        }
                    }
                    // add the node, only if it hasn't been added already
                    if(nodeIds.indexOf(id) == -1){
                        nodeIds.push(id)
                        nodes.push({
                            id: id,
                            name: p[id].personMeta.personName,
                            _color: color.getColor()
                        })
                    }
                }
                // nodeIds.forEach(
                //     function (item, index, array) {
                //         nodes.push({ id: item, name: item })
                //     });

                for (const [key, value] of Object.entries(linksMap)) {
                    if (value.source) {
                        if (!filters.allowSrc(value)) {
                            continue
                        }
                        for (let target of value.target) {
                            if (!filters.allowTarget(target, value)) {
                                continue
                            }
                            this.links.push({
                                sid: value.source,
                                tid: target,
                                // _color: 'blue'
                            })
                        }
                    }
                }

                return nodes
            },
        },
        methods: {
        },
    }
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>