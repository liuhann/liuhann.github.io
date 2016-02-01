/**
 * Created by Administrator on 2015/7/16.
 */

function getWeeks(num) {
    var weeks = {
        "result_code": "10000",
        "lessonlist": [
            {
                "lessonId": "Week1",
                "lessonName": {
                    "en": "Find the Eyes",
                    "zh": ""
                },
                "studyflag": "0"
            }
        ]
    };

    for(var i=0; i<num; i++) {
        weeks.lessonlist.push( {
            "lessonId": "Week" + i,
            "lessonName": {
                "en": "Find the Eyes",
                "zh": ""
            },
            "studyflag": "0"
        });
    }
    return weeks;
}

var weekData =
{
    "result_code": "10000",
    "knowledge_points": {
        "name": {"en": "Week 3", "zh": "第三周"},
        "subjects": [{
            "contents": [{
                "content": "eyes",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "open", "priority": "1", "remark": "", "resources": []}, {
                "content": "close",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "blink", "priority": "1", "remark": "", "resources": []}, {
                "content": "wink",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "wear", "priority": "1", "remark": "", "resources": []}, {
                "content": "eat",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "use", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Vocabulary", "zh": "词汇"},
            "subject_id": ""
        }, {
            "contents": [{
                "content": "Open your eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "Close your eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "Wink your eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "I eat vegetables.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "I use a reading light.", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Sentence", "zh": "句型"},
            "subject_id": ""
        }, {
            "contents": [{
                "content": "Eyes, eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "One eye, two eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "One eye, two eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "Peek-a-boo. I see you.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "Peek-a-boo. I see you.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "Eyes, eyes.", "priority": "1", "remark": "", "resources": []}, {
                "content": "One eye, two eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "One eye, two eyes.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {
                "content": "Peek-a-boo. I see you.",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "Peek-a-boo. I see you.", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Chant", "zh": "诵读"},
            "subject_id": ""
        }, {
            "contents": [{"content": "Sing After Me", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Song", "zh": "歌曲"},
            "subject_id": ""
        }, {
            "contents": [{"content": "K1练习册上学期P13-18", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Handicraft and Writing", "zh": "手工与写作"},
            "subject_id": ""
        }, {
            "contents": [{
                "content": "作业本 K1-3A",
                "priority": "1",
                "remark": "",
                "resources": []
            }, {"content": "作业本 K1-3B", "priority": "1", "remark": "", "resources": []}],
            "name": {"en": "Homework", "zh": "家庭作业"},
            "subject_id": ""
        }]
    }
}