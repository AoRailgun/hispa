function fnExcelReport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('careerTable'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++)
    {
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"export.xls");
        return (sa);
    }
    else                 //other browser not tested on IE 11
        //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
        var link = document.createElement("a");
        //maybe change name depending on variables idk
        link.download = "export.xls";
        link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
        link.click();
}

//puts a space before each capital letter
function putSpaceCaps() {
    var text;
    var beginText;
    var endText;

    $('.table th').each(function() {
      text = $(this).text();
      for (i=1; i<$(this).text().length; i++) {
        if (text[i] == text[i].toUpperCase()) {
          beginText = text.substr(0, i);
          endText = text.substr(i, text.length);
          text = beginText + ' ' + endText;
        }
      }
      $(this).text(text);
    });
}

//do the tri by date with the cases à cocher and by order of the column et tout là
