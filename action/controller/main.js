var Main = {};

// コンフィグ
Main.Config = {
	// アプリ基本設定
	appTtl: 'サンプルアプリ'
	,pageTtl: 'サンプルタイトル'
	,copyright: '©2017 sapmle app'
	,documentSize: 1024
	,documentSizeSp: 768
	,tplBaseDir: 'action/view/templates/'

	// グロナビのコンテンツ
	,gnavCnt: function () {
		var mainPath = './';
		var lowerPath = mainPath + '#/';
		return [
			{
				path: mainPath,
				name: 'ページ1',
			},
			{
				path: lowerPath + 'page2',
				name: 'ページ2',
			},
			{
				path: lowerPath + 'page3',
				name: 'ページ3',
			},
			{
				path: lowerPath + 'page4',
				name: 'ページ4',
			},
			{
				path: lowerPath + 'page5',
				name: 'ページ5',
			},
			{
				path: lowerPath + 'page6',
				name: 'ページ6',
			},
		]
	}

	// サブナビのコンテンツ
	,subNavCnt: function () {
		var mainPath = './subDir/';
		return [
			{
				path: mainPath,
				name: 'サブナビ1',
			},
			{
				path: mainPath + 'page2',
				name: 'サブナビ2',
			},
			{
				path: mainPath + 'page3',
				name: 'サブナビ3',
			},
			{
				path: mainPath + 'page4',
				name: 'サブナビ4',
			},
			{
				path: mainPath + 'page5',
				name: 'サブナビ5',
			},
			{
				path: mainPath + 'page6',
				name: 'サブナビ6',
			},
		]
	}
}

var CommonUi = {};

CommonUi.method = {
	// デバイス判定
	deviceMode: function () {
		var documentSizeSp = Main.Config.documentSizeSp;

		if (document.body.clientWidth >= documentSizeSp) {
			pcFlg = true;
			spFlg = false;
		} else if (document.body.clientWidth < documentSizeSp) {
			pcFlg = false;
			spFlg = true;
		}

		return {'pc': pcFlg, 'sp': spFlg};
	}

	// テンプレートファイル読み込み記法
		// deviceType: デバイスタイプ
		// fileType: ファイル種別
		// fileName: ファイル名(拡張子不要)
	,incTpl: function (deviceType, fileType, fileName) {
		var baseDir = Main.Config.tplBaseDir;

		if (deviceType == 'pc') {
			var deviceDir = '';
		} else if (deviceType == 'sp') {
			var deviceDir = 'sp/';
		}

		if (fileType == 'contents') {
			dir = deviceDir + baseDir;
		} else {
			dir =baseDir +  deviceDir + fileType + '/';
		}

		return dir + fileName + '.html';
	}

	,slideMenu: function () {
		
	}
}

// メイン
angular.module('sampleApp', ['headerMdl', 'gnavMdl', 'containerMdl', 'footerMdl'])
	.controller ('mainCtrl', ['$scope', function ($scope) {
		// デバイス判定：テンプレート読み込み用
		$scope.pcDisp = CommonUi.method.deviceMode().pc;
		$scope.spDisp = CommonUi.method.deviceMode().sp;

		// コンテンツ読み込み
		$scope.incHeader = CommonUi.method.incTpl ('pc', 'base', 'tpl_header');
		$scope.incGnav = CommonUi.method.incTpl ('pc', 'base', 'tpl_gnav');
		$scope.incContainer = CommonUi.method.incTpl ('pc', 'base', 'tpl_container');
		$scope.incFooter = CommonUi.method.incTpl ('pc', 'base', 'tpl_footer');
	}]);

// ヘッダー
angular.module('headerMdl', ['staticDataMdl'])
	// ヘッダーメイン
	.controller ('headerCtrl', ['$scope', function ($scope) {
		$scope.appTtl = Main.Config.appTtl;
		$scope.incHeaderSubnav = CommonUi.method.incTpl ('pc', 'base/inc', 'inc_header_subnav');
		$scope.incGnavSp = CommonUi.method.incTpl('sp', 'base', 'tpl_gnav');
	}])

	// ヘッダーのサブナビ
	.controller ('headerSubNavCtrl', ['$scope','subNavList', function ($scope, subNavList) {
		$scope.items = subNavList();
	}])

	// SP:ヘッダーのメニュー起動ボタン
	.controller ('headerSpMenuCtrl', ['$scope','subNavList', function ($scope, subNavList) {
		$scope.items = subNavList();
	}]);


// グロナビ
angular.module('gnavMdl', ['staticDataMdl'])
	.controller ('gnavCtrl', ['$scope', 'gnavList', function ($scope, gnavList) {
		$scope.items = gnavList();
	}]);

// コンテンツエリア
angular.module('containerMdl', [])
	.controller ('containerCtrl', ['$scope', function ($scope) {
		$scope.pageTtl = Main.Config.pageTtl;
	}]);

// フッター
angular.module('footerMdl', [])
	.controller ('footerCtrl', ['$scope', function ($scope) {
		$scope.copyright = Main.Config.copyright;
	}]);

// 静的データ
angular.module('staticDataMdl', [])
	.value('gnavList', function () {
		return Main.Config.gnavCnt();
	})
	.value('subNavList', function () {
		return Main.Config.subNavCnt();
	});