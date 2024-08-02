function getWeek(dateString){
    var dateParts = dateString.split('.'); // 分割字符串得到年、月、日的数组

    // 创建 Date 对象
    var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // 月份从0开始，需要减1

    // 获取星期几
    var dayOfWeek = date.getDay();

    // 映射到星期几的文本表示
    var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var dayName = days[dayOfWeek];

    return dayName;

}

function nextMonth() {
   // 获取 URL 中的查询参数
    const params = new URLSearchParams(window.location.search);

    // 获取当前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() 返回值范围是 0-11，所以需要加 1

    // 获取 URL 中的 year、month 参数，如果不存在则使用当前日期的值
    const year = parseInt(params.get('year')) || currentYear;
    const month = parseInt(params.get('month')) || currentMonth;

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
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 如果需要，可以使用下面这行代码将浏览器重定向到新 URL
    window.location.href = newUrl;

}


function lastMonth() {
    // 获取 URL 中的查询参数
    const params = new URLSearchParams(window.location.search);

    // 获取当前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() 返回值范围是 0-11，所以需要加 1

    // 获取 URL 中的 year、month 参数，如果不存在则使用当前日期的值
    const year = parseInt(params.get('year')) || currentYear;
    const month = parseInt(params.get('month')) || currentMonth;

    // 创建一个 Date 对象，并设置为上个月的最后一天
    let date = new Date(year, month - 1, 0); // 0 表示上个月的最后一天

    // 获取上个月的年份和月份
    const lastMonthYear = date.getFullYear();
    const lastMonth = date.getMonth() + 1; // 需要加 1 以返回 1-12 范围的月份

    console.log(`Last Month - Year: ${lastMonthYear}, Month: ${lastMonth}`);

    // 更新 URL 参数
    params.set('year', lastMonthYear);
    params.set('month', lastMonth);

    // 生成新的 URL
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log(newUrl);

    // 如果需要，可以使用下面这行代码将浏览器重定向到新 URL
    window.location.href = newUrl;

}


