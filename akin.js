var ajs = angular.module("ajs", []);
        ajs.controller("ExCtrl", function($scope, $http) {

            $scope.menu = true;
            $scope.baseRegles = null;
            $scope.i = 0;
            $scope.num = 1;
            $scope.question = null;
            $scope.questionMode = false;
            $scope.erreurMode = false;
            $scope.resultMode = false;
            $scope.title = "kappa Intelligent";
            $scope.questions = null;
            $scope.shuffled = null;
            $scope.persons = null;
            // get pesons data
            $http.get('persons.json')
                .success(function(data) {
                    $scope.persons = data;

                })
                .error(function(data, status, headers, config) {
                    alert("Base de regles persons n'est pas charge correctement")
                });

            // get questions data                 
            $http.get('questions.json')
                .success(function(data) {
                    $scope.questions = data;
                    //$scope.randomize();
                    $scope.question = data[0];
                    console.log($scope.questions)

                })
                .error(function(data, status, headers, config) {
                    alert("Base de regles questions n'est pas charge correctement")
                });

                function PersonListCtrl($scope, $http) {
                  $scope.loadData = function () {
                     $http.get('persons.json').success(function(data) {
                       $scope.persons = data;
                     });
                  };
              };


            

            $scope.randomize = function() {
                var c = $scope.questions.length,
                    t, r;
                    h=$scope.questions[0];
                while (0 !== c) {
                    r = Math.floor(Math.random() * c);
                    c -= 1;
                    t = $scope.questions[c];
                    $scope.questions[c] = $scope.questions[r];
                    $scope.questions[r] = t;
                }
                
                if ($scope.questions[0]!== h){
                    h1=$scope.questions[0];
                    $scope.questions[0]=h;
                    for (var i = 1; i < $scope.questions.length; i++) {
                        if ($scope.questions[i]==h) {
                            $scope.questions[i]=h1;
                        }
                    }
                }
                return $scope.questions;
            }

            $scope.mainYes = function(a) {
                newPersons = [];
                $scope.num++;
                //else if ($scope.persons.length == 0) {}
                //} else {
                    
                    for (j = 0; j < $scope.persons.length; j++) {
                        a1=a;
                            if (($scope.persons[j][$scope.question.key] == undefined)&&(a==1)) {
                        continue;
                            }
                            if (($scope.persons[j][$scope.question.key] == undefined)&&(a==0)){
                                a1 = undefined;
                            }
                        if ($scope.persons[j][$scope.question.key] == a1) {
                            newPersons.push($scope.persons[j]);
                        }
                    }

                    $scope.i++;
                    
                    $scope.question = $scope.questions[$scope.i];
                    $scope.persons = newPersons;
                    
                    //if ($scope.persons.length!=2) {
                    do
                    oki= $scope.verif();
                    while((oki)&&($scope.i<=$scope.questions.length-1));
                    //}
                    
                    //$scope.i++;
                   
                    if ($scope.persons.length == 1 && $scope.i>=1) {
                    $scope.personReached();}
                    if ($scope.persons.length == 0 && $scope.i>=1) {
                    $scope.personNotReached();}
                    console.log($scope.persons);
                    
                
            }

            $scope.verif = function(){
                all1 = true;
                all0= true;
                ok= false;
                    for (k = 0; k < $scope.persons.length; k++) {
                        //console.log($scope.persons[k][$scope.question.key]);
                        if (($scope.persons[k][$scope.question.key] == 0)||($scope.persons[k][$scope.question.key] == undefined)) {
                            all1 = false;
                        }
                    }
                    //if ($scope.persons.length <>2) {
                        for (l = 0; l < $scope.persons.length; l++) {
                            if ($scope.persons[l][$scope.question.key] == 1) {
                                all0 = false;
                            }
                         }
                   // }
                    console.log("all1",all1,"all0",all0);
                    //if ($scope.persons.length =2) 
                      //  all=false;
                    if (all1) {
                        $scope.i++;
                        $scope.question = $scope.questions[$scope.i];
                        ok=true;
                        console.log($scope.i," all1");
                    }

                    if (all0) {
                        $scope.i++;
                        $scope.question = $scope.questions[$scope.i];
                        ok=true;
                        console.log($scope.i," all0");
                    }
                    return ok ;
                    }

            $scope.maybe = function() {
                $scope.i++;
                $scope.num++;
                $scope.question = $scope.questions[$scope.i];
                do
                    oki= $scope.verif();
                while((oki)&&($scope.i<$scope.questions.length-2));
            }

            $scope.yes = function($http) {
                $scope.mainYes(1)
            };

            
            $scope.no = function($http) {

                $scope.mainYes(0)
            };


            $scope.personReached = function() {
                $scope.title = "Felicitations";
                $scope.questionMode = false;
                $scope.erreurMode =false;
                $scope.resultMode = true ;

            };
            $scope.personNotReached = function() {
                $scope.title = "Nope";
                $scope.questionMode = false;
                $scope.resultMode = false ;
                $scope.erreurMode = true;

            };

            $scope.play = function() {
                $scope.menu = false;
                $scope.questionMode = true;
                $scope.resultMode = false ;
                $scope.erreurMode = false;

            };

            $scope.replay = function() {
                
                $scope.title = "AKINATOR Intelligent";
                $http.get('persons.json')
                .success(function(data) {
                    $scope.persons = data;

                })
                $http.get('questions.json')
                .success(function(data) {
                    $scope.questions = data;
                    //$scope.randomize();
                    $scope.question = data[0];
                    console.log($scope.questions)
                })
                $scope.i=0;
                $scope.num=1;
                $scope.questionMode = true;
                $scope.erreurMode = false ;
                $scope.resultMode = false;

            };

        });