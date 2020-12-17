 function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//////////////////////////// Validations /////////////////////////////////////////////////

/////////////// Validation Configuration /////////////////////

var error_msgs = [];
var focus_element = [];
var err = [];
var temp = 0;

function validate(id, msg) {
    if (typeof id =='string'){
        focus_element.push(id);
        $("" + id + "").addClass('validate_error');
    }else if (typeof id =='object'){
        for (var i = 0; i < id.length; ++i) {
            focus_element.push(id[i]);
            $("" + id[i] + "").addClass('validate_error');
        }
    }
    $('.validate_error').eq(0).focus();
}

function tab_toggle(id){
    var tabid = $(""+id+"").parents('div.tab-pane').attr('id');
    $('#tab_panel').find('a[href="#' + tabid + '"]').tab('show');
}


function validate_compare(id1, id2, msg) {
    error_msgs.push(msg);
    focus_element.push(id1);
    $("" + id1 + "").addClass('validate_error');
    $("" + id2 + "").addClass('validate_error');
    $('.validate_error').eq(0).focus();
}

function display_errors(errors) {
    new Noty({
              type: 'error',
              layout: 'topRight',
              theme: 'mint',
              text: errors,
              timeout: 3000,
              progressBar: true,
              closeWith: ['click', 'button'],
              animation: {
                  open: 'noty_effects_open',
                  close: 'noty_effects_close'
              },
              id: false,
              force: false,
              killer: false,
              queue: 'global',
              container: false,
              buttons: [],
              sounds: {
                  sources: [],
                  volume: 1,
                  conditions: []
              },
              titleCount: {
                  conditions: []
              },
              modal: false
                }).show()
    $('#button_clicked').val('default');
}
function display_success(msg) {
    new Noty({
                  type: 'success',
                  layout: 'topRight',
                  theme: 'mint',
                  text: msg,
                  timeout: 3000,
                  progressBar: true,
                  closeWith: ['click', 'button'],
                  animation: {
                      open: 'noty_effects_open',
                      close: 'noty_effects_close'
                  },
                  id: false,
                  force: false,
                  killer: false,
                  queue: 'global',
                  container: false,
                  buttons: [],
                  sounds: {
                      sources: [],
                      volume: 1,
                      conditions: []
                  },
                  titleCount: {
                      conditions: []
                  },
                  modal: false
              }).show();
    $('#button_clicked').val('default');
}
function fields_validation (fields_dict) {
    error_msgs = [];
    for (var field_name in fields_dict) {
        if($(field_name).is(':visible')){
            if($(field_name).val()=="") {
                validate(field_name,fields_dict[field_name]);
            }
        }
    }
    if (error_msgs.length) {
        var errors = error_msgs.join("<br/>");
        display_errors(errors);
        return false;
    } else {
        return true;
    }
}

function form_submit(form_id) {
    $('' + form_id + '').submit();
}

var global_ignore_warnings = false;
var ignore_cancel_clicked = false;

function focus_display_warning(id){
    $("" + id + "").css("border-color", "#ffff00");
    $("" + id + "").css("box-shadow", "0 0 10px #ffff00");
}

function display_warning(warning_msg) {
    var n = noty({
        text: warning_msg,
        type: 'warning',
        dismissQueue: true,
        layout: 'topRight',
        theme: 'defaultTheme',
        buttons: [{
            addClass: 'btn btn-primary',
            text: 'Ok',
            onClick: function ($noty) {
                $noty.close();
                $('.general_form').submit();
            }
        }, {
            addClass: 'btn btn-danger',
            text: 'Cancel',
            onClick: function ($noty) {
                $noty.close();
                noty({
                    dismissQueue: true,
                    force: true,
                    layout: layout,
                    theme: 'defaultTheme',
                    text: 'You clicked "Cancel" button',
                    type: 'error',
                    timeout: '2000'
                });
            }
        }]
    });
}

function get_msg(index, msg, end_msg) {
    end_msg = typeof end_msg !== 'undefined' ? end_msg : " is Required";
    if (parseInt(index) == 1) {
        msg = "1st " + msg + end_msg;
    } else if (parseInt(index) == 2) {
        msg = index + "nd " + msg + end_msg;
    }else if (parseInt(index) == 3) {
        msg = index + "rd " + msg + end_msg;
    }else {
        msg = index + "th " + msg + end_msg;
    }
    return msg;
}


function get_msg_range(index, msg) {
    if (parseInt(index) == 1) {
        msg = "1st " + msg + " Range Already Exists";
    } else if (parseInt(index) == 2 || parseInt(index) == 3) {
        msg = index + "nd " + msg + " Range Already Exists";
    } else {
        msg = index + "th " + msg + " Range Already Exists";
    }
    return msg;
}

function get_number_type(index, msg) {
    if (parseInt(index) == 1) {
        msg = "1st " + msg + " should be Numeric";
    } else if (parseInt(index) == 2) {
        msg = index + "nd " + msg + " should be Numeric";
    } else if (parseInt(index) == 3) {
        msg = index + "rd " + msg + " should be Numeric";
    } else {
        msg = index + "th " + msg + " should be Numeric";
    }
    return msg;
}


function get_compare_msg(first, next, msg) {

    if (parseInt(first) == 1) {
        pre = "1st";
    } else if (parseInt(first) == 2) {
        pre = "2nd";
    } else if (parseInt(first) == 3) {
        pre = "3rd";
    } else {
        pre = +first + "th";
    }
    if (parseInt(next) == 1) {
        suf = "1st";
    } else if (parseInt(next) == 2) {
        suf = "2nd";
    } else if (parseInt(next) == 3) {
        suf = "3rd";
    } else {
        suf = +next + "th";
    }
    msg = pre + "," + suf + " Fields Of " + msg + " are Same";
    return msg;
}

function collect_error_fields(error_fields){
    for(var i=0;i<error_fields.length;i++){
        if(jQuery.inArray('#', error_fields[i]) > -1){
            $("" + error_fields[i] + "").css("border-color", "red");
            $("" + error_fields[i] + "").css("box-shadow", "0 0 8px red");
        }
        else{
            $("#" + error_fields[i] + "").css("border-color", "red");
            $("#" + error_fields[i] + "").css("box-shadow", "0 0 8px red");
        }
    }
}
function fnExcelReport(id,number,filename)
{
   var elHtml='<table border="0" bordercolor=red><h4 color=blue;"> PPV Portal Users</h4><br/><br/>'+document.getElementById(id).innerHTML+'</table>';
  // var tab_text = "<tr bgcolor='#87AFC6'>";
  //       var textRange; var j = 0, rows = '';
  //       tab = document.getElementById(id);
  //       // tab_text = tab_text + tab.rows[0].innerHTML + "</tr>";

  //       children = tab.rows[0].children;
  //       val = tab_text;
  //       for (i=0;i<children.length;i++){
  //           ele = children[i].textContent;
  //           val += '<td>'+ ele + '</td>'
  //       }
  //       tab_text = val + "</tr>";
  //       var tableData = $('#'+id).DataTable().rows().data();
  //       for (var i = 0; i < tableData.length; i++) {
  //           values = '';
  //           for (j=0;j< number;j++){
  //             values += '<td>' + tableData[i][j] + '</td>'
  //           }
  //           rows += '<tr>'
  //               + values
  //               + '</tr>'    
  //       }
  //       tab_text += rows;
      // debugger;
        var link=document.createElement('a');
    mimeType='application/sss';

    var blob=new Blob([elHtml],{type:mimeType});
    var url=URL.createObjectURL(blob);

    link.href=url;

    link.setAttribute('download', filename);
    link.innerHTML = "Export to CSV";
    document.body.appendChild(link);
    link.click();
        
    //     sa = window.open('data:application/vnd.ms-excel,' + escape(tab_text));  

    //     blob = new Blob([excel], { type: 'text/excel' }); //new way
    //     var ExcelUrl = URL.createObjectURL(blob);

    //     $(this)
    //     .attr({
    //         'download': filename,
    //         'href': csvUrl
    //     });

    // return (sa);
}
        // var data_type = 'data:application/vnd.ms-excel;base64,',
        //     template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table border="2px">{table}</table></body></html>',
        //     base64 = function (s) {
        //         return window.btoa(unescape(encodeURIComponent(s)))
        //     },
        //     format = function (s, c) {
        //         return s.replace(/{(\w+)}/g, function (m, p) {
        //             return c[p];
        //         })
        //     }

        // var ctx = {
        //     worksheet: "Sheet 1" || 'Worksheet',
        //     table: tab_text
        // }
        // document.getElementById("excel").href = data_type + base64(format(template, ctx));
        // document.getElementById("excel").download = "StudentDetails.xls";
        // document.getElementById("excel").traget = "_blank";
        // document.getElementById("excel").click();
var tablesToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
      + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
      + '<Styles>'
      + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
      + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
      + '</Styles>' 
      + '{worksheets}</Workbook>'
    , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
    , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(tables, wsnames, wbname, appname) {
      var ctx = "";
      var workbookXML = "";
      var worksheetsXML = "";
      var rowsXML = "";

      for (var i = 0; i < tables.length; i++) {
        if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
        for (var j = 0; j < tables[i].rows.length; j++) {
          rowsXML += '<Row>'
          for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
            var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
            var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
            var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
            dataValue = (dataValue)?dataValue:tables[i].rows[j].cells[k].innerHTML;
            var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
            dataFormula = (dataFormula)?dataFormula:(appname=='Calc' && dataType=='DateTime')?dataValue:null;
            ctx = {  attributeStyleID: (dataStyle=='Currency' || dataStyle=='Date')?' ss:StyleID="'+dataStyle+'"':''
                   , nameType: (dataType=='Number' || dataType=='DateTime' || dataType=='Boolean' || dataType=='Error')?dataType:'String'
                   , data: (dataFormula)?'':dataValue
                   , attributeFormula: (dataFormula)?' ss:Formula="'+dataFormula+'"':''
                  };
            rowsXML += format(tmplCellXML, ctx);
          }
          rowsXML += '</Row>'
        }
        ctx = {rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i};
        worksheetsXML += format(tmplWorksheetXML, ctx);
        rowsXML = "";
      }

      ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
      workbookXML = format(tmplWorkbookXML, ctx);



      var link = document.createElement("A");
      link.href = uri + base64(workbookXML);
      link.download = wbname || 'Workbook.xls';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  })();
