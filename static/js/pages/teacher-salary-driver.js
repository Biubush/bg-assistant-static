const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        { element: '.step0', popover: { title: '指引', description: '审核页面一般很长，指南亮起的地方如果你第一眼看不到的话，就用滚轮上下翻动一下找找吧' } },
        { element: '.step1', popover: { title: '日期', description: '这里是该老师上传的薪资表对应的月份' } },
        { element: '.step2', popover: { title: '待审核栏', description: '当一个老师完成上传工资报表的操作后，会自动定义为待审核状态。其含义为需要你进行审核，做出录入/驳回的操作' } },
        { element: '.step3', popover: { title: '已录入栏', description: '当老师的工作报表被你审核通过时，会被纳入“已录入”栏，已录入的薪资表才计入当月统计薪资。' } },
        { element: '.step4', popover: { title: '未通过栏', description: '当老师的工作报表被你审核驳回时，会被纳入“未通过”栏，未通过的薪资表不会计入当月统计薪资。' } },
        { element: '.step5', popover: { title: '前提信息', description: '这里显示了什么老师上传的哪个月份的报表' } },
        { element: '.step6', popover: { title: '报表主体', description: '这里是报表主体，每个学生对应一种颜色，便于审核。每个学生该月上了多少直播课就会有多少个直播信息卡片。' } },
        { element: '.step7', popover: { title: '添加直播', description: '如果老师对该学生有遗漏的反馈表没提交，可以在这帮老师补交' } },
        { element: '.step8', popover: { title: '编辑直播', description: '点此编辑该录播的具体信息，反馈表里可填的这里都能填' } },
        { element: '.step9', popover: { title: '删除直播', description: '点此删除该节直播课，用于错误反馈表的剔除' } },
        { element: '.step10', popover: { title: '反馈表', description: '这里展示了该直播课的反馈表详情，根据老师提交的文件生成的，老师提交文件格式不对可能会导致显示有bug' } },
        { element: '.step11', popover: { title: '修改收款', description: '点此可以修改收款数目，订正老师的报表' } },
        { element: '.step12', popover: { title: '额外增加薪资', description: '点此可在累计应收款的基础上增加指定金额给老师，一般用于奖励和额外补课' } },
        { element: '.step13', popover: { title: '额外减少薪资', description: '点此可在累计老师累计应收款的基础上减少指定金额，一般用于惩罚【不要添加负号，直接输入金额即可】' } },
        { element: '.step14', popover: { title: '修改备注', description: '点此修改薪资报表的备注，备注事项一般用于说明一些影响老师薪资收入的事件，如老师满勤、老师无故旷课等' } },
        { element: '.step15', popover: { title: '薪资合计', description: '累计的应收款后，根据备注决定是否额外加上/减去指定金额，所得的结果即为老师当月合计薪资' } },
        { element: '.step16', popover: { title: '审核裁定', description: '在这里决定该薪资报表的去留，不确定的设为待定，没有问题的进行录入，有异议的进行驳回。如果老师想自己重新提交报表，可以点击删除，这样老师才能再次上传。' } },
        { element: '.step17', popover: { title: '导出图片', description: '生成一张薪资报表的长图，可以提供给老师进行核对，需要注意的是，生成完后会打开一个网页，右击图片另存为进行下载，嫌麻烦可以直接在网页上拖动图片到文件夹/聊天框。' } },
        { element: '.step18', popover: { title: '导出PDF', description: '如果决定图片不够高清，可以保存为PDF进行下载，但生成的PDF一般QQ和微信打不开，需要用WPS或Adobe Acrobat才能完整查看' } },
    ]
});