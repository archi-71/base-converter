$(document).ready(function() {
    $("#digits").on('input', convert);
    $("#to").change(function() {
        $("#to").val(Math.max(2, Math.min(36, parseInt($("#to").val() || 0))));
        convert();
    });
    $("#to").on('input', function() {
        $("#otherTo").prop("checked", true);
        convert();
    });
    $("#from").change(function() {
        $("#from").val(Math.max(2, Math.min(36, parseInt($("#from").val() || 0))));
        convert();
    })
    $("#from").on('input', function() {
        $("#otherFrom").prop("checked", true);
        convert();
    });
    $("input[name='from']").on('input', convert);
    $("input[name='to']").on('input', convert);
    $("#swap").click(swap);
    convert();
})

function getBase(str, other) {
    switch (str) {
        case "binary":
            return 2;
        case "octal":
            return 8;
        case "decimal":
            return 10;
        case "hexadecimal":
            return 16;
        default:
            return parseInt(other.val(), 10)
    }
}

function numToChar(num) {
    if (num < 10) {
        return num.toString();
    }
    else {
        return String.fromCharCode(55 + num)
    }
}

function charToNum(char) {
    if (!alphanumeric(char)) {
        return null;
    }
    if (char >= '0' && char <= '9') {
        return parseInt(char, 10);
    }
    else {
        return char.toUpperCase().charCodeAt() - 55
    }
}

function alphanumeric(char) {
    code = char.charCodeAt();
    if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123)) {
        return false;
    }
    return true;
}

function convert() {
    let digits = $("#digits").val();
    let from = getBase($("input[name='from']:checked").val(), $("#from"));
    let to = getBase($("input[name='to']:checked").val(), $("#to"));
    if (from > 36 || to > 36) {
        $("#result").empty();
        $("#error").html("Error: Bases beyond 36 are not supported.");
        return;
    }
    let num = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = charToNum(digits.charAt(i));
        if (digit == null || digit < 0 || digit >= from) {
            $("#result").empty();
            $("#error").html(`Error: Invalid base ${from} number.`);
            return;
        }
        num = from * num + charToNum(digits.charAt(i));
    }
    result = "";
    while (num > 0) {
        result = numToChar(num % to) + result
        
        num = Math.floor(num / to);
    }
    $("#result").html(result);
    $("#error").empty();
}

function swap() {
    let oldFrom = $("input[name='from']:checked").val();
    let oldTo = $("input[name='to']:checked").val();
    $("input[name='from']:checked").prop("checked", false);
    $(`#${oldTo}From`).prop("checked", true);
    $("input[name='to']:checked").prop("checked", false);
    $(`#${oldFrom}To`).prop("checked", true);

    let temp = $("#from").val();
    $("#from").val($("#to").val());
    $("#to").val(temp);

    $("#digits").val($("#result").html());
    convert();
}