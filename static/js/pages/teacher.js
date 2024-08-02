
$('.subject-btn').click(function (e) {
    e.preventDefault();

    // 获取表单数据
    var formData = $('#subjectForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/teacher_subject_handler', // 后端处理程序的 URL
        type: 'POST',
        data: formData,
        success: function (response) {
            // 请求成功时的处理
            console.log(response);
            alert(response.msg);
            //刷新页面
            location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
});

function formatRemark(text) {
    return text.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

function revertRemark(text) {
    return text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
}

$('.info-btn').click(function (e) {
    e.preventDefault();

    // 获取表单数据
    var formData = $('#infoForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/teacher_info_handler', // 后端处理程序的 URL
        type: 'POST',
        data: formData,
        success: function (response) {
            // 请求成功时的处理
            console.log(response);
            alert(response.msg);
            //刷新页面
            location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
});

function delTeacher(teacher_id, teacher_name) {
    if (confirm("确定要删除教师：" + teacher_name + "吗？")) {
        $('#infoInput_type').val(1);
        $('#infoInput_id').val(teacher_id);
        $('#edit-btn').click();
    }
}

ready4delSubject = function (teacher_id, teacher_name) {
    $('#subjectInput_type').val(1);
    $('#subjectInput_id').val(teacher_id);
    $.ajax({
        url: '/teacher_subject_handler',
        type: 'POST',
        data: {
            'type': 2,
            'teacher_id': teacher_id
        },
        success: function (response) {
            // 请求成功时的处理
            var subjects = response.subjects;
            $('#deletSubjectSelect').empty();
            $('#deletSubjectSelect').append('<option>请选择...</option>')
            for (var i = 0; i < subjects.length; i++) {
                $('#deletSubjectSelect').append('<option value="' + subjects[i].id + '">' + subjects[i].name + '</option>');
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function showLog(teacher_id, teacher_name) {
    $("#logModalTitle").text(teacher_name + "的操作日志");
    $('#log_teacherID').val(teacher_id);
    pullLog(100);
}
function pullLog(line) {
    var teacher_id = $('#log_teacherID').val();
    $.ajax({
        url: '/get-log',
        type: 'POST',
        data: {
            teacher_id: teacher_id,
            line: line
        },
        success: function (data) {
            var logs = data.content
            console.log(logs);
            $("#teacherlog").text(logs);
        },
        error: function (xhr, status, error) {
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}
function dldLog(teacher_id) {
    window.open('/dld-log?teacher_id=' + teacher_id, '_blank');
}

function showSalaryView() {
    $('#teacher-salary-view-iframe').show();
    var innerHeight = $('#teacher-salary-view-iframe').contents().find('#salaryCard').height();
    $('#teacher-salary-view-iframe').height(innerHeight);
}

function reSizeSalaryView() {
    var innerHeight = $('#teacher-salary-view-iframe').contents().find('#salaryCard').height();
    $('#teacher-salary-view-iframe').height(innerHeight);
}

function showSalaryChart(salary_detail) {
    function formatString(str) {
        // 替换单引号为双引号
        str = str.replace(/'/g, '"');

        // 如果有 HTML 实体（例如 &#39; 表示的单引号），可以使用一个函数替换它们
        str = str.replace(/&#39;/g, '"');

        return JSON.parse(str);
    }
    salarys = formatString(salary_detail);
    var labelList = [];
    var numList = [];
    for (var i = 0; i < salarys.length; i++) {
        labelList.push(salarys[i].teacher);
        numList.push(salarys[i].salary);
    }
    var options = {
        chart: {
            type: 'pie', // 指定图表类型为饼状图
            height: 350
        },
        series: numList, // 这里是你的数据数组
        labels: labelList, // 标签数组
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

function gotoSalary(task_id) {
    // 查找所有带有'collapsed'类的'.accordion-button'元素
    $('.accordion-button.collapsed').click();
    var iframe = $('#teacher-salary-view-iframe');
    iframe.show();
    reSizeSalaryView();
    var iframeContentWindow = iframe[0].contentWindow; // 获取iframe的contentWindow

    // 使用iframe的内容文档和jQuery选择器找到#overlay元素
    var overlay = $(iframeContentWindow.document).find('#overlay');

    // 调用show()方法显示#overlay元素
    overlay.show();
    var iframe = document.getElementById('teacher-salary-view-iframe');
    iframe.src = '/teacher-salary-view?task_id=' + task_id;
}
// 获取当前日期
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 注意：getMonth() 返回的月份是 0 - 11，所以需要 +1
const currentDay = today.getDate();

// 获取URL参数的函数
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function changeMonth(month) {
    // 获取当前的URL
    var url = new URL(window.location.href);

    // 更新 month 参数
    url.searchParams.set('month', month);

    // 重新设置浏览器地址栏中的 URL
    window.location.href = url.href;
}
function changeYear(year) {
    // 获取当前的URL
    var url = new URL(window.location.href);

    // 更新 year 参数
    url.searchParams.set('year', year);

    // 重新设置浏览器地址栏中的 URL
    window.location.href = url.href;
}


function nextMonth() {

    // 创建一个 Date 对象，并设置为下个月的第一天
    let date = new Date(year, month, 1); // 下个月的第一天

    // 获取下个月的年份和月份
    let nextMonthYear = date.getFullYear();
    let nextMonth = date.getMonth() + 1; // 需要加 1 以返回 1-12 范围的月份

    // 如果下个月是 13 月，需要调整为下一年的 1 月
    if (nextMonth === 13) {
        nextMonth = 1;
        nextMonthYear++;
    }

    console.log(`Next Month - Year: ${nextMonthYear}, Month: ${nextMonth}`);

    // 更新 URL 参数
    params.set('year', nextMonthYear);
    params.set('month', nextMonth);

    // 生成新的 URL
    let newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 如果需要，可以使用下面这行代码将浏览器重定向到新 URL
    window.location.href = newUrl;

}


function lastMonth() {

    // 创建一个 Date 对象，并设置为上个月的最后一天
    let date = new Date(year, month - 1, 0); // 0 表示上个月的最后一天

    // 获取上个月的年份和月份
    let lastMonthYear = date.getFullYear();
    let lastMonth = date.getMonth() + 1; // 需要加 1 以返回 1-12 范围的月份

    console.log(`Last Month - Year: ${lastMonthYear}, Month: ${lastMonth}`);

    // 更新 URL 参数
    params.set('year', lastMonthYear);
    params.set('month', lastMonth);

    // 生成新的 URL
    let newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 如果需要，可以使用下面这行代码将浏览器重定向到新 URL
    window.location.href = newUrl;

}


// 获取 URL 中的查询参数
const params = new URLSearchParams(window.location.search);
// 获取URL参数 year、month、day
const year = getURLParameter('year') || currentYear;
const month = getURLParameter('month') || currentMonth;
const day = getURLParameter('day') || currentDay;
$('#monthSelect').val(month); 