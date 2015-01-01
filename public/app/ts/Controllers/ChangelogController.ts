module Controllers {
	export class ChangelogController {

		constructor($http: ng.IHttpService, $scope, $sce: ng.ISCEService) {
			$http.get('CHANGELOG.md').then(function (response) {
				var contents = markdown.toHTML(response.data);

				$scope.changelog = $sce.trustAsHtml(contents);
			});
		}

	}
}
