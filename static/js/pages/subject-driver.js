const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        {
            element: '.step1',
            popover: {
                title: '归档管理',
                description: '点此进入归档管理，含义为对不同学科进行分类归档，在逻辑上便于查询和修改'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step2',
            popover: {
                title: '归档栏目',
                description: '这里是分科目的课程归档，有父课程和子课程，父课程可以理解为科目，如语文，子课程为公司开设的产品，如语文陪跑，而语文陪跑从属于语文科目，所以有父子级的上下关系。'
            }
        },
        {
            element: '.step3',
            popover: {
                title: '父课程',
                description: '每个父课程独占一栏，点开可查看其详情和子课程'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step3-1',
            popover: {
                title: '老师',
                description: '这里会显示所有可以教这门课的老师，老师绑定的是父科目，比如王老师可以教语文，那么王老师可以教语文下的所有子课程，但是王老师不能教数学，因为数学不是王老师的父课程'
            }
        },
        {
            element: '.step3-2',
            popover: {
                title: '子课程',
                description: '这里会显示所有从属于这门父课程的子课程，比如语文下有语文陪跑、语文提分、语文提高班等等，这些都是语文的子课程，子课程的老师是绑定在父课程上的，所以只要绑定了父课程，就可以教这个父课程下的所有子课程'
            }
        },
        {
            element: '.step3-3',
            popover: {
                title: '编辑子课程',
                description: '点此编辑子课程的信息，如名称和颜色'
            }
        },
        {
            element: '.step3-4',
            popover: {
                title: '删除子课程',
                description: '点此删除该子课程'
            }
        },
        {
            element: '.step4',
            popover: {
                title: '编辑父课程',
                description: '点此编辑父课程的信息，如名称和颜色'
            }
        },
        {
            element: '.step5',
            popover: {
                title: '删除父课程',
                description: '点此删除该父课程，但如果有老师隶属于这门父课程，就无法删除'
            }
        },
        {
            element: '.step6',
            popover: {
                title: '添加子课程',
                description: '点此为该父课程添加一个子课程，一般公司有新产品就要用这个添加，但首先你需要找准子课程从属于哪个父课程'
            }
        },
        {
            element: '.step7',
            popover: {
                title: '添加父课程',
                description: '点此添加父课程，一般父课程的名字就用学科命名即可，语文、数学、英语，这些都是父课程'
            }
        },
        {
            element: '.step8',
            popover: {
                title: '集中管理',
                description: '点此进入集中管理，经典的表格查询，臃肿但万能，本来想去除的，但是这里有神器搜索栏，合理使用时比归档找还快。'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
    ]
});