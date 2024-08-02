function showChart(num_list, label_list, color_list) {
  function fomartString(str) {
    // 替换单引号为双引号
    str = str.replace(/'/g, '"');

    // 如果有 HTML 实体（例如 &#39; 表示的单引号），可以使用一个函数替换它们
    str = str.replace(/&#39;/g, '"');

    return JSON.parse(str);
  }
  var numList = fomartString(num_list);
  var labelList = fomartString(label_list);
  var colorList = fomartString(color_list);
  console.log(numList);
  console.log(labelList);
  console.log(colorList);
  // 创建临时的 <div>，获取样式计算值
  function getComputedColor(className) {
    const tempDiv = document.createElement('div');
    tempDiv.className = className;
    document.getElementById('hiddenDiv').appendChild(tempDiv);
    const computedStyle = window.getComputedStyle(tempDiv);
    const backgroundColor = computedStyle.backgroundColor;
    document.getElementById('hiddenDiv').removeChild(tempDiv);
    return backgroundColor;
  }

  // 遍历 colorList，获取对应样式的颜色
  var colorList = colorList.map(className => {
    const rgbColor = getComputedColor(className);
    // 将 RGB 转换为十六进制
    const hexColor = rgbToHex(rgbColor);
    return hexColor;
  });
  // 将 RGB 转换为十六进制
  function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return '';
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }
  // 按照数字大小重新对数据进行排序
  function sortData(numList, labelList, colorList) {
    const data = numList.map((num, index) => ({
      num,
      label: labelList[index],
      color: colorList[index],
    }));
    data.sort((a, b) => b.num - a.num);
    return {
      numList: data.map(item => item.num),
      labelList: data.map(item => item.label),
      colorList: data.map(item => item.color),
    };
  }
  const sortedData = sortData(numList, labelList, colorList);
  numList = sortedData.numList;
  labelList = sortedData.labelList;
  colorList = sortedData.colorList;
  let optionsVisitorsProfile = {
    series: numList,
    labels: labelList,
    colors: colorList,
    chart: {
      type: "donut",
      width: "100%",
      height: "350px",
    },
    legend: {
      position: "right",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "30%",
        },
      },
    },
  }
  var chartVisitorsProfile = new ApexCharts(
    document.getElementById("chart-visitors-profile"),
    optionsVisitorsProfile
  )
  chartVisitorsProfile.render()
}

function showLog(id,line) {
  $.ajax({
    url: '/employee-log',
    type: 'POST',
    data: {
      id:id,
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
function dldEmployeeLog(id){
  window.open('/employee-log?id='+id, '_blank');
}