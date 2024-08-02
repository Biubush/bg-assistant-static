

$(document).ready(function () {
  showLog(50);
});

function showLog(line) {
  $.ajax({
    url: '/get-log',
    type: 'POST',
    data: {
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

function createBackup() {
  document.getElementById('overlay').style.display = 'block';
  $.ajax({
    url: '/backup-handler',
    type: 'POST',
    data: {
      type: 0
    },
    success: function (data) {
      alert(data.msg)
      document.getElementById('overlay').style.display = 'none';
      $('#backup_iframe').attr('src', 'backup-table');
    },
    error: function (xhr, status, error) {
      response = JSON.parse(xhr.responseText);
      alert(response.msg);

      document.getElementById('overlay').style.display = 'none';
    }
  });
}
$('#backup_uploads').change(function () {
  document.getElementById('overlay').style.display = 'block';
  let files = this.files;
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`files[]`, files[i]);
  }
  formData.append('type', 4);

  $.ajax({
    url: '/backup-handler',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      alert(data.msg)
      document.getElementById('overlay').style.display = 'none';
      $('#backup_iframe').attr('src', 'backup-table');
    },
    error: function (xhr, status, error) {
      response = JSON.parse(xhr.responseText);
      alert(response.msg);
      document.getElementById('overlay').style.display = 'none';
    }
  });
});

function clearTmp() {
  document.getElementById('overlay').style.display = 'block';
  $.ajax({
    url: '/clear-tmp', // 后端处理程序的 URL
    type: 'POST',
    success: function (response) {
      // 请求成功时的处理
      console.log(response);
      alert(response.msg);
      $('#tmp_iframe').attr('src', 'tmp');
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

function sync2Ali() {
  $('#backup_iframe').contents().find('#syncOverlay').css('display', 'block');
  $.ajax({
    url: '/sync2ali', // 后端处理程序的 URL
    type: 'POST',
    success: function (response) {
      // 请求成功时的处理
      console.log(response);
      alert(response.msg);
      $('#backup_iframe').contents().find('#syncOverlay').css('display', 'none');
      $('#backup_iframe').attr('src', 'backup-table');

    },
    error: function (xhr, status, error) {
      // 请求失败时的处理
      response = JSON.parse(xhr.responseText);
      alert(response.msg);
      $('#backup_iframe').contents().find('#syncOverlay').css('display', 'none');
      $('#backup_iframe').attr('src', 'backup-table');
    }
  });
}

function reloadAli() {
  document.getElementById('overlay').style.display = 'block';
  $.ajax({
    url: '/reload-aliyun', // 后端处理程序的 URL
    type: 'POST',
    success: function (response) {
      // 请求成功时的处理
      console.log(response);
      alert(response.msg);
      window.location.reload();

    },
    error: function (xhr, status, error) {
      // 请求失败时的处理
      response = JSON.parse(xhr.responseText);
      alert(response.msg);
      window.location.reload();
    }
  });
}

function dldLog() {
  window.open('/dld-log', '_blank');
}

$('.submit-btn').click(function (e) {
  e.preventDefault();

  // 获取表单数据
  var formData = $('#employeeForm').serialize();

  // 发送 AJAX 请求
  $.ajax({
    url: '/employee-handler', // 后端处理程序的 URL
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

function ready4edit(employee_id) {
  $.ajax({
    url: '/employee-handler', // 后端处理程序的 URL
    type: 'POST',
    data: {
      type: 3,
      id: employee_id
    },
    success: function (response) {
      response = response.data;
      $('#edit_employeeName').val(response.name);
      $('#edit_employeeLevel').val(response.level);
      $('#edit_employeeGender').val(response.gender);
      $('#edit_employeeContact').val(response.contact);
      $('#edit_employeeUsername').val(response.username);
      $('#edit_employeePassword').val(response.password);
      $('#employee_id').val(response.id);
      $('#employee_name').val(response.name);
      $('#employee_level').val(response.level);
      $('#employee_gender').val(response.gender);
      $('#employee_contact').val(response.contact);
      $('#employee_username').val(response.username);
      $('#employee_password').val(response.password);
    },
    error: function (xhr, status, error) {
      // 请求失败时的处理
      response = JSON.parse(xhr.responseText);
      alert(response.msg);
    }
  });
}

function delEmployee(employee_id) {
  //弹出确认框询问是否删除此员工
  if (confirm("确认删除此员工？")) {

    $.ajax({
      url: '/employee-handler', // 后端处理程序的 URL
      type: 'POST',
      data: {
        type: 1,
        id: employee_id
      },
      success: function (response) {
        // 请求成功时的处理
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
  }
}

function showEmployeeLog(line){
  $.ajax({
    url: '/employee-log',
    type: 'POST',
    data: {
      id: $('#employee_id').val(),
      line: line
    },
    success: function (data) {
      var logs = data.content
      $("#employeeLogTextarea").text(logs);
    },
    error: function (xhr, status, error) {
      response = JSON.parse(xhr.responseText);
      alert(response.msg);
    }
  });
}

function dldEmployeeLog(id){
  window.open('/employee-log?id='+id, '_blank');
}