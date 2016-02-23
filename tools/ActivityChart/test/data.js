/**
 * Created by liuhan on 2016/1/4.
 */

function getHomeWork(c) {
    var oneStudent = {
            "id":"edwards_1",
            "name":"Tomking Slogan",
            "committed": 5,
            "total": 6,
            "accuracy": 0.9,
            "details":   [{
                "homework": "How old are you to tell",
                "status": 1,
                "accuracy": 0.9
            },
                {
                    "homework": "What's the funcking ",
                    "status": 0,
                    "accuracy": 0.9
                },
                {
                    "homework": "What's the funcking ",
                    "status": 0,
                    "accuracy": 0.9
                },{
                    "homework": "What's the funcking ",
                    "status": 0,
                    "accuracy": 0.9
                },{
                    "homework": "What's the funcking ",
                    "status": 0,
                    "accuracy": 0.9
                },
                {
                    "homework": "What's the funcking ",
                    "status": 0,
                    "accuracy": 0.9
                },
                {
                    "homework": "How old are you to tell",
                    "status": 1,
                    "accuracy": 0.9
                },
                {
                    "homework": "How old are you to tell",
                    "status": 1,
                    "accuracy": 0.9
                },
                {
                    "homework": "How old are you to tell",
                    "status": 1,
                    "accuracy": 0.9
                }
            ]
        };

    for(var i=0; i<c; i++) {
        var cloned = $.extend(true, {}, oneStudent);

        cloned.id = "edwards_" + (i+1);
        cloned.name = "Tomking Slogan" + i;
        homework.students.push(cloned);
    }

    return homework;
}

var homework = {
    "title" : "Lession One: Talk about me",
    "date": 1451963809646,  //time stamp
    "students": [

    ],
    //pie chart info
    "completed": 0.8,
    "notfinished":0.2,
    "correct": 0.88,
    "error": 0.12
};

function getInClass(count) {

    var exercise =  {
        "name": "How old ard mew",        //exe name (unique)
        "status": "4/5",   // 4 of 5 students committed
        "accuracy": 0.9,
        "students": [
            {
                "id": "",
                "name": "Tomas Dick",
                "status": 0,   //0 : uncommitted  1: committed
                "time": 29000, //mill in seconds
                "accuracy": 0  //0 : wrong 1: right
                }
            ]
        }
    inclass.exercises.push(exercise);
    return inclass;
}



var inclass1 = {
    "title": "",
    "exercises": [
        {
            "timestamp": "2016-01-13 09:46:23 501",
            "name": "How old ard mew",        //exe name (unique)
            "accuracy": 0.76,
            "total": 12,
            "submitted": 12,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        },
        {
            "timestamp": "2016-01-13 09:46:23 502",
            "name": "That's reaaly funny",        //exe name (unique)
            "total": 12,
            "submitted": 5,
            "accuracy": 0.3,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        }
    ],
    //pie chart info
    "completed": 0.7,
    "notfinished": 0.3,
    "correct": 0.75,
    "error": 0.25
};


var inclass2 = {
    "title": "",
    "exercises": [
        {
            "timestamp": "2016-01-13 09:46:23 501",
            "name": "How old ard mew",        //exe name (unique)
            "total": 12,
            "submitted": 12,
            "accuracy": 0.76,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        },
        {
            "timestamp": "2016-01-13 09:46:23 502",
            "name": "That's reaaly funny",        //exe name (unique)
            "total": 12,
            "submitted": 12,
            "accuracy": 0.95,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        },

        {
            "timestamp": "2016-01-13 09:46:23 503",
            "name": "How old ard mew",        //exe name (unique)
            "total": 12,
            "submitted": 0,
            "students": [
                {
                    "id": "w1",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w2",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w3",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w4",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w5",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w6",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w7",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w8",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w9",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w10",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w11",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        }
    ],
    //pie chart info
    "completed": 0.9,
    "notfinished": 0.1,
    "correct": 0.9,
    "error": 0.1
};


var inclass3 = {
    "title": "",
    "exercises": [
        {
            "timestamp": "2016-01-13 09:46:23 501",
            "name": "How old ard mew",        //exe name (unique)
            "total": 12,
            "submitted": 12,
            "accuracy": 0.76,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        },
        {
            "timestamp": "2016-01-13 09:46:23 502",
            "name": "That's reaaly funny",        //exe name (unique)
            "total": 9,
            "submitted": 12,
            "accuracy": 0.76,
            "students": [
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 29000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "Tomas Fasi",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "",
                    "name": "VillyWel ki",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        },
        {
            "timestamp": "2016-01-13 09:46:23 503",
            "name": "How old ard mew",        //exe name (unique)
            "total": 12,
            "submitted": 1,
            "accuracy": 1,
            "students": [
                {
                    "id": "w1",
                    "name": "Tomas Dick",
                    "status": 1,   //0 : uncommitted  1: committed
                    "time": 123000, //mill in seconds
                    "accuracy": 1  //0 : wrong 1: right
                },
                {
                    "id": "w2",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w3",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w4",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w5",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w6",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w7",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w8",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w9",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w10",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                },
                {
                    "id": "w11",
                    "name": "Tomas Dick",
                    "status": 0,   //0 : uncommitted  1: committed
                    "time": 0, //mill in seconds
                    "accuracy": 0  //0 : wrong 1: right
                }
            /**list of students*/
            ]
        }
    ],
    //pie chart info
    "completed": 0.88,
    "notfinished": 0.12,
    "correct": 0.95,
    "error": 0.05
};

var inclass00 = {
    "title": "Writing lesson",
    "exercises":[]
};

var inclass01 = {
    "title": "Writing lesson",
    "exercises": [
    {
        "timestamp": "2016-01-13 09:46:23 503",
        "id": "CE32E0394631406797F49D69F0950DE6",
        "name": "Ex.1 Activity",
        "total": 5,
        "submitted": 0,
        "students": [
            {
                "id": "student11",
                "name": "zhangzhangzhangzhangzhangzhangzhangzhang  wenwenwenwenwenwenwenwenwenwenwenwen",
                "status": 0,
                "time": 0,
                "accuracy": 0
            },
            {
                "id": "student12",
                "name": "zhangzhangzhangzhangzhangzhangzhangzhang  wenwenwenwenwenwenwenwenwenwenwenwen",
                "status": 0,
                "time": 0,
                "accuracy": 0
            }
        ]
    }
    ],
    //pie chart info
    "completed": 0.0,
    "notfinished": 1.0
};

var inclass02 = {
    "title": "Writing lesson",
    "exercises": [
        {
            "timestamp": "2016-01-13 09:46:23 503",
            "id": "CE32E0394631406797F49D69F0950DE6",
            "name": "Ex.1 Activity",
            "total": 5,
            "submitted": 4,
            "accuracy": 0.65,
            "students": [
                {
                    "id": "student11",
                    "name": "zhangzhangzhangzhangzhangzhangzhangzhang  wenwenwenwenwenwenwenwenwenwenwenwen",
                    "status": 1,
                    "time": 22000,
                    "accuracy": 1
                },
                {
                    "id": "student12",
                    "name": "zhangzhangzhangzhangzhangzhangzhangzhang  wenwenwenwenwenwenwenwenwenwenwenwen",
                    "status": 0,
                    "time": 0,
                    "accuracy": 0
                }
            ]
        }
    ],
    //pie chart info
    "completed": 0.88,
    "notfinished": 0.12,
    "correct": 0.95,
    "error": 0.05
};


