function copyTable() {

    //removes the table in case it already exists
    //allows export multiple times in a row
    $("#exportTable").remove();
    var careerTable = document.getElementById('careerTable');
    var exportTable = careerTable.cloneNode(true);
    exportTable.id = 'exportTable';
    document.body.appendChild(exportTable);
    $('#exportTable').css("display","none");
    $("#exportTable tr:not([class='visibleRow'], [id ='tableHeader'])").remove();
}

//maybe do 3 exports, 1 for each tab idk
//bah dis ça marche que pour Shrome tiens
//prend pas en compte quand genre y a des filtres qu'on été appliqués
function excelExport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;

    //removes the table in case it already exists
    //allows export multiple times in a row
    $("#exportTable").remove();

    //creates an hidden table based on the original
    //this one will contain the filtered rows
    var careerTable = document.getElementById('careerTable');
    var exportTable = careerTable.cloneNode(true);
    exportTable.id = 'exportTable';
    document.body.appendChild(exportTable);
    $('#exportTable').css("display","none");
    $("#exportTable tr:not([class='visibleRow'], [id ='tableHeader'])").remove();

    tab = document.getElementById('exportTable'); // id of table

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
//see SIMILE

//generates checkboxes for each year
function dateCheckboxes() {
  var dates = [];

  $(".DateDebut, .DateFin").each(function () {
    dates.push($(this).text().substr(6));
  });

  let uniqueDates = [...new Set(dates)];
  uniqueDates.sort();

  for (i=0; i<uniqueDates.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = uniqueDates[i];
    checkbox.value = uniqueDates[i];
    checkbox.id = "cb" + uniqueDates[i];
    //checkbox.class = ??

    var label = document.createElement('label')
    label.htmlFor = "cb" + uniqueDates[i];
    label.appendChild(document.createTextNode(uniqueDates[i]));

    $("#career").append(checkbox);
    $("#career").append(label);
  }
}

//sort by date
//va peut être falloir filtrer en fonction de si on veut les datesdebut ou datesfin
//c'est pas cooool ça marche pas quand on décoche lààààààà

/*genre là faut pouvoir faire en sorte de faire réapparaître les trucs quand ça se décoche
et aussi de pouvoir appliquer plusieurs filtres
genre quand y a deux cases de cochées ça affiche les résultats correspondant
mais genre ça a l'air chaud déjà je galère pas mal là
va falloir stocker les label de toutes les cases cochée
puis parcourir l'array de labels pour voir si y a pas des lignes qui correspondent*/
function hideRows() {
  //var matchingLines = [];
  var date;
  //vérifier plûtot si cochée où pas peut-être jsp
  $("input[type='checkbox']").click(function() {
    if ($(this).checked) {
      //refreshes
      $(".invisibleRow").attr("style", " ");
    } else {
      date = $(this).next("label").html();
      $(".DateDebut").each(function () {
        if ($(this).text().substr(6) == date) {
          $(this).parent().attr("class", "visibleRow");
        }
      });
      $(".DateFin").each(function () {
        if ($(this).text().substr(6) == date) {
          $(this).parent().attr("class", "visibleRow");
        }
      });

      //hide lines in the table that don't have the right date and are not the head line
      $("#careerTable tr:not([class='visibleRow'], [id ='tableHeader'])").attr("class", "invisibleRow");
      $(".invisibleRow").css("display", "none");
    }
  });
}


function init() {
  putSpaceCaps();
  dateCheckboxes();
  hideRows();
}
