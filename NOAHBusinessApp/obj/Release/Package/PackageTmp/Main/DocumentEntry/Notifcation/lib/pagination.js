/*      =================================
**      ==== Simple Table Controller ====
**      =================================
**
**
**          With Pure JavaScript .. 
**   
**
**      No Libraries or Frameworks needed!
**
**
**              fb.com/bastony
**  
*/
var $table, $n, $rowCount, $firstRow, $hasHead, $tr, $i, $ii, $j, $th, $pageCount

function paginate(id){
        // get the table element
        $table = document.getElementById(id)
        // number of rows per page
        $n = 10
        // number of rows of the table
        $rowCount = $table.rows.length
        // get the first cell's tag name (in the first row)
        $firstRow = $table.rows[0].firstElementChild.tagName
        // boolean var to check if table has a head row
        $hasHead = ($firstRow === "TH")
        // an array to hold each row
        $tr = []
        // loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
        $i,$ii,$j = ($hasHead)?1:0
        // holds the first row if it has a (<TH>) & nothing if (<TD>)
        $th = ($hasHead?$table.rows[(0)].outerHTML:"");
        // count the number of pages
        $pageCount = Math.ceil($rowCount / $n);
        // if we had one page only, then we have nothing to do ..
        if ($pageCount > 1) {
            // assign each row outHTML (tag name & innerHTML) to the array
            for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
                $tr[$ii] = $table.rows[$i].outerHTML;
            // create a div block to hold the buttons
            $table.insertAdjacentHTML("afterend","<div id='buttons'></div");
            // the first sort, default page is the first one
            sort(1);
        }
}

// ($p) is the selected page number. it will be generated when a user clicks a button
function sort($p) {
    /* create ($rows) a variable to hold the group of rows
    ** to be displayed on the selected page,
    ** ($s) the start point .. the first row in each page, Do The Math
    */
    var $rows = $th,$s = (($n * $p)-$n);
    for ($i = $s; $i < ($s+$n) && $i < $tr.length; $i++)
        $rows += $tr[$i];
    
    // now the table has a processed group of rows ..
    $table.innerHTML = $rows;
    // create the pagination buttons
    document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
    // CSS Stuff
    var element = document.getElementById("id" + $p)
    element.classList.add("active");
}


// ($pCount) : number of pages,($cur) : current page, the selected one ..
function pageButtons($pCount,$cur) {
    /* this variables will disable the "Prev" button on 1st page
       and "next" button on the last one */
    var str = $cur >= 3 ? ($cur - 2): 1
    var ed = $cur >= 3 ? (($cur + 2) > $pCount ? $pCount : ($cur + 2)) : (5 > $pCount ? $pCount : 5 )
    var $prevDis = ($cur == 1)?"disabled":"",
        $nextDis = ($cur == $pCount) ? "disabled" : "",
        $firstDis = ($cur == 1) ? "disabled" : "",
        $lastDis = ($cur == $pCount) ? "disabled" : "",
        /* this ($buttons) will hold every single button needed
        ** it will creates each button and sets the onclick attribute
        ** to the "sort" function with a special ($p) number..
        */
    $buttons = "<input type='button' class='buttonsClass' value='&lt;&lt; First' onclick='sort(" + 1 + ")'  class='btnFirst' " + $firstDis + ">";
    $buttons += "<input type='button' class='buttonsClass' value='&lt; Prev' onclick='sort(" + ($cur - 1) + ")'  class='btnPrev' " + $prevDis + ">";

    for ($i = str; $i <= ed; $i++)
        $buttons += "<input type='button' class='buttonsClass' id='id" + $i + "'value='" + $i + "'  class='btnMid' onclick='sort(" + $i + ")'>";


    $buttons += "<input type='button' class='buttonsClass' value='Next &gt;'  class='btnNext' onclick='sort(" + ($cur + 1) + ")' " + $nextDis + ">";
    $buttons += "<input type='button' class='buttonsClass' value='Last &gt;&gt;'  class='btnLast' onclick='sort(" + $pageCount + ")' " + $lastDis + ">";
    return $buttons;
}