const driver = window.driver.js.driver;

const index_driver = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [{ element: '.sidebar-menu', popover: { title: '菜单栏', description: '这是知更助手的菜单栏，共划分6个大板块' } },
    { element: '.step2', popover: { title: '概览面板', description: '概览面板是对整体系统的俯瞰，你可以在这对教务系统管理的总情况有初步了解' } },
    { element: '.step3', popover: { title: '督学管理', description: '这里是督学老师的工作重心，日常记录教学老师的录播、作业、直播情况，用于检查老师是否完成各自工作量' } },
    { element: '.step4', popover: { title: '学生管理', description: '这里是学生管理的中心，统筹管理学生数据，对学生的个人信息、学习科目、老师归属进行集中管理。学生本人及其科目的添加、删除和修改都在这完成' } },
    { element: '.step5', popover: { title: '老师管理', description: '这里是老师管理的中心，统筹管理老师数据，对老师的个人信息、教学科目以及薪资进行集中管理' } },
    { element: '.step6', popover: { title: '科目管理', description: '这里是科目管理的中心，集中管理科目的相关信息，公司有什么新的产品需要上架或者旧的产品需要修改，都在这里完成' } },
    { element: '.step7', popover: { title: '管理员面板', description: '这里是管理员控制页面，一般是运维的工作，功能是对整个网页应用的后台进行设置和规划的调配，跟整个系统相关的设置都在这里' } },
    { element: '.index-step1', popover: { title: '学科栏', description: '显而易见，这里可以查看咱有多少个产品，例如，语文规划陪跑算一个产品，语文一对一也算一个产品' } },
    { element: '.index-step2', popover: { title: '学员栏', description: '这里显示的是公司累计招收了多少个学生' } },
    { element: '.index-step3', popover: { title: '教师栏', description: '这里显示的是公司累计招收了多少个老师' } },
    { element: '.index-step4', popover: { title: '课程栏', description: '这里显示的是公司累计开设了多少个课程，一名学生报一门科目算一个课程，如学生A报了一门语文规划陪跑，课程数+1，学生A同时还报了一门语文一对一，那么课程再次+1' } },
    { element: '.index-step5', popover: { title: '日志入口', description: '点击这里可以查看有关于自己的操作日志，引入学生、转接关系都会显示在此' } },
    { element: '.index-step6', popover: { title: '学生分布', description: '这里展示了公司各个学科下学生们的分布情况，鼠标悬停可以查看个数，鼠标点击会突出显示' } },
    { element: '.index-step7', popover: { title: '小黑板日报', description: '这里是显示一些值得汇报的操作，例如新增待办、解决待办、学生报课、学生退课，以及学生课程即将到期的提醒' } },
    ]
});