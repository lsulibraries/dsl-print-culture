var topMenuText = { abouttext: "It's what I'm all about",
					techtext: "let's get technical",
					creditstext: "ain't no credit like my credentials"
				}

Vue.component('top-menu',{
	data() {return {currenttxt:topMenuText['abouttext']}},
	methods: {	
		selectAbout: function() {this.$root.windowthis= topMenuText['abouttext'];},
		selectTech: function()  {this.$root.windowthis= topMenuText['techtext'];},
		selectCred: function()  {this.$root.windowthis= topMenuText['creditstext'];}
	},
	template: `
				<div class='topMenu'>
					<a @click="selectAbout()">About</a>
					<a @click="selectTech()">Technical</a>
					<a @click="selectCred()">Credits</a>
				</div> 
			` 
});



var view = ['TEI','PDF','TXT']

Vue.component('control-bar',{
	data() {return {whichview:''}},
	methods: {	
		selectTEI: function() {this.whichview= view[0];console.log(this.whichview)},
		selectPDF: function()  {this.whichview= view[1];console.log(this.whichview)},
		selectTXT: function()  {this.whichview= view[2];console.log(this.whichview)}
	},
	template: `
				<div class='controlBar'>
					<div @click="selectTEI()" class="teiToggle documentToggle">
						<div class="labelToggle">TEI</div>
						<div class=indicatorToggle></div>
					</div>
					<div @click="selectPDF()" class="pdfToggle documentToggle">
						<div class="labelToggle">PDF</div>
						<div class=indicatorToggle></div>
					</div>
					<div @click="selectTXT()" class="txtToggle documentToggle">
						<div class="labelToggle">TXT</div>
						<div class=indicatorToggle></div>
					</div>
				</div>
			`
});


Vue.component('title-bar',{
	data(){ 
		return { selectedIssueTitle:'' }
	},
	mounted() {
		return { selectedIssueTitle: this.$root.iframethis}
		return { log: console.log(this)}
	},
	template: `
			<div class="titleBar">
				<a href="" class="sizeToggle"></a>
				<div class="">{{selectedIssueTitle}}</div>
			</div>
			`
});



Vue.component('main-window',{
	data() {return {source:''}},
	methods: {
        iframe:  function() {this.source=this.$root.iframethis ;return this.source;}
     },
	template: `
	 		<div class="mainWindow">
	 			<img src="images/logo.png"></img>
				<div class="logoSubtitle">The Broadway Journal</div>
					The Broadway Journal (1845-46), one of the four principal magazines that Edgar Allan Poe helped to edit, is here offered in a digital edition. This edition uses Poe’s career as a magazinist as an entry point into antebellum author networks.<br><br>

					In addition to the corrected pages of the journal available for viewing, this project uses the Text Encoding Initiative (TEI) to identify the author of each piece in the 48 issues, including anonymous, pseudonymous, and unidentified works. As a result, readers can see which authors were published and how frequently, and how they were identified - or not.
			
	 			<div @click='iframe()' class="mainInner">{{this.$root.windowthis}}\n{{this.$root.iframethis}}</div>
				<iframe :src=this.$root.iframethis></iframe>
			</div>
			`
});

Vue.component('issue-month',{
	data(){
		return { toggled: false,
			issues: this.$parent.$root.paths[this.list]	
			}
	},
	props: ['month','list'],
	methods: { 
		showChildren: function(){
			if(this.toggled==false){
				for (each in this.$children){
					this.$children[each].meSeen=true;
					this.toggled=true;
					} 
			}
			else{
				for (each in this.$children){
				this.$children[each].meSeen=false;
				this.toggled=false;
				}
			}
		}

	}, 
	template: `
				<div class="singleIndex">
					<div class="singleText" @click="showChildren()">{{this.month}}</div>
					<div class="indicatorIndex"></div>
					<index-child :href="each" v-for="each in this.issues" ></index-child>
				</div>
			`
});

Vue.component('index-child',{
	data() {
		return {
			meSeen:false
		};
	},
	props: ['href'],
	methods: {
		fillIframe: function(){
		
		this.$root.iframethis=this.href;
		}
	},
	template:`			
						<div v-if="meSeen" @click="fillIframe()" class="childIndex">
                            <div class="childText" v-text="this.href.slice(-2)"></div>
                            <div class="childIndicator"></div>
                        </div>
                        
                        `
});

Vue.component('issue-bar',{
	 data(){
	 	return {months:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
	 			lists: ['childrenJan45','childrenFeb45','childrenMar45','childrenApr45','childrenMay45','childrenJun45','childrenJul45','childrenAug45','childrenSep45','childrenOct45','childrenNov45','childrenDec45','childrenJan46']
		 }
	 },
	methods: {
		//jan45Expand: function() {this.$children[0].meSeen=true; console.log(this)} //@click="jan45Expand()"
	},
	template: `
		<div class="issueBar">
			<div class="issueMask"></div>
				<div class="issueIndex">
					<div class="singleIndex" href="">
						<div class="yearText">1845</div>
						<div class="indicatorYear"></div>
					</div>
					<issue-month :month='months[0]' :list='lists[0]' class="singleIndex"></issue-month>
					<issue-month :month='months[1]' :list='lists[1]' class="singleIndex"></issue-month>
					<issue-month :month='months[2]' :list='lists[2]' class="singleIndex"></issue-month>
					<issue-month :month='months[3]' :list='lists[3]' class="singleIndex"></issue-month>
					<issue-month :month='months[4]' :list='lists[4]' class="singleIndex"></issue-month>
					<issue-month :month='months[5]' :list='lists[5]' class="singleIndex"></issue-month>
					<issue-month :month='months[6]' :list='lists[6]' class="singleIndex"></issue-month>
					<issue-month :month='months[7]' :list='lists[7]' class="singleIndex"></issue-month>
					<issue-month :month='months[8]' :list='lists[8]' class="singleIndex"></issue-month>
					<issue-month :month='months[9]' :list='lists[9]' class="singleIndex"></issue-month>
					<issue-month :month='months[10]' :list='lists[10]' class="singleIndex"></issue-month>
					<issue-month :month='months[11]' :list='lists[11]' class="singleIndex"></issue-month>
				</div>
		<div class="issueIndex">
				<div class="singleIndex" href="">
					<div class="yearText">1845</div>
					<div class="indicatorYear"></div>
				</div>
				<issue-month :month='months[0]' :list='lists[12]' class="singleIndex"></issue-month>
			</div>
			<div class="issueFooter"></div>
						<div class="footerBar">
						<img src="images/cc_logo.png" class="ccLogo"></img> 
						<div class="ccText">This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. <br>Contact the <a href="mailto:dsl@lsu.edu" target="_blank">Digital Scholarship Lab</a> at LSU Libraries with any questions or comments. </div>
		</div>
		`
});

new Vue({
	el:'#container',
	data: {
			windowthis: topMenuText['about'],
			iframethis: '',
			paths: {'childrenJan45': ['http://52.40.88.89/broadwayjournal/issue/1845/01/04', 'http://52.40.88.89/broadwayjournal/issue/1845/01/11', 'http://52.40.88.89/broadwayjournal/issue/1845/01/18', 'http://52.40.88.89/broadwayjournal/issue/1845/01/25'],
			'childrenFeb45': ['http://52.40.88.89/broadwayjournal/issue/1845/02/01', 'http://52.40.88.89/broadwayjournal/issue/1845/02/08', 'http://52.40.88.89/broadwayjournal/issue/1845/02/15', 'http://52.40.88.89/broadwayjournal/issue/1845/02/22'],
			'childrenMar45': ['http://52.40.88.89/broadwayjournal/issue/1845/03/01', 'http://52.40.88.89/broadwayjournal/issue/1845/03/08', 'http://52.40.88.89/broadwayjournal/issue/1845/03/15', 'http://52.40.88.89/broadwayjournal/issue/1845/03/22', 'http://52.40.88.89/broadwayjournal/issue/1845/03/29'],
			'childrenApr45': ['http://52.40.88.89/broadwayjournal/issue/1845/04/05', 'http://52.40.88.89/broadwayjournal/issue/1845/04/12', 'http://52.40.88.89/broadwayjournal/issue/1845/04/19', 'http://52.40.88.89/broadwayjournal/issue/1845/04/26'],
			'childrenMay45': ['http://52.40.88.89/broadwayjournal/issue/1845/05/03', 'http://52.40.88.89/broadwayjournal/issue/1845/05/10', 'http://52.40.88.89/broadwayjournal/issue/1845/05/17', 'http://52.40.88.89/broadwayjournal/issue/1845/05/24', 'http://52.40.88.89/broadwayjournal/issue/1845/05/31'],
			'childrenJun45': ['http://52.40.88.89/broadwayjournal/issue/1845/06/07', 'http://52.40.88.89/broadwayjournal/issue/1845/06/14', 'http://52.40.88.89/broadwayjournal/issue/1845/06/21', 'http://52.40.88.89/broadwayjournal/issue/1845/06/28'],
			'childrenJul45': ['http://52.40.88.89/broadwayjournal/issue/1845/07/12', 'http://52.40.88.89/broadwayjournal/issue/1845/07/19', 'http://52.40.88.89/broadwayjournal/issue/1845/07/26'],
			'childrenAug45': ['http://52.40.88.89/broadwayjournal/issue/1845/08/02', 'http://52.40.88.89/broadwayjournal/issue/1845/08/09', 'http://52.40.88.89/broadwayjournal/issue/1845/08/16', 'http://52.40.88.89/broadwayjournal/issue/1845/08/23', 'http://52.40.88.89/broadwayjournal/issue/1845/08/30'],
			'childrenSep45': ['http://52.40.88.89/broadwayjournal/issue/1845/09/06', 'http://52.40.88.89/broadwayjournal/issue/1845/09/13', 'http://52.40.88.89/broadwayjournal/issue/1845/09/20', 'http://52.40.88.89/broadwayjournal/issue/1845/09/27'],
			'childrenOct45': ['http://52.40.88.89/broadwayjournal/issue/1845/10/04', 'http://52.40.88.89/broadwayjournal/issue/1845/10/11', 'http://52.40.88.89/broadwayjournal/issue/1845/10/18', 'http://52.40.88.89/broadwayjournal/issue/1845/10/25'],
			'childrenNov45': ['http://52.40.88.89/broadwayjournal/issue/1845/11/01', 'http://52.40.88.89/broadwayjournal/issue/1845/11/08', 'http://52.40.88.89/broadwayjournal/issue/1845/11/15', 'http://52.40.88.89/broadwayjournal/issue/1845/11/22', 'http://52.40.88.89/broadwayjournal/issue/1845/11/29'],
			'childrenDec45': ['http://52.40.88.89/broadwayjournal/issue/1845/12/06', 'http://52.40.88.89/broadwayjournal/issue/1845/12/13', 'http://52.40.88.89/broadwayjournal/issue/1845/12/20', 'http://52.40.88.89/broadwayjournal/issue/1845/12/27'],
			'childrenJan46': ['http://52.40.88.89/broadwayjournal/issue/1846/01/03']
		}
	},
	methods: {
		shown: function(){this.janSeen =true}
	}
});
						