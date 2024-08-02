const driver = window.driver.js.driver;

const introducer = driver({
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    showProgress: true,
    steps: [
        // {
        //     element: '.step',
        //     popover: {
        //         title: '',
        //         description: ''
        //     },
        //     onHighlightStarted: (element) => {
        //         element.click();
        //     }
        // },
        // {
        //     element: '.step',
        //     popover: {
        //         title: '',
        //         description: ''
        //     }
        // },
        {
            element: '.step1',
            popover: {
                title: '后台控制',
                description: '点此进入后台控制分页，用于设置网页程序相关配置，对程序的运行有一点影响'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step2',
            popover: {
                title: '程序日志',
                description: '这里是程序运行的日志，用于查看程序运行的情况，有异常会在这里汇报。不是开发人员的话用处不大。注意，这里只会查看最近一周的日志，超过一周的日志如需查看，向开发人员索要方法。'
            }
        },
        {
            element: '.step3',
            popover: {
                title: '行数选择',
                description: '点此可展开，选择要显示多少行'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step4',
            popover: {
                title: '下载日志',
                description: '点此下载本周的日志，防止日志过多，显示行数不够用，可以下载到本地查看'
            }
        },
        {
            element: '.step5',
            popover: {
                title: '刷新日志',
                description: '点此刷新日志，如果有新的日志产生，会在这里显示'
            }
        },
        {
            element: '.step6',
            popover: {
                title: '阿里云盘',
                description: '这里是云备份的登录状态，为了长久稳定地运行程序，程序会定期备份程序数据到阿里云盘，以防数据丢失，务必保持登录状态。打开阿里云盘扫码二维码即可登录，每次重启程序这里都会重置，届时务必重新登录。'
            }
        },
        {
            element: '.step7',
            popover: {
                title: '退出阿里云盘',
                description: '点此退出阿里云盘的登录，会重置阿里云盘的状态，下次备份时需要重新登录'
            }
        },
        {
            element: '.step8',
            popover: {
                title: '备份库',
                description: '这里查看备份仓库，存放着所有的备份数据，可以查看备份的时间，大小，以及下载备份数据，如果数据丢失，可以从这里恢复数据。每天的凌晨程序会自动备份一次数据。备份数据的总大小有限定，超过限定会自动删除旧的备份数据。'
            }
        },
        {
            element: '.step8-1',
            popover: {
                title: '云备份',
                description: '这里是云备份的状态，如果登录了阿里云盘，小云朵会是绿色，如果没有登录，这里会警示为红色。绿色时可以直接备份数据到阿里云盘，红色时需要先登录阿里云盘。'
            }
        },
        {
            element: '.step9',
            popover: {
                title: '刷新备份库',
                description: '点此刷新备份库，如果有新的备份数据即时产生，你可能需要刷新才能看得到'
            }
        },
        {
            element: '.step10',
            popover: {
                title: '上传数据库',
                description: '点此上传数据库压缩文件，如果你有数据库文件，可以通过这里上传到备份库，注意，上传的文件必须是程序备份的数据库文件，否则无法恢复数据。'
            }
        },
        {
            element: '.step11',
            popover: {
                title: '新建备份',
                description: '点此创建一个新的备份，虽然程序会自动备份数据，但是如果你想立即备份，可以通过这里手动创建一个备份。'
            }
        },
        {
            element: '.step12',
            popover: {
                title: '备份窗口',
                description: '这里就是备份的数据库，可以从操作栏点击恢复指定的备份，也可以下载备份到本地，如果备份数据过多，可以删除一些备份数据。下载和删除的方法为:先勾选要操作的备份，然后点击上方操作栏的下载或删除按钮。'
            }
        },
        {
            element: '.step13',
            popover: {
                title: '缓存管理',
                description: '一个程序运行时的缓存管理，可以查看缓存的大小，以及清除缓存。缓存是程序运行时的临时数据，如果程序运行不正常，可以尝试清除缓存。请即时清理缓存，以免占用过多的磁盘空间，这也会增大备份数据的大小。'
            }
        },
        {
            element: '.step14',
            popover: {
                title: '待办事项',
                description: '这里是一个简易的待办事项，可以添加待办事项，也可以删除待办事项，如果有重要的事情需要做，可以通过这里记录，这些也会被记录在主页的小黑板上。注意，如果做完了某项待办，记得勾选完成，被勾选的事项会在隔天被清除，不必自动删除。'
            }
        },
        {
            element: '.step15',
            popover: {
                title: '员工管理',
                description: '点此进入员工管理分页'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step16',
            popover: {
                title: '员工表',
                description: '这里展示了所有员工的信息，包括员工的姓名，电话，权限等级，注意，等级的数字越高表示权力越大，默认为最低。如果员工反映需要进入的页面进不去，我建议一步步调高其权限，因为权限越高，可以做的危险操作越多，所以请谨慎操作。'
            }
        },
        {
            element: '.step16-1',
            popover: {
                title: '添加员工',
                description: '点此添加员工，填写员工的信息，注意，没有特定要求的话建议权限设置为默认，有需要再调高。'
            }
        },
        {
            element: '.step16-2',
            popover: {
                title: '展开员工',
                description: '点此查看员工详细信息'
            },
            onHighlightStarted: (element) => {
                element.click();
            }
        },
        {
            element: '.step17',
            popover: {
                title: '编辑信息',
                description: '上一步中所说的员工信息都可以在这里更改，权限也可在这里更改，如果员工忘记密码，可以在这里重置密码。'
            }
        },
        {
            element: '.step18',
            popover: {
                title: '员工日志',
                description: '员工如果负责了某个学生，会在这里记录，也可以查看后台对员工信息的更改。'
            }
        },
        {
            element: '.step19',
            popover: {
                title: '删除员工',
                description: '点此删除员工，删除员工后，员工的所有信息都会被删除，谨慎操作。'
            }
        },
        {
            element: '.step20',
            popover: {
                title: '负责的学生',
                description: '还记得登记学生新报课程的“负责人”吗？这里就是负责人的学生列表，可以查看负责人的学生，也可以转接负责人的学生，从某个负责人手中转接学生到另一个负责人手中。点击操作栏的转接按钮，选择要转接到的负责人，即可完成转接。'
            }
        },
    ]
});