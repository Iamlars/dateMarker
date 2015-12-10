

;(function($,undefined){

  function DateMarker(obj,options){
    this.marker = obj;
    this.INITDATE = new Date();
    this.date = this.getDate();
    this.MAX = $.extend({}, this.date);
    this.def = {
      months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      weeks: ['周日','周一','周二','周三','周四','周五','周六']
    };
    this.settings = $.extend({}, this.def, options)
    this.build();
    this.change();
  }

  // 标题，不处理
  // 年份下拉
  // 月份下拉，左右切换，不可切换到未来月份



  // 计算月天数长度
  DateMarker.prototype.getMonthDaysLength = function(date){
    return new Date( date.year, date.month+1, 0 ).getDate();
  };

  // 获取格式化的日期格式
  DateMarker.prototype.getDate = function(){
    return {
      year: this.INITDATE.getFullYear(),
      month: this.INITDATE.getMonth()
    }
  };

  // 获取月具体的日期
  DateMarker.prototype.getMonthDays = function(){
    var i = 1,
        length = this.getMonthDaysLength(this.date),
        formatDate = this.date.year+'/'+this.date.month+'/';
        days = [];
    for( ; i<=length; i+=1 ){
      var day = '<li data-markdate="'+formatDate+i+'">'+i+'</li>';
      days.push(day);
    }

    return days.join('');
  };

  // 构建日历骨架
  DateMarker.prototype.build = function(){
    var markerHTML = '';

    markerHTML += '<div class="date-marker">';
    markerHTML +=   '<div class="date-marker-header">';
    markerHTML +=     '<i class="month-prev">prev</i>';
    markerHTML +=     this.buildYearSelect();
    markerHTML +=     this.buildMonthSelect();
    markerHTML +=     '<i class="month-next">next</i>';
    markerHTML +=   '</div>';
    markerHTML +=   '<ul class="date-marker-body"></ul>';
    markerHTML += '</div>';

    this.marker.html(markerHTML);
    this.set();
  };

  // 构建日历月份
  DateMarker.prototype.buildMonthSelect = function(){
    var month = '<select class="date-marker-month">';
    $(this.def.months).each(function(i,n){
      month += '<option value="'+i+'">'+n+'</option>'
    });
    month += '</select>';
    return month;
  };
  // 构建日历年份
  DateMarker.prototype.buildYearSelect = function(){
    var year = '<select class="date-marker-year">',
        lastYear = new Date().getFullYear(),
        erYear = lastYear-10;
    while (lastYear > erYear) {
      year += '<option value="'+lastYear+'">'+lastYear+'</option>';
      lastYear--;
    }
    year += '</select>';
    return year;
  };

  // 计算第一天是星期几,并插入空行
  DateMarker.prototype.setPrev = function(){
    var i = 0,
        days = [],
        len = new Date(this.date.year+'/'+this.date.month+'/1').getDay(),
        currentDate = $.extend({}, this.date),
        prevMonthDaysLen;

    currentDate.month--;
    prevMonthDaysLen = this.getMonthDaysLength(currentDate);

    while (i<len) {
      var day = '<li class="date-marker-prev" data-markdate="'+currentDate.year+'/'+currentDate.month+'/'+(prevMonthDaysLen-len)+'">'+(prevMonthDaysLen-len)+'</li>';
      days.push(day);
      len--;
    }

    return days.join('');
  };


  // 格式化日期
  DateMarker.prototype.formatDate = function(date){
    return new Date(date);
  };
  // 国际化

  // 切换日期
  DateMarker.prototype.change = function(date){
    var that = this;
    that.marker.on('click','.month-prev',function(){
      if(that.date.month <= 0){
        if(that.date.year <= that.MAX.year-10){
          return;
        }
        that.date.year--;
        that.date.month = 11;
        that.set();
        return;
      }
       that.date.month--;
       that.set();
    }).on('click','.month-next',function(){
      if(that.date.month >= 11){
        if(that.date.year >= that.MAX.year){
          return;
        }
        that.date.year++;
        that.date.month = 0;
        that.set();
        return;
      }
       that.date.month++;
       that.set();
    }).on('change','.date-marker-year',function(){
      that.date.year  = +this.value;
      that.set();
    }).on('change','.date-marker-month',function(){
      that.date.month  = +this.value;
      that.set();
    });
  };

  // 上一月，下一月
  DateMarker.prototype.xxx = function(date){

  };

  // 展示
  DateMarker.prototype.set = function(date){
    this.marker.find('.date-marker-year option[value="'+this.date.year+'"]').prop('selected','selected');
    this.marker.find('.date-marker-month option[value="'+this.date.month+'"]').prop('selected','selected');
    this.marker.find('.date-marker-body').html(this.setPrev()+this.getMonthDays());
  };

  $.fn.dateMarker = function(){
    this.each(function(i,n){
      new DateMarker($(n));
    });
  }

}(window.jQuery,undefined));
