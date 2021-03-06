'use strict';

/* Controllers */

angular.module('chatApp')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        var user_name;

        var socket = io();
        $scope.clicked = null;
        $scope.selected_id = null;
        $scope.msgs = null;
        $scope.my_id = null;
        $scope.is_msg_show = false;

        //person enters usename 
        $scope.enterChatRoom = function () {
            user_name = $('#user_name').val();
            socket.emit('user name', user_name); // sending user name to the server
        };

        //user enters chat room 
        socket.on('user entrance', function (data, my_id) {
            //checking the user id
            if ($scope.my_id == null) {
                $scope.my_id = my_id;
            }
            $scope.user_show = data;
            $scope.$apply();
        });

        //function to send messages.
        $scope.send_msg = function ($event) {
            var keyCode = $event.which || $event.keyCode;
            if ($scope.selected_id == $scope.my_id) {
                alert("You can't send msg to your self.");
            } else {
                if (keyCode === 13) {
                    var data_server = {
                        id: $scope.selected_id,
                        msg: $scope.msg_text,
                        name: user_name
                    };
                    $scope.msg_text = '';
                    socket.emit('send msg', data_server);
                }
            }
        };

        //to highlight selected row
        $scope.clicked_highlight = function (id) {
            $scope.clicked = id;
            $scope.selected_id = id;
        };

        //on exit updating the List od users
        socket.on('exit', function (data) {
            $scope.user_show = data;
            $scope.$apply();
        });

        //displaying the messages.
        socket.on('get msg', function (data) {
            $scope.msgs = data;
            $scope.is_msg_show = true;
            $scope.$apply();
        });

    }]);