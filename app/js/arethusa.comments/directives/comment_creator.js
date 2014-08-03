"use strict";

angular.module('arethusa.comments').directive('commentCreator', [
  'comments',
  'state',
  'idHandler',
  function(comments, state, idHandler) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        var ids;

        scope.state = state;

        scope.hasSelections = state.hasClickSelections;

        scope.commentTypes = ['general', 'reject'];
        scope.commentType = scope.commentTypes[0];

        scope.toggle = function() {
          scope.inputOpen = !scope.inputOpen;
        };

        function currentTokens() {
          if (ids.length) {
            var nonSequentials = idHandler.nonSequentialIds(ids);
            var res = ['on '];
            angular.forEach(ids, function(id, i) {
              res.push(state.getToken(id).string);
              if (nonSequentials[i]) {
                res.push('...');
              }
            });
            return res.join(' ');
          } else {
            return '';
          }
        }

        scope.$watchCollection('state.clickedTokens', function(newVal, oldVal) {
          ids = Object.keys(newVal).sort();
          scope.currentTokenStrings = currentTokens();
        });

        scope.submit = function() {
          comments.createNewComment(ids, scope.comment);
        };
      },
      templateUrl: 'templates/arethusa.comments/comment_creator.html'
    };
  }
]);
