const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        { element: '.step1', popover: { title: '当日检查', description: '点击这个按钮会统计当天有哪些老师的录播课、作业没有发布/批改，会自动复制到粘贴板，你只需要粘贴到群里即可。记得未批改的作业加上学生发作业的时间点。' } },
        { element: '.step2', popover: { title: '反馈表检查', description: '点击这个按钮会检查最近有没有老师上了直播课还没交反馈表的，前提是老师上直播课被你记下为“未发布”状态' } },
        { element: '.step3', popover: { title: '日期选择', description: '点击这个按钮可以选择要查看哪个日期的表，方便复盘查找' } },
        { element: '.step4', popover: { title: '前一天', description: '点击这个按钮可以快速切换到前一天' } },
        { element: '.step5', popover: { title: '后一天', description: '点击这个按钮可以快速切换到后一天' } },
        { element: '#table1', popover: { title: '督学表', description: '督学老师每天工作的主战场，只有给学员添加课程时划定了时间范围，且当日在这个范围内，这个学生才会显示出来' } },
        { element: '.step7', popover: { title: '每日跟进表', description: '点此可以前往查看该学生该科目的每日跟进表，即月度表，如果你有需要进行最近好几天的录播、作业的修改，你应该前往此处比较方便' } },
        { element: '.step8', popover: { title: '备注', description: '只有有备注的学生才会显示这个按钮，点击可以查看其备注，作用是提醒你这个学生有特殊情况，例如他星期四不需要发录播课，这时候你应该先考虑备注，再进行督学统计。值得注意的是，有三种备注都会显示，这个学生本人的备注，例如成绩差之类；教课老师的备注，例如这个老师下午上班，你催他也理不了你；学生上这门课的备注，例如学生要求这门课必须在周五休息一天。' } },
        { element: '.step9', popover: { title: '修改状态', description: '点击这个按钮可以从几个状态之间进行切换，对于录播课和直播课，是待定、未发布、已发布，对于作业，是待定、未发布、未完成、未批改、已批改。值得注意的是，如果你按照前面教程点击过表头某一项进行分类排序，那么你之前修改完的操作会不显示，但其实你切换状态的操作成功了，只是显示bug，我的建议是重新刷新页面。' } },
        { element: '.step10', popover: { title: '休息', description: '这个学生如果当天休息，请点击这个切换成“是”，这样其他三个选项都不用填' } },
        { element: '.step11', popover: { title: '智能上周总结', description: '点此让AI帮你总结上个星期内，学生学习了哪些内容，生成完后可以直接复制到QQ群里发送，值得注意的是，积分的算法未完善，如果这个学生上周周测完成了，记得在生成的积分总和基础上给它加上5再发群里' } },
        { element: '.step12', popover: { title: '录播课文件夹', description: '这个解释起来很复杂，你只需明白，默认是打不开的，如果需要这个功能，需要你额外开启“知更助手主机版”打开另一个页面。这样，点击这个按钮才会自动打开一个目录，用于存放这个学生这门课程的录播' } },
        { element: '.dataTable-search', popover: { title: '搜索栏', description: '不要忘了神器搜索栏，你可以搜索任何表格中出现的内容，学生名、老师名、科目名，你搜索“待定”都行，它会筛选出包含你搜索关键词的若干项数据' } },
    ]
});