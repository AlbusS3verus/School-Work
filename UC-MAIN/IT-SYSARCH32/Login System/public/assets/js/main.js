let app = angular.module("app",[]);

app.run($rootScope => {
    $rootScope.levels = ["1","2","3","4"];
    $rootScope.courses = ["BSIT","BSCS","BSCPE","BSAMT"]
})

app.controller("userList",($scope,$http) => {
    $scope.header=["id","username","password","edit | delete"];
    $http({
        method:"GET",
        url:"/user"
    }).then(response => {
        $scope.users=response.data;
        if(response.data.length === 0) $scope.setDisplay = {"display":"none"}
        else $scope.setDisplay = {"display":"block"}
    });
    $scope.remove = id => {
        $http({
            method:"DELETE",
            url:`/user/${id}`
        }).then(() => location.reload())
    }
})

app.controller("studentList",($scope,$http) => {
    $scope.header=["idno","Image Profile","lastname","firstname","course","level","edit | delete"];
    $http({
        method:"GET",
        url:"/student"
    }).then(response => {
        $scope.students=response.data;
        if(response.data.length === 0) $scope.setDisplay = {"display":"none"}
        else $scope.setDisplay = {"display":"block"}
    });
    $scope.remove = idno => {
        $http({
            method:"DELETE",
            url:`/student/${idno}`
        }).then(() => location.reload())
    }
})

app.controller("updateUser",($scope,$http) => {
    $scope.updateUser = () => {
        $http({
            method:"PUT",
            url:"/user",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: $scope.id,
                username: $scope.username,
                password: $scope.password
            }
        }).then(() => location.reload())
    }
})

app.controller("updateStudent",($scope,$http,$rootScope) => {
    $scope.courses = $rootScope.courses;
    $scope.levels = $rootScope.levels;
    $scope.updateStudent = () => {
        $http({
            method:"PUT",
            url:"/student",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                idno: $scope.idno,
                lastname: $scope.lastname,
                firstname: $scope.firstname,
                course: $scope.selectedCourse,
                level: $scope.selectedLevel
            }
        }).then(() => location.reload())
    }
})