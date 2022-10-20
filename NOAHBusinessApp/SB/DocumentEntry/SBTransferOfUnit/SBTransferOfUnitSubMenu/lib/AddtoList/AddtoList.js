
$(function ($) {

    $.fn.loadAddtoList = function (opts) {
        var def = $.extend({
            id: this.attr("id"),
            list: ["List Name"],
            icon: false
        }, opts);

        return this.each(function () {
            let $this = $(this);
            let ul = document.createElement("ul");

            $this.addClass('tabContainer');

            $.each(def.list, function (k, v) {
                k++;
                let id = def.id + 'But-' + k;
                let li = document.createElement('li');
                let a = document.createElement('a');
                let n = document.createTextNode(v);

                a.appendChild(n);
                a.setAttribute('href', '#' + (id || '').replace('But', ''));
                li.id = id;

                li.appendChild(a);
                ul.appendChild(li);
            });

            $this.append(ul);

            $.each(def.list, function (k, v) {
                k++;
                let id = def.id + '-' + k;
                let val = v.replace(/[^a-zA-Z0-9]/g, '') || '';
                let atl = 'atl_' + val;
                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                let div3 = document.createElement('div');
                let btnAdd = document.createElement('button');
                let btnClear = document.createElement('button');
                let i1 = document.createElement('i');
                let i2 = document.createElement('i');
                let n1 = document.createTextNode(" Add to List");
                let n2 = document.createTextNode(" Clear List");

                div1.id = id;
                div2.classList.add('atlContainer', atl);
                div2.setAttribute("nwtype", val);
                div3.className = 'innertext';

                btnAdd.id = "btn" + val + "_AddToList";
                btnAdd.setAttribute('type', 'button');
                btnAdd.setAttribute("nwtype", val);
                btnAdd.className = 'btnGetlookup';

                btnClear.id = "btn" + val + "_ClearList";
                btnClear.setAttribute('type', 'button');
                btnClear.className = 'btnClearList';

                if (def.icon) {
                    i1.classList.add('fas', 'fa-plus-circle');
                    i2.classList.add('fas', 'fa-minus-circle');
                }

                btnAdd.appendChild(i1);
                btnAdd.appendChild(n1);

                btnClear.appendChild(i2);
                btnClear.appendChild(n2);

                div2.appendChild(div3);
                div1.appendChild(btnAdd);
                div1.appendChild(btnClear);
                div1.appendChild(div2);

                $this.append(div1);
            });

            $this.tabs({ active: 0 });
        });
    };

}(jQuery));


function $t() {
    let $t = {
        /* use on func_Reload */
        onReload: function () {
            $t.onClickEvent.btnAdd();
            $t.onClickEvent.btnClear();
        },
        /* selector */
        selector: {
            btnAdd: $("button.btnGetlookup"),
            btnClear: $("button.btnClearList"),
            removeList: $("span.classx")
        },
        /* event function */
        onClickEvent: {
            btnAdd: function () {
                $t.selector.btnAdd.click(function () {
                    crnwTableCon = null; // if grid is click 
                    var xtype = $(this).attr('nwtype');
                    var selectedInput = xtype;
                    lookUpCustomize(selectedInput, 1);
                });
            },

            btnClear: function () {
                $t.selector.btnClear.click(function () {
                    crnwTableCon = null; // if grid is click 
                    $(this).siblings(".atlContainer").find(".innertext .spantext").remove();
                });
            }
        },
        /* remove list */
        remove: function (t) { $(t).closest('div.spantext').remove(); },
        /* send to bl get add to list filters */
        getAddtoListFilters: function () {
            let delimeter = "||";
            $.each($('div.atlContainer'), function (k, v) {
                let key = $(v).attr("nwtype");
                let value = "";

                $.each($(v).find('div.spantext'), function (k, v) {
                    if (value !== "") value += delimeter;
                    value += $(v).attr("nwcode");
                });
                nwParameter_Add(key, value);
            });
        },
        /* display add to list data */
        displayAddtoListData: function (k, v) {
            return `<div class="spantext" nwcode='${k}' style="display: inline-block; margin: 0px 3px 3px 0px;">${v}<span class="classx" onclick='$t().remove(this)'>x</span>`;
        },
        /*add to list done custom */
        addtoListDone: function (id, $this, i) {
            let arrID = [];

            $.each($('div.atlContainer'), function (k, v) {
                arrID.push($(v).attr("nwtype"));
            });

            $.each(arrID, function (k, v) {
                if (id === v) {
                    let key = "";
                    let value = "";

                    key = $this.find(`tr:eq(${i}) td:eq(1)`).text();
                    value = $this.find(`tr:eq(${i}) td:eq(2)`).text() || key;

                    if ($(`div.atlContainer[nwtype='${id}']`).find(`div.spantext[nwcode='${key}']`).length < 1) {
                        $(`div.atlContainer[nwtype='${id}'] div.innertext`).append($t.displayAddtoListData(key, value));
                    }
                }
            });
        }
    };

    return $t;
};





