function submitDetail() {
    var name_list = $('#students_select').val();
    // 清空旧的步骤条和表单内容（如果有需要的话）
    $('#steps-tablist').empty();
    $('#files-form').empty();

    // 遍历 name_list
    $.each(name_list, function (index, name) {
        // 生成步骤条的 HTML
        var stepHTML = `
            <div class="step" data-target="#student${index + 1}-step">
                <button type="button" class="step-trigger" role="tab" aria-controls="student${index + 1}-step"
                    id="student${index + 1}-step-trigger" aria-selected="${index === 0 ? 'true' : 'false'}">
                    <span class="bs-stepper-circle">${index + 1}</span>
                    <span class="bs-stepper-label">${name}</span>
                </button>
            </div>
            <div class="line"></div>
        `;
        $('#steps-tablist').append(stepHTML);

        // 生成表单内容的 HTML
        var formHTML = `
            <div id="student${index + 1}-step" class="content ${index === 1 ? 'active' : ''}" role="tabpanel"
                aria-labelledby="student${index + 1}-step-trigger">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <p class="card-text text-center">请将<strong>${name}</strong>的${month}月所有直播反馈表上传至此框</p>
                        <p class="card-text text-center text-danger"><strong>一节直播课对应一个excel表，请勿将所有表汇总在一个excel中</strong></p>
                        <input type="file" class="multiple-files-filepond" multiple name="student${index + 1}-files">
                        
                        <p class="card-text text-center">请将对应<strong>${name}</strong>部分的${month}月应得薪资填入下框</p>
                        <div class="input-group mb-3">
                            <label class="input-group-text">应得薪资</label>
                            <input type="number" class="form-control expected-salary" min="1" max="99999">
                        </div>

                    </div>
                </div>
                <div class="row text-end">
                    <div class="col-12">
                        ${index > 0 ? `
                            <i class="bi bi-arrow-left-circle-fill text-primary" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" title="上一个" onclick="stepper.to(${index})" style="cursor: pointer; font-size: 1.8rem;"></i>
                        ` : ''}
                        ${index < name_list.length ? `
                            <i class="bi bi-arrow-right-circle-fill text-primary" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" title="下一个" onclick="stepper.next();listFiles();" style="cursor: pointer; font-size: 1.8rem;"></i>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        $('#files-form').append(formHTML);
    });
    var submitTable1 = `
    <div class="step" data-target="#remark-step">
        <button type="button" class="step-trigger" role="tab" aria-controls="remark-step"
            id="remark-step-trigger" aria-selected="'false'}">
            <span class="bs-stepper-circle">${name_list.length + 1}</span>
            <span class="bs-stepper-label">备注</span>
        </button>
    </div>
    <div class="line"></div>
    `;
    $('#steps-tablist').append(submitTable1);
    var submitContent1 = `
    <div id="remark-step" class="content" role="tabpanel"
        aria-labelledby="remark-step-trigger">
        <p class="card-text text-center">在下方输入备注，可留空
        <br>
        <small class="text-danger">备注的作用是提醒额外事项，请将可能影响您工资统计的额外事项备注于此</small>
        </p>
        <div class="row">
            
            <div class="card col-md-6 offset-md-3">
                <div class="card-body">
                <textarea class="form-control" rows="5" id="remark"></textarea>
                </div>
                    
            </div>
        </div>
        <div class="row text-end">
            <div class="col-12">

                <i class="bi bi-arrow-left-circle-fill text-primary" data-bs-toggle="tooltip"
                    data-bs-placement="bottom" title="上一个" onclick="stepper.previous()"
                    style="cursor: pointer; font-size: 1.8rem;"></i>
                <i class="bi bi-arrow-right-circle-fill text-primary" data-bs-toggle="tooltip"
                    data-bs-placement="bottom" title="下一个" onclick="stepper.next();"
                    style="cursor: pointer; font-size: 1.8rem;"></i>
            </div>
        </div>
    </div>
    `
    $('#files-form').append(submitContent1);
    var submitTable2 = `
    <div class="step" data-target="#submit-step">
        <button type="button" class="step-trigger" role="tab" aria-controls="submit-step"
            id="submit-step-trigger" aria-selected="'false'}">
            <span class="bs-stepper-circle">${name_list.length + 2}</span>
            <span class="bs-stepper-label">提交</span>
        </button>
    </div>
    `;
    $('#steps-tablist').append(submitTable2);
    var submitContent2 = `
    <div id="submit-step" class="content" role="tabpanel"
        aria-labelledby="submit-step-trigger">
        <p class="card-text text-center">再次确认以下反馈表，请务必核验正确再提交！
        </p>
        <div class="row">
            
            <div class="card border col-md-6 offset-md-3 bg-light-secondary">
                <div class="card-body">
                    <div class="table-responsive" id="insertTable"></div>
                </div>
                    
            </div>
        </div>
        <div class="row text-end">
            <div class="col-12">

                <i class="bi bi-arrow-left-circle-fill text-primary" data-bs-toggle="tooltip"
                    data-bs-placement="bottom" title="上一个" onclick="stepper.previous()"
                    style="cursor: pointer; font-size: 1.8rem;"></i>
                <i class="bi bi-check-circle-fill text-success" data-bs-toggle="tooltip"
                    data-bs-placement="bottom" title="确认提交" onclick="$('#files-form').submit();"
                    style="cursor: pointer; font-size: 1.8rem;"></i>
            </div>
        </div>
    </div>
    `
    $('#files-form').append(submitContent2);
    $('#checkNumDiv').hide();
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
    // Filepond: Multiple Files
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
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    $('#fileUploader').show();
}
function listFiles() {
    // 定义一个空字符串来存储生成的表格HTML
    var tableHtml = '<table class="table table-striped"><thead><tr><th>文件名</th><th>大小</th></tr></thead><tbody>';

    // 使用 jQuery 选择器选择 files-form 中的所有文件输入框
    $('#files-form input[type="file"]').each(function (index) {
        var files = $(this)[0].files; // 获取当前文件输入框中选择的文件列表
        //将文件大小匹配合适的单位
        function formatFileSize(size) {
            if (size >= 1024 * 1024) {
                return (size / 1024 / 1024).toFixed(2) + ' MB';
            } else if (size >= 1024) {
                return (size / 1024).toFixed(2) + ' KB';
            } else {
                return size + ' B';
            }
        }

        // 遍历每个文件对象
        $.each(files, function (i, file) {
            // 生成表格行的 HTML
            tableHtml += '<tr>';
            tableHtml += '<td>' + file.name + '</td>'; // 文件名
            tableHtml += '<td>' + formatFileSize(file.size) + '</td>'; // 文件大小（字节）
            tableHtml += '</tr>';
        });
    });

    // 表格HTML结束标签
    tableHtml += '</tbody></table>';

    var insertTable = $('#insertTable');
    if (insertTable.children().length > 0) {
        insertTable.empty();
    }
    insertTable.append(tableHtml);

}

$(document).ready(function () {
    $('#files-form').on('submit', function (event) {
        $("#overlay").show()
        event.preventDefault(); // 阻止表单默认提交

        var formData = new FormData(this);
        var name_list = []; // 创建空列表来存储值

        // 使用 jQuery 选择器选择所有带有 student-name 类的输入框，并遍历每一个输入框
        $('.student-name').each(function () {
            var name = $(this).val(); // 获取当前输入框的值
            name_list.push(name); // 将值添加到列表中
        });
        var expected_salary_list = [];
        $('.expected-salary').each(function () {
            var salary = $(this).val();
            expected_salary_list.push(salary);
        });

        formData.append('student_names', $('#students_select').val());
        formData.append('expected_salaries', JSON.stringify(expected_salary_list));
        formData.append('teacher_id', $('#teacher_id').val());
        formData.append('year', year);
        formData.append('month', month);
        formData.append('remark', $('#remark').val());

        $.ajax({
            url: '/teacher-salary-uploader',
            type: 'POST',
            data: formData,
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            success: function (response) {
                Swal2.fire({
                    icon: "success",
                    title: "感谢您的配合，已上传成功",
                })
                location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                response = JSON.parse(xhr.responseText);
                alert(response.msg);
                $("#overlay").hide()
            }
        });
    });
});
