const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        { element: '.step1', popover: { title: '添加学生', description: '点此会弹出表单用于添加新学员，将相关信息都写进去，必填项有姓名和年级' } },
        { element: '#table1', popover: { title: '学生表', description: '展示累计招收的学员，只要报过名都会显示在这里' } },
        { element: '.step3', popover: { title: '学生备注', description: '点此会展示添加学生时给学生的备注，只能查看不能修改' } },
        { element: '.badge', popover: { title: '科目标签', description: '点击这个学生对应的科目，可以打开这门课程的详情，同时也可以修改该课程的信息。平时学员续费、学员换老师、学员换负责人都要在此操作。同时它也提供了查看该课程阅读表和打开该课程文件夹的入口。' } },
        { element: '.step5', popover: { title: '增加课程', description: '点此可以为此学生添加一门课程，比如为其添加语文一对一，值得提醒的是，像规划陪跑一样有时间范围限制的，把时间范围选好，否则不会在督学管理板块显示' } },
        { element: '.step6', popover: { title: '减少课程', description: '点此可以删除某一门课程，只能删除已存在的' } },
        { element: '.step7', popover: { title: '编辑学生', description: '点此可以更改学员的个人信息，录入时能写哪些，这里就能修改哪些' } },
        { element: '.step8', popover: { title: '删除学生', description: '点此可以删除学生，但当学员还有课程存在时，无法被删除，需要先删除课程再进行操作' } },
        { element: '.step9', popover: { title: '查看日志', description: '点此可以查看这个学员的日志，所有对该学员做的操作都会显示在这里，无论是排课、退课、修改信息、修改老师，时间精确到某天时分秒' } },
        { element: '.step10', popover: { title: '分类排序', description: '点击菜单栏某一栏可以按照这个属性分类，这个功能的实际用法如下：例如点击年级栏，会按年级分类，可以方便找到所有同年级的学生' } },
        { element: '.dataTable-search', popover: { title: '搜索框', description: '不要忘了神器搜索框，这些表里任何字你都能在这搜，系统会自动帮你筛选出来。比如你可以通过输入机器号搜索某台机器上的的所有学员，输入131可以搜所有联系方式中包含131的，等等，只要你登记过，搜索关键字都能出来。' } },
        { element: '.step11', popover: { title: '跟进表档案库', description: '这里是跟进表档案库，每个月的15号会生成全体学生上个月的月度表。在这里可以查看指定学生的月度表并下载。下载方法：选中你要操作的文件/文件夹，点击上方菜单栏右上角的下载按钮。删除操作类似。如果嫌这样太慢，可以在上面的学生档案库打开某个课程，查看该学生该课程的跟进表。' } },
    ]
});