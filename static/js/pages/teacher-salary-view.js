const YEAR = $("#form_year").val();
const MONTH = $("#form_month").val();


function checkTask(newTaskId) {
    $('#overlay').show();
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);

    if (params.has('task_id')) {
        params.set('task_id', newTaskId);
    } else {
        params.append('task_id', newTaskId);
    }

    url.search = params.toString();
    window.history.replaceState({}, '', url.toString());
    window.location.href = url.toString();
}

function submitForm() {
    // 获取表单数据
    var formData = $('#submitForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: formData,
        success: function (response) {
            // 请求成功时的处理
            console.log(response);
            alert(response.msg);
            $('#overlay').show();
            //刷新页面
            window.location.href = "/teacher-salary-view";
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
        }
    });
}

$('.submit-btn').click(function (e) {
    e.preventDefault();

    submitForm();
});

function passTask() {
    $('#overlay').show();
    $("#form_type").val(3);
    $("#submitBtn").click();
}

function rejectTask() {
    $('#overlay').show();
    $("#form_type").val(4);
    $("#submitBtn").click();
}

function pendTask() {
    $('#overlay').show();
    $("#form_type").val(5);
    $("#submitBtn").click();
}

function transAll2lb() {
    $("textarea").each(function () {
        var content = $(this).val();
        var newContent = content.replace(/<br>/g, "\n");
        $(this).val(newContent);
    });
}

function ready4Edit(excel_path) {
    $('#overlay').show();
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: {
            type: 6,
            excel_path: excel_path
        },
        success: function (response) {
            $("#form_type").val(2);
            $("#form_student_name").val(response.student_name);
            $("#form_student_grade").val(response.student_grade);
            $("#form_learning_content").val(response.learning_content);
            $("#form_student_situation").val(response.student_situation);
            $("#form_interaction").val(response.interaction);
            $("#form_plan").val(response.plan);
            $("#form_excel_path").val(excel_path);
            $("#form_time_range").val(response.time_range);
            $('#overlay').hide();
            transAll2lb();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            $('#overlay').hide();
        }
    });
}

function ready4Add(index) {
    $("#form_student_index").val(index);

    document.querySelectorAll(".multiple-files-filepond").forEach(element => {
        FilePond.create(element, {
            credits: null,
            allowImagePreview: false,
            allowMultiple: true,
            allowFileEncode: false,
            required: true,
            storeAsFile: true,
        });
    });
    $('#addExcelModal').modal('show');
}

$(document).ready(function () {
    $('#excelsForm').on('submit', function (event) {
        $('#overlay').show();
        event.preventDefault(); // 阻止表单默认提交

        var formData = new FormData(this);

        // index:int,task_id:str,excel_name:str,year:int,month:int
        var index = $('#form_student_index').val();
        var task_id = $('#form_task_id').val();
        var year = $('#form_year').val();
        var month = $('#form_month').val();
        var teacher_id = $('#form_teacher_id').val();

        formData.append('index', index);
        formData.append('task_id', task_id);
        formData.append('year', year);
        formData.append('month', month);
        formData.append('type', 0);
        formData.append('teacher_id', teacher_id);

        $.ajax({
            url: '/teacher-salary-handler',
            type: 'POST',
            data: formData,
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            success: function (response) {
                console.log(response);
                alert(response.msg);
                location.reload();
            },
            error: function (xhr, status, error) {
                // 请求失败时的处理
                response = JSON.parse(xhr.responseText);
                alert(response.msg);
                $('#overlay').hide();
            }
        });
    });
});

function deletTask() {
    if (confirm("确定要删除该任务吗？")) {
        $('#overlay').show();
        $("#form_type").val(7);
        $("#submitBtn").click();
    }
}

function editsalary(index) {
    var value = prompt("请输入新的工资", "");
    var salary = Number(value);
    // 判断是否为数字
    if (!isNaN(salary)) {
        // 输出数字
        console.log(salary);
    } else {
        alert("你输入的不是数字。");
        return null;
    }
    $('#overlay').show();
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: {
            type: 8,
            task_id: $('#form_task_id').val(),
            index: index,
            salary: salary,
            month: $('#form_month').val(),
            year: $('#form_year').val(),
        },
        success: function (response) {
            alert(response.msg);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            $('#overlay').hide();
        }
    });
}
function editRemark() {
    $('#overlay').show();
    var original_remark = $('#remark_content').text();
    var input = prompt("请输入修改后的备注", original_remark);
    if (input === original_remark || input === null) {
        $('#overlay').hide();
        return null;
    }
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: {
            type: 10,
            task_id: $('#form_task_id').val(),
            remark: input,
            month: $('#form_month').val(),
            year: $('#form_year').val(),
        },
        success: function (response) {
            alert(response.msg);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            $('#overlay').hide();
        }
    });
}

function extraAdd() {
    $('#overlay').show();
    var input = prompt("请输入要添加的金额", "");
    var extra = Number(input);
    if (!isNaN(extra)) {
        // 输出数字
        console.log(extra);
    }
    else {
        alert("你输入的不是数字。");
        $('#overlay').hide();
        return null;
    }
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: {
            type: 9,
            task_id: $('#form_task_id').val(),
            extra: extra,
            month: $('#form_month').val(),
            year: $('#form_year').val(),
        },
        success: function (response) {
            alert(response.msg);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            $('#overlay').hide();
        }
    });
}
function extraSub() {
    $('#overlay').show();
    var input = prompt("请输入要扣除的金额，不必带负号", "");
    var extra = Number(input);
    //取其负值
    extra = -extra;
    if (!isNaN(extra)) {
        // 输出数字
        console.log(extra);
    }
    else {
        alert("你输入的不是数字。");
        $('#overlay').hide();
        return null;
    }
    $.ajax({
        url: '/teacher-salary-handler', // 后端处理程序的 URL
        type: 'POST',
        data: {
            type: 9,
            task_id: $('#form_task_id').val(),
            extra: extra,
            month: $('#form_month').val(),
            year: $('#form_year').val(),
        },
        success: function (response) {
            alert(response.msg);
            window.location.reload();
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            response = JSON.parse(xhr.responseText);
            alert(response.msg);
            $('#overlay').hide();
        }
    });
}


document.getElementById('saveBtn').addEventListener('click', function () {
    var originalWidth = window.innerWidth;
    var originalHeight = window.innerHeight;
    var originalBodyOverflow = document.body.style.overflow;

    // 临时调整视口大小以适应组件高度
    window.innerWidth = window.screen.availWidth;
    window.innerHeight = window.screen.availHeight;
    document.body.style.overflow = "hidden"; // 防止滚动条出现

    $('#overlay').show();
    var element = document.getElementById('capture');
    $('.hide-required').hide();

    html2canvas(element, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true
    }).then(canvas => {
        // 恢复视口大小和滚动条设置
        window.innerWidth = originalWidth;
        window.innerHeight = originalHeight;
        document.body.style.overflow = originalBodyOverflow;

        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        $.ajax({
            url: '/save-salary-image',
            type: 'POST',
            data: {
                image: link.href,
                teacher_id: $('#form_teacher_id').val(),
                year: YEAR,
                month: MONTH
            },
            success: function (temp_file) {
                $('#overlay').hide();
                $('.hide-required').show();
                window.open(`/static/static/images/tmp/teacher-salary-tmp.png`, '_blank');
            },
            error: function (xhr, status, error) {
                response = JSON.parse(xhr.responseText);
                $('#overlay').hide();
                $('.hide-required').show();
                alert(response.msg);
            }
        });
    });
});
$('#pdfBtn').click(function () {
    
    var originalWidth = window.innerWidth;
    var originalHeight = window.innerHeight;
    var originalBodyOverflow = document.body.style.overflow;

    // 临时调整视口大小以适应组件高度
    window.innerWidth = window.screen.availWidth;
    window.innerHeight = window.screen.availHeight;
    document.body.style.overflow = "hidden"; // 防止滚动条出现

    $('#overlay').show();
    var element = document.getElementById('capture');
    $('.hide-required').hide();

    html2canvas(element, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true
    }).then(canvas => {
        // 恢复视口大小和滚动条设置
        window.innerWidth = originalWidth;
        window.innerHeight = originalHeight;
        document.body.style.overflow = originalBodyOverflow;

        var link = document.createElement('a');
        var teacher_id = $('#form_teacher_id').val();
        link.href = canvas.toDataURL('image/png');
        $.ajax({
            url: '/save-salary-pdf',
            type: 'POST',
            data: {
                image: link.href,
                teacher_id: teacher_id,
                year: YEAR,
                month: MONTH
            },
            success: function (temp_file) {
                $('#overlay').hide();
                $('.hide-required').show();
                window.open(`/download-salary-pdf?month=${month}&year=${year}&teacher_id=${teacher_id}`, '_blank');
            },
            error: function (xhr, status, error) {
                response = JSON.parse(xhr.responseText);
                $('#overlay').hide();
                $('.hide-required').show();
                alert(response.msg);
            }
        });
    });
});
// 获取URL参数的函数
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// 获取当前日期
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 注意：getMonth() 返回的月份是 0 - 11，所以需要 +1
// 获取 URL 中的查询参数
const params = new URLSearchParams(window.location.search);
// 获取URL参数 year、month、day
const year = getURLParameter('year') || currentYear;
const month = getURLParameter('month') || currentMonth;