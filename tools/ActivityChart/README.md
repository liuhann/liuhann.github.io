## 2016-01-28
1. 根据练习时间戳格式的变化而产生的bug
2. 修改网页默认字体

## 2016-01-18
1. BugFix: inclass, 日期显示为和homework相同

## 2016-01-18
1. BugFix: 准确率为0，显示为-
2. BugFix: 准确率为0，内部图显示为NoData

## 2016-01-16
1. bugfix ： 显示inclass和homework的时间


## 2016-01-16
1. 为课堂标题增加了一个书的图标
2. 进入练习后， 标题左侧增加了一个返回联系列表按钮
3. 调整表格内部字体大小。
4. 表格每页12条记录


## 2016-01-14

当堂统计api为

初始化homework 和 inclass数据。 页面内只调用1次
>Accuracy.init(homework, inclass)
​
当无homework时， 传入null . inclass数据不能为空​

更新当堂统计数据。 可多次更新

>Accuracy.update(inclass)

其中 homework数据结构如下
    '
        {
        "title" : "Lession One: Talk about me",
        "date": 1451963809646,  //time stamp
        "students": [
    ​        ​{
    ​        ​"id":"edwards_1",
    ​        ​"name":"Tomking Slogan",
            "commit​t​ed": 5,
            "total": 6,
            "accuracy": 0.9,
            "details":   [{
                "homework": "How old are you to tell",
                "status": 1,
                "accuracy": 0.9
            }​]​
    ​       }​
        ],

        "completed": 0.8,
        "notfinished":0.2,
        "correct": 0.88,
        "error": 0.12
       };'



​inclass数据结构如下
{
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
                    "name": "wenwenwenwenwenwenwenwenwenwenwenwen",
                    "status": 1,
                    "time": 22000,
                    "accuracy": 1
                },
                {
                    "id": "student12",
                    "name": "wenwenwenwenwenwenwenwenwenwenwenwen",
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
​