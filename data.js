(function() {
    var datepicker = {};

    datepicker.getMonthData = function(year, month) {

        var ret = [];

        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        var firstDay = new Date(year, month - 1, 1); //获取当月的第一天
        var firstDayWeekDay = firstDay.getDay(); //获取这个月的第一天是星期几
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month - 1, 0); //上个月的最后一天
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); //上一个月最后一天是几号

        var preMonthDayCount = firstDayWeekDay - 1; //获取上一个月有多少天在当前月面板要显示

        var lastDay = new Date(year, month, 0); //当月的最后一天
        var lastDate = lastDay.getDate(); //获取最后一天是多少号

        for (var i = 0; i < 7 * 6; i++) {
            var date = i + 1 - preMonthDayCount; //当月这个日期是多少号
            var showDate = date;
            var thisMonth = month;
            if (date <= 0) {
                //上一个月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                //下一个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) {
                thisMonth = 12;
            } else if (thisMonth === 13) {
                thisMonth = 1;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }
        return {
            year: year,
            month: month,
            days: ret
        };
    }

    window.datepicker = datepicker;
})();