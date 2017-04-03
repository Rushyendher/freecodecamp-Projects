var app = angular.module("myApp",[]);

app.controller("RecipeCtrl",($scope) => {
    $scope.recipeBox = [];

    $scope.addRecipe = function(recipeName,ingredients){
        let box = {};
        box.recipeName = recipeName;
        box.ingredients = ingredients;
        $scope.recipeBox.push(box);
        $scope.recipeName = '';
        $scope.ingredient = '';
    };

    $scope.removeRecipe = function(recipe){
        for(var i=0; i<$scope.recipeBox.length; i++){
            if($scope.recipeBox[i].recipeName == recipe.recipeName){
                $scope.recipeBox.splice(i, 1);  //removes 1 element at position i 
                break;
            }
        }
    };

    $scope.editRecipe = function(recipe){
        $scope.recipeName = recipe.recipeName;
        $scope.ingredient = recipe.ingredients;
        $scope.removeRecipe(recipe);
    }

});