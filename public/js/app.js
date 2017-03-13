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
			<div>
				<div class='topMenu'>
					<a @click="selectAbout()">About</a>
					<a @click="selectTech()">Technical</a>
					<a @click="selectCred()">Credits</a>
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


Vue.component('index-child',{
	data() {
		return {href:[]};
	},

	methods: {
		viewIssue: function(){this.href = this.$el.outerHTML.slice(30, -10);this.$root.iframethis = this.href;console.log(this);},
		fillIframe: function() {this.$root.iframethis = this.href;}
	},
	template:`
						<div @click="viewIssue()" class="childIndex">
                            <div class="childText"></div>
                            <div class="childIndicator"></div>
                        </div>
                        `
});

Vue.component('issue-bar',{
	data(){
		return { 
			childrenJan45: ['http://52.40.88.89/broadwayjournal/issue/1845/01/04', 'http://52.40.88.89/broadwayjournal/issue/1845/01/11', 'http://52.40.88.89/broadwayjournal/issue/1845/01/18', 'http://52.40.88.89/broadwayjournal/issue/1845/01/25'],
			Jan45days: ['04','11','18','25'],
			childrenFeb45: ['http://52.40.88.89/broadwayjournal/issue/1845/02/01', 'http://52.40.88.89/broadwayjournal/issue/1845/02/08', 'http://52.40.88.89/broadwayjournal/issue/1845/02/15', 'http://52.40.88.89/broadwayjournal/issue/1845/02/22'],
			Feb45days: ['01','08','15','22'],
			childrenMar45: ['http://52.40.88.89/broadwayjournal/issue/1845/03/01', 'http://52.40.88.89/broadwayjournal/issue/1845/03/08', 'http://52.40.88.89/broadwayjournal/issue/1845/03/15', 'http://52.40.88.89/broadwayjournal/issue/1845/03/22', 'http://52.40.88.89/broadwayjournal/issue/1845/03/29'],
			Mar45days: ['01','08','15','22','29'],
			childrenApr45: ['http://52.40.88.89/broadwayjournal/issue/1845/04/05', 'http://52.40.88.89/broadwayjournal/issue/1845/04/12', 'http://52.40.88.89/broadwayjournal/issue/1845/04/19', 'http://52.40.88.89/broadwayjournal/issue/1845/04/26'],
			Apr45days: ['05','12','19','26'],
			childrenMay45: ['http://52.40.88.89/broadwayjournal/issue/1845/05/03', 'http://52.40.88.89/broadwayjournal/issue/1845/05/10', 'http://52.40.88.89/broadwayjournal/issue/1845/05/17', 'http://52.40.88.89/broadwayjournal/issue/1845/05/24', 'http://52.40.88.89/broadwayjournal/issue/1845/05/31'],
			May45days: ['03','10','17','24','31'],
			childrenJun45: ['http://52.40.88.89/broadwayjournal/issue/1845/06/07', 'http://52.40.88.89/broadwayjournal/issue/1845/06/14', 'http://52.40.88.89/broadwayjournal/issue/1845/06/21', 'http://52.40.88.89/broadwayjournal/issue/1845/06/28'],
			Jun45days: ['07','14','21','28'],
			childrenJul45: ['http://52.40.88.89/broadwayjournal/issue/1845/07/12', 'http://52.40.88.89/broadwayjournal/issue/1845/07/19', 'http://52.40.88.89/broadwayjournal/issue/1845/07/26'],
			Jul45days: ['12','19','26'],
			childrenAug45: ['http://52.40.88.89/broadwayjournal/issue/1845/08/02', 'http://52.40.88.89/broadwayjournal/issue/1845/08/09', 'http://52.40.88.89/broadwayjournal/issue/1845/08/16', 'http://52.40.88.89/broadwayjournal/issue/1845/08/23', 'http://52.40.88.89/broadwayjournal/issue/1845/08/30'],
			Aug45days: ['02','09','16','23','30'],
			childrenSep45: ['http://52.40.88.89/broadwayjournal/issue/1845/09/06', 'http://52.40.88.89/broadwayjournal/issue/1845/09/13', 'http://52.40.88.89/broadwayjournal/issue/1845/09/20', 'http://52.40.88.89/broadwayjournal/issue/1845/09/27'],
			Sep45days: ['06','13','20','27'],
			childrenOct45: ['http://52.40.88.89/broadwayjournal/issue/1845/10/04', 'http://52.40.88.89/broadwayjournal/issue/1845/10/11', 'http://52.40.88.89/broadwayjournal/issue/1845/10/18', 'http://52.40.88.89/broadwayjournal/issue/1845/10/25'],
			Oct45days: ['04','11','18','25'],
			childrenNov45: ['http://52.40.88.89/broadwayjournal/issue/1845/11/01', 'http://52.40.88.89/broadwayjournal/issue/1845/11/08', 'http://52.40.88.89/broadwayjournal/issue/1845/11/15', 'http://52.40.88.89/broadwayjournal/issue/1845/11/22', 'http://52.40.88.89/broadwayjournal/issue/1845/11/29'],
			Nov45days: ['01','08','15','22'],
			childrenDec45: ['http://52.40.88.89/broadwayjournal/issue/1845/12/06', 'http://52.40.88.89/broadwayjournal/issue/1845/12/13', 'http://52.40.88.89/broadwayjournal/issue/1845/12/20', 'http://52.40.88.89/broadwayjournal/issue/1845/12/27'],
			Dec45days: ['06','13','20','27'],
			childrenJan46:['http://52.40.88.89/broadwayjournal/issue/1846/01/03'],
			Jan46days: ['03'],
		};
	},
	template: `
		<div class="issueBar">
			<div class="issueIndex">
					<div class="singleIndex">
						<div class="yearText">1845</div>
						<div class="indicatorYear"></div>
					</div>
					<div class="singleIndex">
						<div class="singleText">JAN</div>
						<div class="indicatorIndex"></div>
					</div>	
					<index-child :href="each" v-for="(each, index) in childrenJan45" v-text="Jan45days[index]" ></index-child>
					<div class="singleIndex">
						<div class="singleText">FEB</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenFeb45" v-text="Feb45days[index]"></index-child>

					<div class="singleIndex">
						<div class="singleText">MAR</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenMar45" v-text="Mar45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">APR</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenApr45" v-text="Apr45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">MAY</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenMay45" v-text="May45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">JUN</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenJun45" v-text="Jun45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">JUL</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenJul45" v-text="Jul45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">AUG</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenAug45" v-text="Aug45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">SEP</div>
						<div class="indicatorIndex"></div>
					</div>	
					<index-child :href="each" v-for="(each, index) in childrenSep45" v-text="Sep45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">OCT</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenOct45" v-text="Oct45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">NOV</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenNov45" v-text="Nov45days[index]"></index-child>
					<div class="singleIndex">
						<div class="singleText">DEC</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenDec45" v-text="Dec45days[index]"></index-child>
					<div class="singleIndex">
						<div class="yearText">1846</div>
						<div class="indicatorYear"></div>
					</div>	
					<div class="singleIndex">
						<div class="singleText">JAN</div>
						<div class="indicatorIndex"></div>
					</div>
					<index-child :href="each" v-for="(each, index) in childrenJan46" v-text="Jan46days[index]"></index-child>
			</div>
			<div class="footerBar">
			<img src="images/cc_logo.png" class="ccLogo"></img> 
			<div class="ccText">This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. <br>Contact the <a href="mailto:dsl@lsu.edu" target="_blank">Digital Scholarship Lab</a> at LSU Libraries with any questions or comments. </div>
		</div>
		</div>
		`
});


var view = ['TEI','PDF','TXT']

Vue.component('controll-bar',{
	data() {return {whichview:''}},
	methods: {	
		selectTEI: function() {this.whichview= view[0];console.log(this.whichview)},
		selectPDF: function()  {this.whichview= view[1];console.log(this.whichview)},
		selectTXT: function()  {this.whichview= view[2];console.log(this.whichview)}
	},
	template: `
				<div class='controllBar'>
					<div @click="selectTEI()" class="teiToggle documentToggle">
						<div class="lableToggle">TEI</div>
						<div class=indicatorToggle></div>
					</div>
					<div @click="selectPDF()" class="pdfToggle documentToggle">
						<div class="lableToggle">PDF</div>
						<div class=indicatorToggle></div>
					</div>
					<div @click="selectTXT()" class="txtToggle documentToggle">
						<div class="lableToggle">TXT</div>
						<div class=indicatorToggle></div>
					</div>
				</div>
			`
});

Vue.component('main-window',{
	data() {return {source:''}},
	methods: {
        iframe:  function() {this.source=this.$root.iframethis ;return this.source;}
     },
	template: `
	 	<div>
	 		<div class="mainWindow">
	 			<img src="images/logo.png"></img>
						<div class="logoSubtitle">The Broadway Journal</div>
					The Broadway Journal (1845-46), one of the four principal magazines that Edgar Allan Poe helped to edit, is here offered in a digital edition. This edition uses Poe’s career as a magazinist as an entry point into antebellum author networks.<br><br>

					In addition to the corrected pages of the journal available for viewing, this project uses the Text Encoding Initiative (TEI) to identify the author of each piece in the 48 issues, including anonymous, pseudonymous, and unidentified works. As a result, readers can see which authors were published and how frequently, and how they were identified - or not.
			</div>
	 		<div @click='iframe()' class="mainWindow">{{this.$root.windowthis}}\n{{this.$root.iframethis}}</div>
			<iframe :src=this.$root.iframethis></iframe>
	 	</div>
			`
});

new Vue({
	el:'#container',
	data: {
			windowthis: topMenuText['about'],
			iframethis: ''
	},
});
