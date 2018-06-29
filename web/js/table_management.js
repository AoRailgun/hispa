//https://stackoverflow.com/questions/29698796/how-to-convert-html-table-to-excel-with-multiple-sheet
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
          //removes span tag that caused error on opening of file
          if ($(tables[i].rows[j]).find('th').hasClass('sorttable_sorted')) {
            $('.sorttable_sorted span').remove();
          } else if ($(tables[i].rows[j]).find('th').hasClass('sorttable_sorted_reverse')) {
            $('.sorttable_sorted_reverse span').remove();
          }

          //write in file if row not invisible
          if (!($(tables[i].rows[j]).hasClass('invisibleRow'))) {
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

//puts a space before each capital letter
function putSpaceCaps() {
    var text;
    var beginText;
    var endText;

    $('.contentTable th').each(function() {
      text = $(this).text();
      for (i=1; i<$(this).text().length; i++) {
        if (text[i] == text[i].toUpperCase()) {
          beginText = text.substr(0, i);
          endText = text.substr(i, text.length);
          text = beginText + ' ' + endText;
          //prevents from putting as much spaces as the number of charcters in the second part
          break;
        }
      }
      $(this).text(text);
    });
}

//generates checkboxes for each year
function dateCheckboxes() {
  var careerDates = [];
  var payDates = [];

  $(".DateDebut, .DateFin").each(function () {
    careerDates.push($(this).text().substr(6));
  });

  $(".AnneePaye").each(function() {

    payDates.push($(this).text());
  });

  let uniqueCareerDates = [...new Set(careerDates)];
  uniqueCareerDates.sort();

  let uniquePayDates = [...new Set(payDates)];
  uniquePayDates.sort();

  for (i=0; i<uniqueCareerDates.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = uniqueCareerDates[i];
    checkbox.value = uniqueCareerDates[i];
    checkbox.id = "cb" + uniqueCareerDates[i];
    $(checkbox).attr("onclick", "hideCareerRows()");
    $(checkbox).attr('class','checkbox');
    $(checkbox).attr('name', 'filterStatus');

    var label = document.createElement('label')
    label.htmlFor = "cb" + uniqueCareerDates[i];
    label.appendChild(document.createTextNode(uniqueCareerDates[i]));

    $("#careerDateCheckboxes").append(checkbox);
    $("#careerDateCheckboxes").append(label);
  }

  for (i=0; i<uniquePayDates.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = uniquePayDates[i];
    checkbox.value = uniquePayDates[i];
    checkbox.id = "cb" + uniquePayDates[i];
    $(checkbox).attr("onclick", "hidePayRows()");
    $(checkbox).attr('class','checkbox dateCheckbox');
    $(checkbox).attr('name', 'filterStatus');

    var label = document.createElement('label')
    label.htmlFor = "cb" + uniquePayDates[i];
    label.appendChild(document.createTextNode(uniquePayDates[i]));

    $("#pcDateCheckboxes").append(checkbox);
    $("#pcDateCheckboxes").append(label);
    $("#pcDateCheckboxes").append('<br/>');
  }
}

function rubriqueCheckboxes() {
  var rubriques = [];

  $(".Rubrique").each(function () {
    rubriques.push($(this).text());
  });

  let uniqueRubriques = [...new Set(rubriques)];
  uniqueRubriques.sort();

  for (i=0; i<uniqueRubriques.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = uniqueRubriques[i];
    checkbox.value = uniqueRubriques[i];
    checkbox.id = "cb" + uniqueRubriques[i];
    $(checkbox).attr("onclick", "hidePayRows()");
    $(checkbox).attr('class','checkbox rubriqueCheckbox');
    $(checkbox).attr('name', 'filterStatus');

    var label = document.createElement('label')
    label.htmlFor = "cb" + uniqueRubriques[i];
    label.appendChild(document.createTextNode(uniqueRubriques[i]));

    $("#rubriqueCheckboxes").append(checkbox);
    $("#rubriqueCheckboxes").append(label);
    $('#rubriqueCheckboxes').append('<br/>');
  }
}

function hideCareerRows() {
  $('#careerTable tr').each(function() {
    $(this).removeAttr('class');
  });

  $("input[name='filterStatus']").change(function () {
    var dates = [];

    $("input[name='filterStatus']").each(function () {
        if ($(this).is(":checked")) { dates.push($(this).next("label").html()); }
    });

    if (dates == "") { // if no filters selected, show all items
        $("#careerTable tbody tr").show();
    } else { // otherwise, hide everything...
        $("#careerTable tbody tr").hide();

        $("#careerTable tr:not([id='cTableHeader'])").each(function () {
            var show = false;
            $(this).removeAttr('class');
            var row = $(this);
            if (!($(row).attr('id')=='cTableHeader')) {
              dates.forEach(function (date) {
                if (($(row).find('.DateFin').html().substr(6) == date) || ($(row).find('.DateDebut').html().substr(6) == date)) {
                   show = true;
                } else {
                  $(row).attr('class', 'invisibleRow');
                }
              });
            }
            if (show) {
               row.show();
               $(row).attr('class','visibleRow');
            }
        });
        $('#cTableHeader').show();
    }
  });
}

function hidePayRows() {
  $('#paychecksTable tr').each(function() {
    $(this).removeAttr('class');
  });

  $("input[name='filterStatus']").change(function () {
    var dates = [];
    var rubriques = [];

    $("input[name='filterStatus']").each(function () {
        if ($(this).is(":checked") && $(this).hasClass('dateCheckbox')) {
          dates.push($(this).next("label").html());
        } else if ($(this).is(":checked") && $(this).hasClass('rubriqueCheckbox')) {
          rubriques.push($(this).next("label").html());
        }
    });

    if (rubriques == "" && dates == "") { // if no filters selected, show all items
        $("#paychecksTable tbody tr").show();
    } else { // otherwise, hide everything...
        $("#paychecksTable tbody tr").hide();

        $("#paychecksTable tr:not([id='pTableHeader'])").each(function () {
            var show = false;
            $(this).removeAttr('class');
            var row = $(this);
            if (!($(row).attr('id')=='pTableHeader')) {
              if (dates == "") {
                rubriques.forEach(function (rubrique) {
                  if ($(row).find('.Rubrique').html() == rubrique) {
                     show = true;
                  } else {
                    $(row).attr('class', 'invisibleRow');
                  }
                });
              } else if (rubriques == "") {
                dates.forEach(function (date) {
                  if ($(row).find('.AnneePaye').html() == date) {
                     show = true;
                  } else {
                    $(row).attr('class', 'invisibleRow');
                  }
                });
              } else if (rubriques != "" && dates != "") {
                rubriques.forEach(function (rubrique) {
                  dates.forEach(function (date) {
                    if ($(row).find('.Rubrique').html() == rubrique && $(row).find('.AnneePaye').html() == date) {
                       show = true;
                    } else {
                      $(row).attr('class', 'invisibleRow');
                    }
                  });
                });
              }
            }
            if (show) {
               row.show();
               $(row).attr('class','visibleRow');
            }
        });
        $('#pTableHeader').show();
    }
  });
}

//used in sorttable.js's init function
function initTM() {
  putSpaceCaps();
  dateCheckboxes();
  rubriqueCheckboxes();
}
