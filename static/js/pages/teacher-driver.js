const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        {
            element: '.step1',
            popover: { title: '档案库', description: '用于查看和修改老师信息，从这里可以方便查询老师的科目、手下学生等信息。' },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        { element: '.step2', popover: { title: '添加老师', description: '新入职的老师请点此添加，必填项有姓名和科目' } },
        { element: '#table1', popover: { title: '教师表', description: '累计收入麾下的教师，在此进行老师的查看和修改，功能和操作方式与学生管理板块一致' } },
        { element: '.step4', popover: { title: '备注', description: '点此查看老师的备注，只能查看不能修改' } },
        { element: '.step5', popover: { title: '添加学科', description: '点此为老师添加一门学科，如果想绑定一门新的学科请前往科目管理先创建一个' } },
        { element: '.step6', popover: { title: '删除学科', description: '点此为该老师删除一门已绑定的学科' } },
        { element: '.step7', popover: { title: '编辑信息', description: '点击这里修改老师的详细信息' } },
        { element: '.step8', popover: { title: '删除老师', description: '点此删除老师，老师手下有学生的话禁止删除' } },
        { element: '.step9', popover: { title: '操作日志', description: '点此可以查看这个老师的日志，所有对该老师做的操作都会显示在这里，无论是其手下学员的排课、退课、修改信息、移交，时间精确到某天时分秒' } },
        { element: '.step10', popover: { title: '薪资链接', description: '点击这里打开该老师对应的薪资上报链接，每个老师有且只有一个独一无二的链接。需要统计薪资时，请将网址复制给老师，用于统计每月的薪资。注意，默认打开的是上月的薪资上报链接，如需修改其他月份的薪资请前往【薪资表】页面' } },
        { element: '.step11', popover: { title: '分类排序', description: '点击菜单栏某一栏可以按照这个属性分类，这个功能的实际用法如下：例如点击性别栏，会按性别分类，可以方便找到所有男性/女性的老师，也可以找出所有没有登记性别的老师' } },
        { element: '.dataTable-search', popover: { title: '搜索栏', description: '不要忘了神器搜索框，这些表里任何字你都能在这搜，系统会自动帮你筛选出来。比如你可以通过输入“张三”来搜索手下有张三在上课的所有老师，输入131可以搜所有联系方式中包含131的，等等，只要你登记过，搜索关键字都能出来。' } },
        {
            element: '.step13',
            popover: {
                title: '薪资表',
                description: '点此跳转到薪资表页面'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        { element: '.step14', popover: { title: '薪资表页面', description: '这里是查看某个月老师的薪资明细的页面，该月每个老师薪资多少、带了几个学生，这里都能看到' } },
        { element: '.step15', popover: { title: '月份切换', description: '在这里可以切换想查询的月份、年份' } },
        { element: '.step16', popover: { title: '总览', description: '浅显地展示该月老师的薪资合计' } },
        { element: '.step17', popover: { title: '饼状图', description: '此饼状图展示了老师薪资支出中，各个老师占比多大，可以用鼠标悬浮在某个扇形区，可以查看老师名称、具体薪资' } },
        { element: '.step18', popover: { title: '列表', description: '此列表用于详细查询各个老师的薪资情况以及该月所带学生数。强大的搜索框以及表头排序不再赘述。' } },
        {
            element: '.step19',
            popover: { title: '薪资审查', description: '点此展开审查页面，使用薪资报表审查功能，对老师上传的薪资报表进行审查' },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        { element: '.step21', popover: { title: '指定审查', description: '点击某个老师的薪资编辑，可以指定前往审查该老师的该月薪资报表' } },
    ]
});