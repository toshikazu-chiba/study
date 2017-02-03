var SampleApp = {};

SampleApp.commonMethod = {
	// インクルードされるテンプレートのディレクトリパス
	tmpDir: 'action/view/templates/base/'
	// インクルードされるテンプレート内で読み込まれるテンプレートのディレクトリパス
	,incDir: 'action/view/templates/base/inc/'
	// テンプレートファイル読み込み記法
	,incTmp: function (dir, fileName) {
		return dir + fileName + '.html';
	}
}

SampleApp.Config = {
	appTtl: 'サンプルアプリ'
	,pageTtl: 'サンプルタイトル'
	,copyright: '©2017 sapmle app'
}

angular.module('sampleApp', ['headerMdl', 'gnavMdl', 'containerMdl', 'footerMdl'])
	.controller ('mainCtrl', ['$scope', function ($scope) {
		$scope.incHeader = SampleApp.commonMethod.incTmp (SampleApp.commonMethod.tmpDir, 'tpl_header');
		$scope.incGnav = SampleApp.commonMethod.incTmp (SampleApp.commonMethod.tmpDir, 'tpl_gnav');
		$scope.incContainer = SampleApp.commonMethod.incTmp (SampleApp.commonMethod.tmpDir, 'tpl_container');
		$scope.incFooter = SampleApp.commonMethod.incTmp (SampleApp.commonMethod.tmpDir, 'tpl_footer');
	}]);

angular.module('headerMdl', [])
	.controller ('headerCtrl', ['$scope', function ($scope) {
		$scope.appTtl = SampleApp.Config.appTtl;

		$scope.incHeaderSubnav = SampleApp.commonMethod.incTmp (SampleApp.commonMethod.incDir, 'inc_header_subnav');
	}]);

angular.module('gnavMdl', [])
	.controller ('gnavCtrl', ['$scope', 'gnavList', function ($scope, gnavList) {
		$scope.items = gnavList();
	}])
	.value('gnavList', function () {
		var mainPath = './';
		var lowerPath = mainPath + '#/';
		return [
			{
				pass: mainPath,
				name: 'ページ1',
			},
			{
				pass: lowerPath + 'page2',
				name: 'ページ2',
			},
			{
				pass: lowerPath + 'page3',
				name: 'ページ3',
			},
			{
				pass: lowerPath + 'page4',
				name: 'ページ4',
			},
			{
				pass: lowerPath + 'page5',
				name: 'ページ5',
			},
			{
				pass: lowerPath + 'page6',
				name: 'ページ6',
			},
		]
	});

angular.module('containerMdl', [])
	.controller ('containerCtrl', ['$scope', function ($scope) {
		$scope.pageTtl = SampleApp.Config.pageTtl;
	}]);

angular.module('footerMdl', [])
	.controller ('footerCtrl', ['$scope', function ($scope) {
		$scope.copyright = SampleApp.Config.copyright;
	}]);
