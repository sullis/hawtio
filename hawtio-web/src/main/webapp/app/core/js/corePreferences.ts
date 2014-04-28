/**
 * @module Core
 */
module Core {

  export function CorePreferences($scope, localStorage) {

    Core.initPreferenceScope($scope, localStorage, {
      'updateRate': {
        'value': 5000,
        'post': (newValue) => {
          $scope.$emit('UpdateRate', newValue);
        }
      },
      'showWelcomePage': {
        'value': true,
        'converter': parseBooleanValue,
      },
      'regexs': {
        'value': [],
        'converter': (value) => { return angular.fromJson(value); },
        'formatter': (value) => { return angular.toJson(value); },
        'compareAsObject': true
      }
    });

    $scope.newHost = {};
    $scope.forms = {};

    $scope.addRegexDialog = new UI.Dialog();

    $scope.onOk = (json, form) => {
      $scope.addRegexDialog.close();
      json['color'] = UI.colors.sample();
      if (!angular.isArray($scope.regexs)) {
        $scope.regexs = [json];
      } else {
        $scope.regexs.push(json);
      }
      $scope.newHost = {};
      Core.$apply($scope);
    };

    // used by add dialog in preference.html
    $scope.hostSchema = {
      properties: {
        'name': {
          description: 'Indicator name',
          type: 'string',
          required: true
        },
        'regex': {
          description: 'Indicator regex',
          type: 'string',
          required: true
        }
      }
    };

    $scope.delete = (index) => {
      $scope.regexs.removeAt(index);
    };

    $scope.moveUp = (index) => {
      var tmp = $scope.hosts[index];
      $scope.regexs[index] = $scope.regexs[index - 1];
      $scope.regexs[index - 1] = tmp
    };

    $scope.moveDown = (index) => {
      var tmp = $scope.regexs[index];
      $scope.regexs[index] = $scope.regexs[index + 1];
      $scope.regexs[index + 1] = tmp
    };

  }

}