function getDayOfWeek(dateString) {
    // 将输入的日期字符串转换为 Date 对象
    const date = new Date(dateString);
    
    // 获取星期几（0 表示周日，1 表示周一，依此类推）
    const dayOfWeek = date.getDay();
    
    // 定义一个数组来将数字转换为对应的星期几字符串
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    // 返回对应的星期几字符串
    return days[dayOfWeek];
}

// 获取当前日期
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // 注意：getMonth() 返回的月份是 0 - 11，所以需要 +1
const currentDay = today.getDate();

// 获取URL参数的函数
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 获取URL参数 year、month、day
const year = getURLParameter('year') || currentYear;
const month = getURLParameter('month') || currentMonth;
const day = getURLParameter('day') || currentDay;

const date = `${year}-${month}-${day}`;

const dayOfWeek = getDayOfWeek(date);

$('#target_date').text(`${year}年${month}月${day}日-${dayOfWeek}`);

function revertRemark(text) {
    // 将 \n 和 \t 转义为换行符和制表符，用于显示
    try {
        return text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    } catch (e) {
        return null;
    }
}

function changeRestStatus(status,studentId,subjectId,teacherId) {
    $.ajax({
        url: '/record-lesson-handler',
        type: 'POST',
        data: {
            type:2,
            status: status,
            student_id: studentId,
            subject_id: subjectId,
            teacher_id: teacherId,
            date: date
        },
        success: function (data) {
            location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function changeRecordSatus(studentId,subjectId,teacherId,element) {
    var content = null;
    var statusName=element.innerText;
    var status = null;
    if (statusName == "未发布") {
        status = 1;
    }else if (statusName == "已发布") {
        status = 2;
    }else if (statusName == "待定") {
        status = 0;
    }
    if (status == 1) {
        content = prompt("请输入录播课内容（注意：为空或取消将设为待定）");
        if (content == null || content == "") {
            status = 2;
        }
    }
    $.ajax({
        url: '/record-lesson-handler',
        type: 'POST',
        data: {
            type:2,
            status: status,
            student_id: studentId,
            subject_id: subjectId,
            teacher_id: teacherId,
            content:content,
            date: date
        },
        success: function (data) {
            if (status == 1) {
                element.className = "badge bg-success";
                element.innerText = "已发布";
            }else if (status == 0) {
                element.className = "badge bg-danger";
                element.innerText = "未发布";
            }else if (status == 2) {
                element.className = "badge bg-secondary";
                element.innerText = "待定";
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function changeHomeworkStatus(studentId,subjectId,teacherId,element) {
    var statusName=element.innerText;
    var status = null;
    if (statusName == "未布置") {
        status = 3;
    }else if (statusName == "未完成") {
        status = 2;
    }else if (statusName == "未批改") {
        status = 1;
    }else if (statusName == "已批改") {
        status = 4;
    }else if (statusName == "待定") {
        status = 0;
    }
    $.ajax({
        url: '/homework-handler',
        type: 'POST',
        data: {
            type:2,
            status: status,
            student_id: studentId,
            subject_id: subjectId,
            teacher_id: teacherId,
            date: date
        },
        success: function (data) {
            if (status == 0) {
                element.className = "badge bg-danger";
                element.innerText = "未布置";
            }else if (status == 1) {
                element.className = "badge bg-success";
                element.innerText = "已批改";
            }else if (status == 2) {
                element.className = "badge bg-warning";
                element.innerText = "未批改";
            }else if (status == 3) {
                element.className = "badge bg-primary";
                element.innerText = "未完成";
            }else if (status == 4) {
                element.className = "badge bg-secondary";
                element.innerText = "待定";
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function changeLiveStatus(studentId,subjectId,teacherId,element){
    var statusName=element.innerText;
    var content = null;
    var status = null;
    var time_range = null;
    if (statusName == "未发布") {
        status = 1;
    }else if (statusName == "已发布") {
        status = 2;
    }else if (statusName == "待定") {
        status = 0;
    }
    if (status == 1) {
        content = prompt("1.请输入直播课内容（注意：为空或取消将设为待定）");
        if (content == null || content == "") {
            status = 2;
        } else {
            time_range = prompt("2.请输入直播课时间范围（可为空）");
        }
    }
    $.ajax({
        url: '/live-lesson-handler',
        type: 'POST',
        data: {
            type:2,
            status: status,
            student_id: studentId,
            subject_id: subjectId,
            teacher_id: teacherId,
            content:content,
            date: date,
            time_range:time_range
        },
        success: function (data) {
            if (status == 1) {
                element.className = "badge bg-success";
                element.innerText = "已发布";
            }else if (status == 0) {
                element.className = "badge bg-danger";
                element.innerText = "未发布";
            }else if (status == 2) {
                element.className = "badge bg-secondary";
                element.innerText = "待定";
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function nextDay(){
    // 获取当前 URL 的查询参数
    var params = new URLSearchParams(window.location.search);

    // 获取当前日期
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // getMonth() 返回值范围是 0-11，所以需要加 1
    var currentDay = currentDate.getDate();

    // 获取 URL 中的 year、month、day 参数，如果不存在则使用当前日期的值
    var year = params.get('year') || currentYear;
    var month = params.get('month') || currentMonth;
    var day = params.get('day') || currentDay;

    // 创建一个 Date 对象
    let date = new Date(year, month - 1, day); // JavaScript 的 Date 构造函数中的 month 范围是 0-11

    // 增加一天
    date.setDate(date.getDate() + 1);

    // 获取更新后的年、月、日
    var newYear = date.getFullYear();
    var newMonth = date.getMonth() + 1; // 需要加 1 以返回 1-12 范围的月份
    var newDay = date.getDate();

    console.log(`New Date - Year: ${newYear}, Month: ${newMonth}, Day: ${newDay}`);

    // 更新 URL 参数
    params.set('year', newYear);
    params.set('month', newMonth);
    params.set('day', newDay);

    // 生成新的 URL
    var newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 将浏览器重定向到新 URL
    window.location.href = newUrl;
}

function lastDay(){
    // 获取当前 URL 的查询参数
    var params = new URLSearchParams(window.location.search);

    // 获取当前日期
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth(); // getMonth() 返回值范围是 0-11，所以不用加 1
    var currentDay = currentDate.getDate();

    // 获取 URL 中的 year、month、day 参数，如果不存在则使用当前日期的值
    var year = parseInt(params.get('year')) || currentYear;
    var month = parseInt(params.get('month')) || currentMonth + 1; // URL 中的 month 参数是 1-12
    var day = parseInt(params.get('day')) || currentDay;

    // 创建一个 Date 对象
    let date = new Date(year, month - 1, day); // JavaScript 的 Date 构造函数中的 month 范围是 0-11

    // 减少一天
    date.setDate(date.getDate() - 1);

    // 获取更新后的年、月、日
    var newYear = date.getFullYear();
    var newMonth = date.getMonth() + 1; // 需要加 1 以返回 1-12 范围的月份
    var newDay = date.getDate();

    console.log(`New Date - Year: ${newYear}, Month: ${newMonth}, Day: ${newDay}`);

    // 更新 URL 参数
    params.set('year', newYear);
    params.set('month', newMonth);
    params.set('day', newDay);

    // 生成新的 URL
    var newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 将浏览器重定向到新 URL
    window.location.href = newUrl;

}

function getDailyPapper(){
    $.ajax({
        url: '/daily_paper',
        type: 'POST',
        data: {
            year:year,
            month:month,
            day:day
        },
        success: function (data) {
            alert(data.msg);
            copyToClipboard(data.msg);
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function checkFeedback(){
    $.ajax({
        url: '/feedback-check',
        type: 'POST',
        success: function (data) {
            alert(data.msg);
            copyToClipboard(data.msg);
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}


function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

function summary(student_id,subject_id,student_name){
    document.getElementById('overlay').style.display = 'block';
    $.ajax({
        url: '/weekly-summary',
        type: 'POST',
        data: {
            student_id:student_id,
            subject_id:subject_id,
            date:date
        },
        success: function (data) {
            $('#summaryModalTitle').text(student_name+'的上周总结');
            $('#summary_content').val(revertRemark(data.study_content));
            $('#summaryModal').modal('show');
            document.getElementById('overlay').style.display = 'none';
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            document.getElementById('overlay').style.display = 'none';
        }
    });
}

function openFolder(student_id,subject_id){
    $.ajax({
        url: '/open-folder',
        type: 'POST',
        data: {
            student_id:student_id,
            subject_id:subject_id
        },
        success: function (data) {
            console.log('打开文件夹成功');
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function changeDate(dateStr){
    console.log(dateStr);
    // 先用空格分割日期和时间
    var [date, time] = dateStr.split(' ');

    // 再用连字符分割年、月、日
    var [year, month, day] = date.split('-');

    console.log(`Year: ${year}`);
    console.log(`Month: ${month}`);
    console.log(`Day: ${day}`);
    // 获取当前 URL 的查询参数
    var params = new URLSearchParams(window.location.search);
    // 更新 URL 参数
    params.set('year', year);
    params.set('month', month);
    params.set('day', day);

    // 生成新的 URL
    var newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 将浏览器重定向到新 URL
    window.location.href = newUrl;
}