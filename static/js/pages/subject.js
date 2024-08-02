function ready4editSubject(subject_id){
    $.ajax({
        url: '/subject-handler',
        type: 'POST',
        data: {
            type: 3,
            id: subject_id
        },
        success: function (data) {
            $('#edit_style').val(data.subject.style.substring(3));
            $('#edit_parent_style').val(data.subject.style.substring(3));
            $('#subject_type').val(2);
            $('#subject_id').val(data.subject.id);
            $('#edit_name').val(data.subject.name);
            $('#edit_parent_name').val(data.subject.name);
            $('#subject_name').val(data.subject.name);
            $('#subject_style').val(data.subject.style);
            $('#editSubjectModalTitle').text('编辑-' + data.subject.name);
            $('#editParentSubjectModalTitle').text('编辑-' + data.subject.name);
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

    // 获取表单数据
    var formData = $('#subjectForm').serialize();

    // 发送 AJAX 请求
    $.ajax({
        url: '/subject-handler', // 后端处理程序的 URL
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

function delSubject(subject_id,subject_name){
    if(confirm('确定删除科目【'+subject_name+'】吗？')){
        $.ajax({
            url: '/subject-handler',
            type: 'POST',
            data: {
                type: 1,
                id: subject_id
            },
            success: function (data) {
                alert(data.msg);
                location.reload();
            },
            error: function (xhr, status, error) {
                // 请求失败时的处理
                response = JSON.parse(xhr.responseText);
                alert(response.msg);
            }
        });
    }
}