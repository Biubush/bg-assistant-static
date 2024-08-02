
function formatRemark(text) {
    // 将换行符和制表符转义为 \n 和 \t，用于存储
    try {
        return text.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
    } catch (e) {
        return null;
    }
}

function revertRemark(text) {
    // 将 \n 和 \t 转义为换行符和制表符，用于显示
    try {
        return text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    } catch (e) {
        return null;
    }
}

function formatDate(dateString) {
    // 创建正则表达式匹配日期的各个部分
    var dateRegex = /^(\w+), (\d{2}) (\w+) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT$/;

    // 匹配字符串并提取各个部分
    var match = dateString.match(dateRegex);
    if (!match) {
        // 如果字符串不符合预期格式，返回空字符串或其他错误处理
        return '';
    }

    // 从匹配中提取日期的各个部分
    var day = match[2];
    var monthName = match[3];
    var year = match[4];

    // 将月份名称转换为数字
    var monthIndex = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    }[monthName];

    // 将日期部分组合成所需格式
    var formattedDate = year + '-' + monthIndex + '-' + day;

    return formattedDate;
}

function formatDateRange(inputString) {
    // 匹配月份、日期和年份的正则表达式
    const regex = /(\d{1,2})月 (\d{1,2}), (\d{4})/g;

    // 提取开始日期和结束日期的月、日、年
    const matches = [...inputString.matchAll(regex)];
    const startDate = matches[0];
    const endDate = matches[1];

    // 构建开始日期的字符串
    const startFormatted = `${startDate[3]}-${startDate[1].padStart(2, '0')}-${startDate[2].padStart(2, '0')}`;

    // 构建结束日期的字符串
    const endFormatted = `${endDate[3]}-${endDate[1].padStart(2, '0')}-${endDate[2].padStart(2, '0')}`;

    return [startFormatted, endFormatted];
}

$('.subject-btn').click(function (e) {
    e.preventDefault();

    // 获取表单数据
    var formData = $('#subjectForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/student-subject-handler', // 后端处理程序的 URL
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

$('.info-btn').click(function (e) {
    e.preventDefault();

    // 获取表单数据
    var formData = $('#infoForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/student-info-handler', // 后端处理程序的 URL
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


function ready4addSubject(student_id, student_name) {
    $('#addSubjectModalTitle').text('为' + student_name + '添加科目');
    $('#subject_type').val(0);
    $('#subject_studentID').val(student_id);
}

function ready4delSubject(student_id, student_name) {
    $('#deletSubjectModalTitle').text('为' + student_name + '删除科目');
    $('#subject_type').val(1);
    $('#subject_studentID').val(student_id);
    $.ajax({
        url: '/student-subject-handler',
        type: 'POST',
        data: {
            type: 4,
            student_id: student_id,
        },
        success: function (data) {
            var subjects = data.subjects;
            $('#deletSubjectSelect').empty();
            $('#deletSubjectSelect').append('<option value="0">请选择科目</option>');
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

function ready4editSubject(student_id, subject_id, student_name, subject_name) {
    //向后端查询科目
    $.ajax({
        url: '/student-subject-handler',
        type: 'POST',
        data: {
            type: 3,
            student_id: student_id,
            subject_id: subject_id
        },
        success: function (data) {
            var course = data.course;
            var teachers = data.teachers;
            $('#editSubjectModalTitle').text(student_name + '-' + subject_name);
            var appendHtml=`
            <i class="bi bi-calendar-heart"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="查看每日跟进表" 
            style="cursor: pointer; font-size: 1.3rem;color: rgb(97, 97, 158);" onclick="buildMonthlyHref();"></i>
            <i class="bi bi-folder"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="打开录播课文件夹" 
            style="cursor: pointer; color: rgb(97, 97, 158); font-size: 1.4rem;" onclick="openFolder(${student_id},${subject_id})"></i>
            `
            $('#editSubjectModalTitle').append(appendHtml);
            //填充表单
            $('#subject_type').val(2);
            $('#subject_subjectID').val(subject_id);
            $('#subject_studentID').val(student_id);
            $('#subject_teacherID').val(course.teacher_id);
            if (course.start_date!==null){
                $('#subject_startDate').val(formatDate(course.start_date));}
            if (course.end_date!==null){
                $('#subject_endDate').val(formatDate(course.end_date));}
            $('#subject_remark').val(course.remark);

            //选择框清空并填充#edit_teacherSelect
            $('#edit_teacherSelect').empty();
            //遍历teachers，读取teacher_id和teacher_name，填充#edit_teacherSelect
            for (var i = 0; i < teachers.length; i++) {
                $('#edit_teacherSelect').append('<option value="' + teachers[i].id + '">' + teachers[i].name + '</option>');
            }
            //选中course.teacher_id
            $('#edit_teacherSelect').val(course.teacher_id);
            if (course.start_date!==null){
            $('#edit_dateRange').val(formatDate(course.start_date) + ' 到 ' + formatDate(course.end_date));}
            $('#edit_remark').val(revertRemark(course.remark));
            console.log(course);
            $('#edit_employeeSelect').val(course.employee_id);
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });

}

function showTeachers(subject_id) {
    $.ajax({
        url: '/get_teachers_by_subject',
        type: 'POST',
        data: {
            subject_id: subject_id
        },
        success: function (data) {
            var teachers = data.teachers;
            //填充表单
            $('#add_teacherSelect').empty();
            $('#add_teacherSelect').append('<option value="0">请选择老师</option>');
            //遍历teachers，读取teacher_id和teacher_name，填充#teacherSelect
            for (var i = 0; i < teachers.length; i++) {
                $('#add_teacherSelect').append('<option value="' + teachers[i].id + '">' + teachers[i].name + '</option>');
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function buildMonthlyHref(){
    var subject_id = $('#subject_subjectID').val();
    var student_id = $('#subject_studentID').val();
    window.location.href = `monthly-table-container?student_id=${student_id}&subject_id=${subject_id}`;
}

function delStudent(student_id, student_name) {
    if(confirm('确定删除' + student_name + '吗？')){
        $.ajax({
            url: '/student-info-handler',
            type: 'POST',
            data: {
                type: 1,
                student_id: student_id
            },
            success: function (data) {
                alert(data.msg);
                location.reload();
            },
            error: function (xhr, status, error) {
                response = JSON.parse(xhr.responseText);
                alert(response.msg);
            }
        });
    }
}

function ready4editInfo(student_id, student_name) {
    $('#editStudentMoalTitle').text('编辑' + student_name + '的信息');
    $('#info_type').val(2);
    $('#info_id').val(student_id);
    $.ajax({
        url: '/student-info-handler',
        type: 'POST',
        data: {
            type: 3,
            student_id: student_id
        },
        success: function (data) {
            var student = data.student;
            $('#edit_studentName').val(student.name);
            $('#edit_studentGender').val(student.gender);
            $('#edit_studentGrade').val(student.grade);
            $('#edit_studentContact').val(student.contact);
            $('#edit_studentAddress').val(student.address);
            $('#edit_studentRemark').val(revertRemark(student.remark));
            $('#edit_studentMachine').val(student.machine);
        },
        error: function (xhr, status, error) {
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function showLog(student_id,student_name){
    $("#logModalTitle").text(student_name + "的操作日志");
    $('#log_studentID').val(student_id);
    $.ajax({
        url: '/get-log',
        type: 'POST',
        data: {
            student_id: student_id
        },
        success: function (data) {
            var logs = data.content
            $("#logTextarea").text(logs);
        },
        error: function (xhr, status, error) {
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

function pullLog(line){
    var student_id = $('#log_studentID').val();
    $.ajax({
        url: '/get-log',
        type: 'POST',
        data: {
            student_id: student_id,
            line: line
        },
        success: function (data) {
            var logs = data.content
            $("#logTextarea").text(logs);
        },
        error: function (xhr, status, error) {
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
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
function dldLog(student_id){
    window.open('/dld-log?student_id='+student_id, '_blank');
}