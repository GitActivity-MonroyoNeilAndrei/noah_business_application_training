$(document).ready(function () {

    $(".open-button").click(function () {
        $("#myForm").css("display", "block");
    });

    $(".nk-minimize").click(function () {
        $("#myForm").css("display", "none");
    });

    $(".person").click(function () {
        $("#right-container").css("display", "block");
    });

    $(".nk-exit").click(function () {
        $("#right-container").css("display", "none");
    });

    $("#opt-chat").click(function () {
        $("#nk-right-opt").css("display", "block");
    });
    $("#opt-chat-hdr").click(function () {
        $("#nk-left-hdr-opt").css("display", "block");
    });
    $("#nk-right-opt").mouseleave(function () {
        $(this).css("display", "none");
    });

    $("#opt-chat-hdr").click(function () {
        $("#nk-left-hdr-opt").css("display", "block");
    });

    $("#nk-left-hdr-opt").mouseleave(function () {
        $(this).css("display", "none");
    });

    $(".search").click(function () {
        $("#nk-sub-hdr-opt").css("display", "block");
    });

    $("#nk-sub-hdr-opt").mouseleave(function () {
        $(this).css("display", "none");
    });

});

$(document).ready(function () {
    function showDropCnt(event) {
        event.stopPropagation();
        hideAllDropCntOpts();
        $(event.currentTarget).find(".nk-opt-conv").show();
    }

    function hideDropCntOpt(event) {
        event.stopPropagation();
        $(event.currentTarget).hide();
    }

    function hideAllDropCntOpts() {
        $(".nk-opt-conv").hide();
    }

    $(document).on("click", function () {
        hideAllDropCntOpts();
    });

    const responses = [
        "Hi, how are you?",
        "I'm good, thank you!",
        "What are you up to?",
        "Have a great day!",
        "Tell me more!",
        "That's interesting!",
        "Nice to hear that!",
        "Can you elaborate?"
    ];

    function sendMessage() {
        var message = $('#chatInput').val().trim();
        if (message !== "") {
            appendMessage('ks-self', '/DemoModule/DocumentEntry/Demo/Media/icons/_overview/user-profile-from-freepik-photo.png', 'You', message);
            $('#chatInput').val('');
            setTimeout(sendReply, 1000);
        }
    }

    function sendReply() {
        var randomResponse = responses[Math.floor(Math.random() * responses.length)];
        appendMessage('ks-sender', '../../Media/images/bg-theme/random/avatar-icon-aa', 'Louis CK', randomResponse);
    }

    function appendMessage(senderClass, avatarUrl, name, message) {
        var newMessageItem = `
            <li class="ks-item ${senderClass}">
                <span class="ks-avatar ks-offline">
                    <img src="${avatarUrl}" width="36" height="36" class="rounded-circle">
                </span>
                <div class="ks-body">
                    <div class="ks-header">
                        <span class="ks-name">${name}</span>
                        <span class="ks-datetime">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div class="ks-message">${message}</div>
                </div>
            </li>
        `;
        $('.chat-items').append(newMessageItem);
        $('.chat-bx-body').scrollTop($('.chat-bx-body')[0].scrollHeight);
    }

    $('.nk-send').on("click", function () {
        sendMessage();
    });

    $(document).on('click', '.nk-options', function (event) {
        showDropCnt(event);
    });

    $(document).on('mouseleave', '.nk-opt-conv', function (event) {
        hideDropCntOpt(event);
    });
});
