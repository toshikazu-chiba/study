var Main = {};

Main.Config = {
	// アプリ基本設定
	appTtl: 'サンプルアプリ'
	,pageTtl: 'サンプルタイトル'
	,copyright: '©2017 sapmle app'

	// デバイススイッチ
	,deviceMode: function () {
		var documentSizeSp = 768;
		if (document.width >= documentSizeSp) {
			return 'pc';
		} else if (document.width < documentSizeSp) {
			return 'sp';
		}
	}

	// テンプレートファイル読み込み記法
	,incTpl: function (type, fileName) {
		baseDir = 'action/view/templates/base/';

		switch (type) {
			// baseディレクトリのファイル読み込み(PCの場合)
			case 'basePc':
				dir = baseDir;
				break;
			// baseディレクトリのファイル読み込み(SPの場合)
			case 'baseSp':
				dir = baseDir;
				break;
			// インクルードされるテンプレート内で読み込まれるテンプレートのディレクトリパス
			case 'inc':
				dir = baseDir + '/inc/';
				break;
		}

		return dir + fileName + '.html';
	}
}

angular.module('sampleApp', ['headerMdl', 'gnavMdl', 'containerMdl', 'footerMdl'])
	.controller ('mainCtrl', ['$scope', function ($scope) {
		$scope.incHeader = Main.Config.incTpl ('basePc', 'tpl_header');
		$scope.incGnav = Main.Config.incTpl ('basePc', 'tpl_gnav');
		$scope.incContainer = Main.Config.incTpl ('basePc', 'tpl_container');
		$scope.incFooter = Main.Config.incTpl ('basePc', 'tpl_footer');
	}]);

angular.module('headerMdl', [])
	.controller ('headerCtrl', ['$scope', function ($scope) {
		$scope.appTtl = Main.Config.appTtl;

		$scope.incHeaderSubnav = Main.Config.incTpl ('inc', 'inc_header_subnav');

		if (Main.Config.deviceMode() == 'pc') {
			$scope.pcMode = true;
			$scopeGnavSp = Main.Config.incTpl('basePc', 'tpl_gnav');
		} else if (Main.Config.deviceMode() == 'sp') {
			$scope.pcMode = false;
			$scopeGnavSp = Main.Config.incTpl('baseSp', 'tpl_gnav');
		}
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
		$scope.pageTtl = Main.Config.pageTtl;
	}]);

angular.module('footerMdl', [])
	.controller ('footerCtrl', ['$scope', function ($scope) {
		$scope.copyright = Main.Config.copyright;
	}]);
