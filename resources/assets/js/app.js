import './bootstrap'
window.Event = new Vue();
window.Util  = new Vue({
    methods: {
	datePartsForIssueId: function(id){
	    let ret       = {};
	    ret.year  = id.slice(0,4);
	    ret.month = id.slice(4,6);
	    ret.day   = id.slice(-2);
	    return ret;
	}
    }
});

window.Event = new Vue();

import Vue from 'vue';
import axios from 'axios';
import Container from './components/Container'
import router from './routes';

new Vue({
	el:'#vue-root',
    components: { Container },
    router,
    methods: {
	empty: function (o) {
	    if(o === undefined){
		return true
	    }
	    if(Object.keys(o).length === 0 && o.constructor === Object){
		return true
	    }
	    return false
	},
	getTocEntry: function(issueId, itemId){

	    url = '/api/broadwayjournal/' + issueId + '/toc';
            axios.get(url).then((response) => {
		bibl = response.data
		for (item in bibl.toc){
		    if(item == itemId){
			return bibl.toc[item]
		    }
		    if(bibl.toc[item].pieces){
			for (piece in bibl.toc[item].pieces){
			    if(piece == itemId){
				return bibl.toc[item].pieces.piece
			    }
			}
		    }
		}
	    });
	}
    },
    data: {
	journals:[],
	years: [],
	state: {
	    activeContent: 'abouts', // issues | personography | search
	    content: {
		abouts: 'about', // technical | credits
		issue: {
		    id: '18450104',//'18450104', // yyyy-mm-dd
		    viewer: 'text', // text|pdf
		    page: 1, // int
		    decls_id: ''
		},
		personography: {
		    filterString: '', // ie eapoe
		},
		searchResults:{
		    filter:'', // alpha | by date
		    query: '', //eapoe
		},
		searchString: ''
	    },
	    contrast: 'normal', // high
	},
	xhrDataStore: {
    abouts: {
    about: '',
    methodology: '',
    credits: {}
    },
    personography: {},
    issueText: {},
	},
    },
    created() {
	Event.$on('aboutsSelected', (about) => {
	    this.state.content.abouts = about;
	})
	Event.$on('viewerSelected', (viewer) => this.state.content.issue.viewer = viewer)
	Event.$on('activeContentChange', (content) => {
	    this.state.activeContent = content
	})
	Event.$on('issueSelected', (id) => {
	    this.state.content.issue.id = id;
	    this.state.content.issue.page = 1;
	    this.state.content.issue.decls_id = '';
	    this.state.content.searchString = '';
	})
	Event.$on('issueBiblSelected', (bibl) => {
	    this.state.content.issue.id = bibl.issueId
	    this.state.content.issue.decls_id = bibl.decls_id
	})
	Event.$on('pdf-pageChange', (page) => {
    	    this.state.content.issue.page = page;
	})
	Event.$on('searchSubmitted', (searchString) => {
	    this.state.content.searchString = searchString
	})
	// get abouts data
	axios.get('/api/broadwayjournal/abouts/staff').then(response => this.xhrDataStore.abouts.staff = response.data);
	axios.get('/api/broadwayjournal/abouts/about').then(response => this.xhrDataStore.abouts.about = response.data);
	axios.get('/api/broadwayjournal/abouts/methodology').then(response => this.xhrDataStore.abouts.methodology = response.data);
	axios.get('/api/broadwayjournal/abouts/personography').then(response => this.xhrDataStore.abouts.personographyDescription = response.data);

	axios.get('/api/BroadwayJournal/personography/comprehensive/json').then(response => {
        this.xhrDataStore.personography = response.data;
        Event.$emit('personographyLoaded', this.xhrDataStore.personography);
        });

	axios.get('/api/all-issues/json').then((response) => {
	    this.journals = response.data;

	    for (var issue in this.journals){
		var id = this.journals[issue]
		let iid   = Util.datePartsForIssueId(id);
		this.journals[issue] = {
		    'id':id,
		    'year': iid.year,
		    'month': iid.month,
		    'day': iid.day,
		}
		if(this.years.indexOf(iid.year) == -1){
		    this.years.push(iid.year)
		}
	    }
	});
    },
});
