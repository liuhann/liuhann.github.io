/**
 * Created by liuhan on 2016/1/4.
 */

var users = [
    {
        head: "test/img/dface.jpg",
        name: "MARK,Allen",
        id: "a1",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "Silien,Dku",
        id: "a2",
        off: 1,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "Musk,Duck",
        id: "a3",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "MARK,Allen",
        id: "a4",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "a5",
        id: "a5",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "Musk,Duck",
        id: "a6",
        off: 0,
        offdate: 140000000
    }
];

var usersh = [
    {
        head: "test/img/dface.jpg",
        name: "MARK,Allen",
        id: "a1",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p1.jpg",
        name: "Silien,Dku",
        id: "a2",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p2.jpg",
        name: "Musk,Duck",
        id: "a3",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p3.jpg",
        name: "MARK,Allen",
        id: "a4",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p4.jpg",
        name: "a5",
        id: "a5",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p5.jpg",
        name: "Musk,Duck",
        id: "a6",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p6.jpg",
        name: "MARK,Allen",
        id: "a7",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p7.jpg",
        name: "Silien,Dku",
        id: "a7",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p8.jpg",
        name: "Musk,Duck",
        id: "a9",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p9.jpg",
        name: "Musk,Duck",
        id: "a10",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/p10.jpg",
        name: "MARK,Allen",
        id: "a11",
        off: 0,
        offdate: 140000000
    },
    {
        head: "test/img/dface.jpg",
        name: "Silien,Dku",
        id: "a12",
        off: 0,
        offdate: 140000000
    }
];

var group2 = [
    {
        "GroupName": "group1",
        "StudentsListItemColl": [
            // type of user
            {
                "StudentName": "a1"
            },
            {
                "StudentName": "a2"
            },
            {
                "StudentName": "a3"
            },
            {
                "StudentName": "a4"
            },
            {
                "StudentName": "a5"
            }
        ]
    },
    {
        "GroupName": "group2",
        "StudentsListItemColl": [
            // type of user
            {
                "StudentName": "a6"
            },
            {
                "StudentName": "a7"
            },
            {
                "StudentName": "a8"
            },
            {
                "StudentName": "a9"
            },
            {
                "StudentName": "a10"
            }
        ]
    }
];

function genGroup(t) {


    var r = [];
    for(var i=0;i<t;i++) {
        var oneg =  {
            "GroupName": "group1",
            "StudentsListItemColl": [
                // type of user
                {
                    "StudentName": "a1"
                },
                {
                    "StudentName": "a2"
                },
                {
                    "StudentName": "a3"
                },
                {
                    "StudentName": "a4"
                },
                {
                    "StudentName": "a5"
                }
            ]
        };

        var cloned = $.extend({}, oneg);
        for(var k=0; k<3; k++) {
            if (Math.random()<0.5) {
                cloned.StudentsListItemColl.pop();
            }
        }
        r.push(cloned);
    }
    return r;
}

var group3 = [
    {
        "GroupName": "group1",
        "StudentsListItemColl": [
            // type of user
            {
                "StudentName": "a1"
            },
            {
                "StudentName": "a2"
            },
            {
                "StudentName": "a3"
            },
            {
                "StudentName": "a4"
            },
            {
                "StudentName": "a5"
            }
        ]
    },
    {
        "GroupName": "group2",
        "StudentsListItemColl": [
            // type of user
            {
                "StudentName": "a6"
            },
            {
                "StudentName": "a7"
            },
            {
                "StudentName": "a8"
            },
            {
                "StudentName": "a9"
            },
            {
                "StudentName": "a10"
            }
        ]
    }
];
