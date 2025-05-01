
(function ($) {
    "use strict";

    var $doc = $(document),
		$body = $('body');

    $(document).ready(function () {
        fnAutoExpandTextareaHeight();
    });

    setTimeout(function () {
        $("._new .btnStyle").each(function (i) {
            $(this).css({
                "animation-delay": (0.30 * (i)) + "s",
                "display": "inline-block",
            });
        });
    }, 2600, clearTimeout);

    function fnAutoExpandTextareaHeight() {
        $doc.find(".editable.clrTxt._autoresize").each(function () {
            var $this = $(this);
            $this.css({
                "min-height": $this.css("height"),
                "overflow": "auto",
            });
        }).on('input paste', function () {
            var $this = $(this), offset = $this.innerHeight() - $this.height();

            // Expand textarea if scroll height is smaller
            if ($this.innerHeight < this.scrollHeight) {
                $this.height(this.scrollHeight - offset);
            }
            else {
                $this.height(1);
                $this.height(this.scrollHeight - offset);
            }
        });
    }

})(jQuery);