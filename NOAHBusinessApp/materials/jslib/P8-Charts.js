/*
This file are only limited to Promptus8 and Noah Web Application only
under company: Forecasting and Planning Technologies Inc.
Developer: Danielle P. Dignadice

Date Modification Created : June 20 2018   
Date Modified : March 12, 2019 / 05:10 PM  - before: 06-20-2018 
Version: P8-Objects Library 1.0.2    

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/

//Generic Variables
var PI = Math.PI;
var i, ic, j;

var option = {};
var optionH = {}; // Option Header
var optionF = {}; // Option Footer
var optionLL = {}; // Option Label Left
var optionLR = {}; // Option Label Right
var optionLabelFont = {};
var optionLegendFont = {};
var optionGridLine = {};
var optionMeasureLeft = {};
var optionMeasureRight = {};
var element = {};
var percent = 0;
var format;
var month = "January February March April May June July August September October November December".split(" ");
var day = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");

function numdigit(num, digit) {
    var q = !1; 0 > num && (q = !0, num *= -1); num = "" + num; for (digit = digit ? digit : 1; num.length < digit;) num = "0" + num; return q ? "-" + num : num
}

function TimeDateElement(input, format) {
    var az = /D{1,4}|M{1,4}|y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}/g;
    //var AZ = /[^-+\dA-Z]/g;
    var year = input.getFullYear();
    var months = input.getMonth();
    var date = numdigit(input.getDate(), 2);
    var days = input.getDay();
    var hours = input.getHours();
    var minutes = numdigit(input.getMinutes(), 2);
    var seconds = numdigit(input.getSeconds(), 2);
    var AMPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return month[months].slice(0, 3) + " " + date + ", " + year + "<br>" + hours + ":" + minutes + ":" + seconds + " " + AMPM;
}

function TimeDateLabel(input, format) {
    var az = /D{1,4}|M{1,4}|y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;
    //var AZ = /[^-+\dA-Z]/g;
    var year = input.getFullYear();
    var months = input.getMonth();
    var date = input.getDate();
    var days = input.getDay();
    var hours = input.getHours();
    var minutes = input.getMinutes();
    var seconds = input.getSeconds();
    return format = format.replace(
        az, function (c) {
            switch (c) {
                case "D": return date;
                case "DD": return numdigit(date, 2);
                case "DDD": return day[days].slice(0, 3);
                case "DDDD": return day[days];
                case "M": return months + 1;
                case "MM": return numdigit(months + 1, 2);
                case "MMM": return month[months].slice(0, 3);
                case "MMMM": return month[months];
                case "y": return parseInt(String(year).slice(-2));
                case "yy": return numdigit(String(year).slice(-2), 2);
                case "yyy": return numdigit(String(year).slice(-3), 3);
                case "yyyy": return year;
                case "H": return hours;
                case "HH": return numdigit(hours, 2);
                case "h": return hours % 12 || 12;
                case "hh": return numdigit(hours % 12 || 12, 2);
                case "m": return minutes;
                case "mm": return numdigit(minutes, 2);
                case "s": return seconds;
                case "ss": return numdigit(seconds, 2);
                case "T": return 12 > hours ? 'A' : 'P';
                case "TT": return 12 > hours ? 'AM' : 'PM';
                case "t": return 12 > hours ? 'a' : 'p';
                case "tt": return 12 > hours ? 'am' : 'pm';
                default: return c.slice(1, c.length - 1);
            }
        })
}

var percentanimation;

var Clabeltext, Clabelfontweight, Clabelfontsize, Clabelfontfamily, Clabelfontstyle, Clabelrotate, Clabelalign, Clabelbaseline, Clabelcolor, ClabelX, ClabelY;

requestAnimFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (f) { return setTimeout(f, 1000 / 60) };
cancelAnimFrame = window.cancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || function (requestID) { clearTimeout(requestID) }; //fall back

//Element by ID
function elementID(canvasID) {
    return document.getElementById(canvasID);
}

//Create Canvas
function Canvas(canvasID) {
    return elementID(canvasID).getContext("2d");
}

//Text Display
function TextDisplay(text, x, y, rotate, color, align, baseline, ctx) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(rotate * PI / 180);
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

function MaxArrayText(array, font, ctx) {
    Font(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle, ctx);
    var arrayname = []
    for (var i = 0; i < array.length; i++) arrayname.push(ctx.measureText(array[i].name).width);
    return Math.max(...arrayname);
}

function MaxArrayLabel(array, font, ctx) {
    Font(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle, ctx);
    var arrayname = []
    for (var i = 0; i < array.length; i++) arrayname.push(ctx.measureText(array[i].label).width);
    return Math.max(...arrayname);
}

//Number Sorting
function sortNumber(a, b) {
    return a - b;
}

//shadow
function shadowset(setx, sety, blur, color, ctx) {
    ctx.shadowOffsetX = setx;
    ctx.shadowOffsetY = sety;
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
}

//Shape A
function shapeA(x, y, r, side, area, width, fill, stroke, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    area *= 1.25;
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    for (var i = 0; i < side; i++) {
        var step = 2 * PI / side;
        var shift = (PI / 180) * r;
        var curStep = i * step + shift;
        ctx.lineTo(x + area * Math.cos(curStep), y + area * Math.sin(curStep));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.stroke();
}

//Shape B
function shapeB(x, y, area, rotate, point, m, width, fill, stroke, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(PI / rotate);
    ctx.moveTo(0, 0 - area);
    for (var i = 0; i < point; i++) {
        ctx.rotate(PI / point);
        ctx.lineTo(0, 0 - (area * m));
        ctx.rotate(PI / point);
        ctx.lineTo(0, 0 - area);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.stroke();
}

//Shape C
function shapeC(x, y, area, rotate, point, m, width, stroke, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke;
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(PI / rotate);
    ctx.moveTo(0, 0 - area);
    for (var i = 0; i < point; i++) {
        ctx.rotate(PI / point);
        ctx.lineTo(0, 0 - (area * m));
        ctx.rotate(PI / point);
        ctx.lineTo(0, 0 - area);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

//circle
function circle(x, y, r, width, fill, stroke, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.stroke();
}

//rounded square
function roundsquare(x, y, area, radius, width, fill, stroke, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    area *= 1.9;
    x -= (area / 2);
    y -= (area / 2);
    var r = x + area;
    var b = y + area;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + area - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.stroke();
}

//rectangle
function rectangle(x, y, width, height, color, ctx, Xshadow, Yshadow, blurshadow, colorshadow) {
    ctx.save();
    shadowset(Xshadow, Yshadow, blurshadow, colorshadow, ctx);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

//Markers
function Markers(input, x, y, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor) {
    switch (input) {
        case "circle": case "o":
            circle(x, y, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "triangle": case "^":
            shapeA(x, y + 1, 30, 3, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "itriangle": case "v":
            shapeA(x, y - 1, -30, 3, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "ltriangle": case "<":
            shapeA(x, y, -60, 3, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "rtriangle": case ">":
            shapeA(x, y, 0, 3, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "diamond": case "<>":
            shapeA(x, y, 0, 4, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "square": case "[]":
            shapeA(x, y, 45, 4, area, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "roundsquare":
            roundsquare(x, y, area, area / 4, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "cross": case "x": case "X":
            shapeC(x, y, area + 1, 4, 4, 0, width, fill, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "plus": case "+":
            shapeC(x, y, area, 0, 4, 0, width, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "star":
            shapeB(x, y, area * 1.25, 0, 5, 0.5, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "pentagon": case "5":
            shapeA(x, y, -18, 5, area / 1.25, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "hexagon": case "6":
            shapeA(x, y, 0, 6, area / 1.25, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "octagon": case "8":
            shapeA(x, y, 22.5, 8, area / 1.25, width, fill, stroke, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "asterisk":
            shapeC(x, y, area + 1, 0, 8, 0, width, fill, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        case "*":
            shapeC(x, y, area + 1, 0, 8, 0, width, fill, ctx, shadowX, shadowY, shadowBlur, shadowColor); break
        default: null
    }
}

//Line
function Line(xa, ya, xb, yb, width, color, ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
    ctx.stroke();
    ctx.restore();
}

//Get Cursor Position
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {
        x: x,
        y: y
    }
}

//Font
function Font(fontsize, fontweight, fontfamily, fontstyle, ctx) {
    ctx.font = fontstyle + ' ' + fontweight + ' ' + (fontsize | 0) + 'px ' + fontfamily;
}

//Clear Canvas
function clear(width, height, ctx) {
    ctx.clearRect(0, 0, width, height);
}

function bground(width, height, color, ctx) {
    //background color
    clear(width, height, ctx);
    rectangle(0, 0, width, height, color, ctx, 0, 0, 0, 'rgba(0,0,0,0)');
}

function convert(value) {
    var T = (value / 1E12) + "T";
    var B = (value / 1E9) + "B";
    var M = (value / 1E6) + "M";
    var k = (value / 1E3) + "k";
    var d = value;
    return value = (value >= 1E12) ? T
        : (value >= 1E9) ? B
        : (value >= 1E6) ? M
        : (value >= 1E3) ? k
        : (value <= -1E12) ? T
        : (value <= -1E9) ? B
        : (value <= -1E6) ? M
        : (value <= -1E3) ? k
        : (value > -1E3) ? d
        : d; //if (value < 1E3)
}

function random(value) {
    return Math.floor(Math.random() * ((value * 2) + 1)) - value;
}

//color function
function rgba(r, g, b, a) {
    if (a > 1) a = 1;
    if (a < 0) a = 0;
    return 'rgba(' + r + ',' + g + ', ' + b + ', ' + a + ')'
}

//Gradient Up or Down
function GradientV(y, width, height, input, ctx, reverse) {
    var ya, yb;
    if (reverse == undefined) reverse = false;
    if (reverse == true) ya = y + height, yb = y; //up
    else ya = y, yb = y + height; //down
    grd = ctx.createLinearGradient(width / 2, ya, width / 2, yb)
    for (i = 0; i < input.length; i++) {
        var g = input[i].stop;
        if (input[i].stop == undefined) g = i / (input.length - 1);
        grd.addColorStop(g, input[i].color);
    }
    return grd;
}

//Gradient Left or Right
function GradientH(x, width, height, input, ctx, reverse) {
    var xa, xb;
    if (reverse == undefined) reverse = false;
    if (reverse == true) xa = x + width, xb = x; //left
    else xa = x, xb = x + width; //right
    grd = ctx.createLinearGradient(xa, height / 2, xb, height / 2)
    for (i = 0; i < input.length; i++) {
        var g = input[i].stop;
        if (input[i].stop == undefined) g = i / (input.length - 1);
        grd.addColorStop(g, input[i].color);
    }
    return grd;
}

//Radial Gradient
function GradientCircle(xA, yA, rA, xB, yB, rB, input, ctx) {
    var grd = ctx.createRadialGradient(xA, yA, rA, xB, yB, rB);
    for (i = 0; i < input.length; i++) {
        var g = input[i].stop;
        if (input[i].stop == undefined) g = i / (input.length - 1);
        grd.addColorStop(g, input[i].color);
    }
    return grd;
}

//Vertical Bar and Line Chart
var P8 = P8 || {};
P8.Chart = function (canvasID) {

    var size = {
        width: 660
        , height: 400
    }

    var duration = {
        xaxis: 4
        , yaxis: 10
        , interval: 10
    }

    var data = [];

    var xaxis = [];

    xaxis.push({ label: "Item1" });
    xaxis.push({ label: "Item2" });
    xaxis.push({ label: "Item3" });
    xaxis.push({ label: "Item4" });

    data.push({ id: 0, value: 10, color: "red" });
    data.push({ id: 1, value: 20, color: "blue" });
    data.push({ id: 2, value: 30, color: "yellow" });
    data.push({ id: 3, value: 40, color: "green" });

    var ObjectData = [];
    ObjectData.push({ name: "Item", fillcolor: "orange", filltype: "color" });

    var background = 'rgba(0,0,0,0)'; //transparent
    var animation = undefined;
    var legendposition = undefined;

    //Grid Line Option
    optionGridLine = {
        color: "Black"
        , width: 1
    };
    //Measurement Left Option
    optionMeasureLeft = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , textdirection: "off"
        , display: true
    };
    //Measurement Right Option
    optionMeasureRight = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , textdirection: "off"
        , display: true
    };
    //Header Option
    optionH = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Sample Chart"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Footer Option
    optionF = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Footer"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Label Left Option
    optionLL = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Left"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Label Right Option
    optionLR = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Right"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Label Font Option
    optionLabelFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , rotate: 0 //number of degrees
        , display: true
        , align: "center"
    };
    //Legend Font Option
    optionLegendFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Shadow Option
    var shadow = {
        x: 0
        , y: 0
        , blur: 0
        , color: "black"
    }
    option = {
        canvasID: canvasID
        , duration: duration
        , data: data
        , xaxis: xaxis
        , ObjectData: ObjectData
        , header: optionH
        , footer: optionF
        , labelleft: optionLL
        , labelright: optionLR
        , labelfont: optionLabelFont
        , measureleft: optionMeasureLeft
        , measureright: optionMeasureRight
        , legendfont: optionLegendFont
        , gridline: optionGridLine
        , background: background
        , animation: animation
        , shadow: shadow
        , size: size
        , legendposition: legendposition
    };
    this.option = option;
};
P8.Chart.prototype.SetOption = function (option) {
    this.option = option;
};
P8.Chart.prototype.SetHeader = function (header) {
    this.option.header = header;
};
P8.Chart.prototype.SetFooter = function (footer) {
    this.option.footer = footer;
};
P8.Chart.prototype.SetLabelLeft = function (labelleft) {
    this.option.labelleft = labelleft;
};
P8.Chart.prototype.SetLabelRight = function (labelright) {
    this.option.labelright = labelright;
};
P8.Chart.prototype.SetDuration = function (duration) {
    this.option.duration = duration;
};
P8.Chart.prototype.SetData = function (data) {
    this.option.data = data;
};
P8.Chart.prototype.SetXAxis = function (xaxis) {
    this.option.xaxis = xaxis;
};
P8.Chart.prototype.SetLabelFont = function (labelfont) {
    this.option.labelfont = labelfont;
};
P8.Chart.prototype.SetMeasureLeft = function (measureleft) {
    this.option.measureleft = measureleft;
};
P8.Chart.prototype.SetMeasureRight = function (measureright) {
    this.option.measureright = measureright;
};
P8.Chart.prototype.SetGridLine = function (gridline) {
    this.option.gridline = gridline;
};
P8.Chart.prototype.SetLegendFont = function (legendfont) {
    this.option.legendfont = legendfont;
};
P8.Chart.prototype.SetObject = function (ObjectData) {
    this.option.ObjectData = ObjectData;
};
P8.Chart.prototype.SetBackground = function (background) {
    this.option.background = background;
};
P8.Chart.prototype.SetAnimation = function (animation) {
    this.option.animation = animation;
};
P8.Chart.prototype.SetSize = function (size) {
    this.option.size = size;
};
P8.Chart.prototype.SetShadow = function (shadow) {
    this.option.shadow = shadow;
};
P8.Chart.prototype.SetLegendPosition = function (legendposition) {
    this.option.legendposition = legendposition;
};
P8.Chart.prototype.Render = function () {
    CreateChart(this.option);
};

//start of create canvas
function CreateChart(option) {
    var canvasIDcon = option.canvasID;
    var canvasID = option.canvasID + "_canvas";

    var elementcanvas = elementID(canvasID);

    if (elementcanvas == undefined) {

        var element = elementID(canvasIDcon);

        var para = document.createElement("div");
        para.id = canvasIDcon + "_hover";
        element.appendChild(para);

        var para = document.createElement("canvas");
        para.id = canvasID;
        para.width = option.size.width;
        para.height = option.size.height;
        para.style.backgroundColor = option.background;
        //para.style.backgroundImage  = "linear-gradient(red,yellow,green)";
        para.style.borderStyle = "solid";
        para.style.borderColor = "black";
        para.style.borderWidth = "1px";
        element.appendChild(para);
    }

    var ctx = Canvas(canvasID);
    var conw = option.size.width;//660 default number
    var conh = option.size.height;//400 default number
    var centerX = Math.round((conw / 2) * 1.211);
    var centerY = conh / 2;
    var center = centerX + centerY;
    var b, w;

    var elementlist = [];

    var duration = option.duration;
    var data = option.data;
    var xaxis = option.xaxis;
    var ObjectData = option.ObjectData;
    var gridline = option.gridline;
    var measureleft = option.measureleft;
    var measureright = option.measureright;
    var legendfont = option.legendfont;
    var labelfont = option.labelfont;
    var animation = option.animation
    var shadow = option.shadow;
    var background = option.background;
    var legendposition = option.legendposition;

    if (legendposition == undefined) legendposition = "none";
    var xmeasure = duration.xaxis;

    //X
    //multiple vertical lines
    /*var vline;
    var lineheight = Math.round(ynumbase * 0.092);//40
    var yline = duration.xaxis;

    //horizontal line
    var hmovex = Math.round(conw * 0.0833);  //55
    var hline = Math.round(conw * 0.916); //605
    var hposition = Math.round(conh * 0.83); //415

    //checking max and min
    var XaddB;
    var maxY = 0;
    var minY = 0;
    for (var ic = 1; ic <= ObjectData.length; ic++) {
        for (i = 0; i < data.length; i++) {
            valuey = (-1 * data[i][Object.keys(data[i])[ic]]);
            if (valuey >= maxY) maxY = valuey;
            if (valuey <= minY) minY = valuey;
        }
    }
    var WCanvas = hline - hmovex;
    var totalY = Math.abs(maxY) + Math.abs(minY);
    var tmptotalY = totalY;
    var ynumbercounter = 0;
    var ydivisor = 10;
    var ytotdivisor = 1;

    while (tmptotalY > ydivisor) {
        tmptotalY /= ydivisor;
        ynumbercounter++;
        if (ynumbercounter > 1) totdivisor *= ydivisor;
    }
    tmptotalY = parseInt(tmptotalY) + 1;
    for (var i = 1; i <= ynumbercounter; i++)
        tmptotalY = parseInt(tmptotalY) * (ydivisor);

    totalY = tmptotalY;
    var ratioY = (WCanvas / totalY);

    var numy = totalY / yline;

    //get perline width
    vline = (WCanvas / yline)

    //compute for origin
    XaddB = WCanvas * (Math.abs(maxY) / totalY);
    XaddB += hmovex;
    var Xbase = XaddB;

    var Yorigin = Math.round(conh * 0.08); //40
    //var xlabelbase = Math.round(conw * 0.08); //53
    var addH = 1;

    //graph and labels
    var heightC = YCanvas - lineheight;

    var heightCperY = YCanvas - lineheight;
    heightCperY /= data.length;

    heightC /= ObjectData.length;
    heightC /= data.length;
    h = heightC;*/

    //Y
    var xnumbase, numbaseB;

    //vertical line
    var vmovey;
    var vposition;
    var YaddB; // where the drawing start

    for (i = 0; i < ObjectData.length; i++) {
        var linededuct;
        if (ObjectData[i].charttype == "line") linededuct = 8;
        else if (ObjectData[i].charttype == "line") linededuct = 12;
    }

    switch (legendposition) {
        case "top":
            vmovey = 60; //40
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
            break
        case "bottom":
            vmovey = 40;
            vposition = conh - 80; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
            break
        case "left":
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 55 + MaxArrayText(ObjectData, legendfont, ctx);
            numbaseB = conw - 42; //default
            break
        case "right":
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - (55 + MaxArrayText(ObjectData, legendfont, ctx));
            break
        default:
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
    }

    var Xorigin = xnumbase + 4;
    var XCanvas = numbaseB;//conw - 42; //620

    //multiple horizontal lines
    var hline;
    var linelength = xnumbase + 1; //43
    var xline = duration.yaxis;

    var vline = xnumbase + 1; //43

    //checking max and min
    var maxX = 0;
    var minX = 0;
    for (var ic = 1; ic <= ObjectData.length; ic++) {
        for (i = 0; i < data.length; i++) {
            valuex = (data[i][Object.keys(data[i])[ic]]);
            maxX = (valuex > maxX) ? valuex : maxX;
            minX = (valuex < minX) ? valuex : minX;
        }
    }

    var HCanvas = (vposition - vmovey);
    var totalX = Math.abs(maxX) + Math.abs(minX);

    var tmptotalX = totalX;
    var xnumbercounter = 0;
    var xdivisor = xline;
    var totdivisor = 1;

    while (tmptotalX > xdivisor) {
        tmptotalX /= xdivisor;
        xnumbercounter++;
        if (xnumbercounter > 1) totdivisor *= xdivisor;
    }
    tmptotalX = parseInt(tmptotalX) + 1;
    for (var i = 1; i <= xnumbercounter; i++)
        tmptotalX = parseInt(tmptotalX) * (xdivisor);

    totalX = tmptotalX;

    var ratioX = HCanvas / totalX;

    //get perline height
    hline = (HCanvas / xline);

    // compute for origin
    YaddB = HCanvas * (Math.abs(maxX) / totalX);
    YaddB += vmovey;
    var Ybase = YaddB;

    //graph and label
    var ylabelbase = vposition + 12;//330 (for label columns)
    //if (labelfont.align = "center") ylabelbase = (conh - 70) + 5;
    //else if (labelfont.align = "right") ylabelbase = (conh - 70) - 5;
    var addW = 1;

    var widthC = XCanvas - linelength;
    var widthCperX = XCanvas - linelength;
    widthCperX /= duration.xaxis;

    widthC /= ObjectData.length;
    widthC /= data.length;
    w = widthC;

    var numx = totalX / xline;

    //metric
    var metrictotal = 10;
    while (metrictotal < duration.xaxis) {
        metrictotal += 10;
    }
    metricresult = metrictotal;

    if (measureleft.textdirection == undefined) measureleft.textdirection = "off";
    if (measureright.textdirection == undefined) measureright.textdirection = "off";
    if (measureleft.display == undefined) measureleft.display = false;
    if (measureright.display == undefined) measureright.display = false;

    function canvasdrawing() {
        //horizontal lines measurement
        for (var i = 1; i <= xline; i++) {
            var m = (Ybase + hline) - (hline * i);
            if (vmovey > m) break;
            Line(linelength, Math.round(m) + 0.5, XCanvas, Math.round(m) + 0.5, gridline.width, gridline.color, ctx);
        }

        for (var i = 0; i <= xline; i++) {
            var mi = (Ybase + hline) + (hline * i);
            if (vposition < mi & vposition > 10) break;
            Line(linelength, Math.round(mi) + 0.5, XCanvas, Math.round(mi) + 0.5, gridline.width, gridline.color, ctx);
        }

        //vertical line drawing left
        if (measureleft.display == true) Line(Math.round(vline) + 0.5, vmovey, Math.round(vline) + 0.5, vposition, gridline.width, gridline.color, ctx);

        //vertical line drawing right
        if (measureright.display == true) Line(Math.round(XCanvas - 1) + 0.5, vmovey, Math.round(XCanvas - 1) + 0.5, vposition, gridline.width, gridline.color, ctx);
    }//end of canvas drawing

    function canvaslabel() {
        //measurement labels positive
        for (var i = 1; i <= xline; i++) {
            var m = (Ybase + hline) - (hline * i);
            var numA = (numx * i) - numx;
            if (vmovey > m) break;
            //if (vposition < m) break;
            Clabeltext = convert(numA);
            Clabelbaseline = "middle";

            //measure label left
            if (measureleft.display == true) {
                ClabelY = m + Math.ceil(conh * 0.001);
                Clabelfontweight = measureleft.fontWeight;
                Clabelfontsize = measureleft.fontSize;
                Clabelfontfamily = measureleft.fontFamily;
                Clabelcolor = measureleft.color;
                Clabelfontstyle = measureleft.fontStyle;
                if (measureleft.textdirection == "left") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "right") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = 90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "off") {
                    ClabelX = xnumbase;
                    Clabelrotate = 0
                    Clabelalign = "right";
                }
            }
            Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
            TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);

            //measure label right
            if (measureright.display == true) {
                ClabelY = m + Math.ceil(conh * 0.001);
                Clabelfontweight = measureright.fontWeight;
                Clabelfontsize = measureright.fontSize;
                Clabelfontfamily = measureright.fontFamily;
                Clabelcolor = measureright.color;
                Clabelfontstyle = measureright.fontStyle;
                if (measureright.textdirection == "left") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "right") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = 90;
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "off") {
                    ClabelX = numbaseB;
                    Clabelrotate = 0;
                    Clabelalign = "left";
                }
            }
            Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
            TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
        }
        //measure labels negative
        for (var i = 0; i <= xline; i++) {
            var mi = (Ybase + hline) + (hline * i);
            var numB = ((numx * i) + numx) * -1;
            if (vposition < mi & vposition > 10) break;
            //if (vmovey > mi & vmovey < 10) break;
            Clabeltext = convert(numB);
            Clabelbaseline = "middle";

            //measure label left

            if (measureleft.display == true) {
                ClabelY = mi + Math.ceil(conh * 0.001);
                Clabelfontweight = measureleft.fontWeight;
                Clabelfontsize = measureleft.fontSize;
                Clabelfontfamily = measureleft.fontFamily;
                Clabelcolor = measureleft.color;
                Clabelfontstyle = measureleft.fontStyle
                if (measureleft.textdirection == "left") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "right") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = 90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "off") {
                    ClabelX = xnumbase;
                    Clabelrotate = 0
                    Clabelalign = "right";
                }
            }
            Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
            TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);

            //measure label right

            if (measureright.display == true) {
                ClabelY = mi + Math.ceil(conh * 0.001);
                Clabelfontweight = measureright.fontWeight;
                Clabelfontsize = measureright.fontSize;
                Clabelfontfamily = measureright.fontFamily;
                Clabelcolor = measureright.color;
                Clabelfontstyle = measureright.fontStyle;
                if (measureright.textdirection == "left") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "right") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = 90;
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "off") {
                    ClabelX = numbaseB;
                    Clabelrotate = 0;
                    Clabelalign = "left";
                }
            }
            Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
            TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
        }

        //header
        var suboptionH = option.header;
        Font(suboptionH.fontSize, suboptionH.fontWeight, suboptionH.fontFamily, suboptionH.fontStyle, ctx);
        TextDisplay(suboptionH.text, conw / 2, 10, 0, suboptionH.color, "center", "hanging", ctx);

        //footer
        var suboptionF = option.footer;
        Font(suboptionF.fontSize, suboptionF.fontWeight, suboptionF.fontFamily, suboptionF.fontStyle, ctx);
        TextDisplay(suboptionF.text, conw / 2, conh - 10, 0, suboptionF.color, "center", "alphabetic", ctx);

        //labelleft
        var suboptionLL = option.labelleft;
        Font(suboptionLL.fontSize, suboptionLL.fontWeight, suboptionLL.fontFamily, suboptionLL.fontStyle, ctx);
        TextDisplay(suboptionLL.text, 6, Math.round(conh * 0.45), -90, suboptionLL.color, "center", "hanging", ctx);

        //labelright
        var suboptionLR = option.labelright;
        Font(suboptionLR.fontSize, suboptionLR.fontWeight, suboptionLR.fontFamily, suboptionLR.fontStyle, ctx);
        TextDisplay(suboptionLR.text, conw - 5, Math.round(conh * 0.45), 90, suboptionLR.color, "center", "hanging", ctx);

        //label columns
        if (labelfont.display == undefined) labelfont.display = false;
        if (duration.interval == undefined || duration.interval < 0) duration.interval = 1;
        var intervalx = Math.round(duration.interval);

        for (i = 0; i < xmeasure; i++) {
            if (labelfont.display == true) {
                Font(labelfont.fontSize, labelfont.fontWeight, labelfont.fontFamily, labelfont.fontStyle, ctx);
                var labelcanvas, labelx, loopmeasure;
                var labelmeasure = Math.floor((duration.xaxis / intervalx) * (i));
                if (xmeasure > 20) {
                    if (labelmeasure == xmeasure) break;
                    labelcanvas = (xnumbase + 10) + ((Math.ceil(XCanvas - 62) / intervalx) * (i));
                    loopmeasure = labelmeasure;
                }
                else {
                    labelcanvas = (widthCperX / 2) + Xorigin + (widthCperX * i);
                    loopmeasure = i;
                }
                if (duration.format == undefined) duration.format = "num";

                labelx = xaxis[loopmeasure].label;

                if (duration.format == "num") format = convert(parseInt(xaxis[loopmeasure].x));
                else format = TimeDateLabel(xaxis[loopmeasure].x, duration.format);

                if (xaxis[loopmeasure].label == undefined) labelx = format;
                else if (xaxis[loopmeasure].x = undefined && xaxis[loopmeasure].label == undefined) labelx = convert(loopmeasure);
                TextDisplay(labelx, labelcanvas, ylabelbase, labelfont.rotate, labelfont.color, labelfont.align, "middle", ctx);
            }
        }

    }

    function legend() {
        //legend
        for (i = 0; i < ObjectData.length; i++) {
            var ltextX, ltextY, Xmarker, Ymarker, legendX, legendY, XGradient, YGradient, lalign;
            Font(legendfont.fontSize, legendfont.fontWeight, legendfont.fontFamily, legendfont.fontStyle, ctx);
            var textwidth = (ctx.measureText(ObjectData[i].name).width * 0.5);
            var lbase, llength;
            var llineH = conw / ObjectData.length;

            //var lbase = 40; //40
            var lheight = conh * 0.5;
            var llineV = 17;
            lheight -= ((llineV / 2) * ObjectData.length);
            var lcolorheight = lheight + (llineV * i);
            //var lcolorbase = lheight;

            llength = conw * 0.5;
            llength /= ObjectData.length;

            var ltextH = llength + (llineH * i);
            var ltextV = lheight + (llineV * i);

            var lcolorwidth = (llength - (textwidth + 14)) + (llineH * i);

            var linededuct;
            if (ObjectData[i].charttype == "bar") linededuct = 8;
            else if (ObjectData[i].charttype == "line") linededuct = 12;

            switch (legendposition) {
                case "top":
                    ltextX = ltextH;
                    ltextY = 40;
                    Xmarker = lcolorwidth;
                    Ymarker = 40//conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "bottom":
                    ltextX = ltextH;
                    ltextY = conh - 32;
                    Xmarker = lcolorwidth;
                    Ymarker = conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "left":
                    ltextX = 40;
                    ltextY = ltextV;
                    Xmarker = ltextX - linededuct;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
                    break
                case "right":
                    ltextX = conw - (20 + (MaxArrayText(ObjectData, legendfont, ctx)));
                    ltextY = ltextV;
                    Xmarker = ltextX - linededuct;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
            }

            //for markers
            //Xmarker = lcolorwidth;
            //Xmarker = lbase;
            //Ymarker = lbase;//conh - 32;
            var Areamarker = 5;

            var grd;
            var shine;

            if (ObjectData[i].color == undefined) ObjectData[i].color = "black";
            if (ObjectData[i].charttype == undefined) ObjectData[i].charttype = "bar";
            if (ObjectData[i].filltype == undefined) ObjectData[i].filltype = "color";
            if (ObjectData[i].marker == undefined) ObjectData[i].marker = "off";

            if (legendposition != "none") {
                ctx.save();
                //line legend
                if (ObjectData[i].charttype == "line") {
                    var markerwidth, markerfill, markerstroke, markerlinestroke;

                    if (ObjectData[i].style == undefined) ObjectData[i].style = "2d";
                    if (ObjectData[i].filltype == "color" && ObjectData[i].style == "2d") markerfill = ObjectData[i].fillcolor;
                    else if (ObjectData[i].filltype == "gradient" && ObjectData[i].marker == "off") markerfill = ObjectData[i].fillcolor[ObjectData[i].fillcolor.length - 1].color;
                    else if (ObjectData[i].filltype == "gradient") {
                        var grad = [];
                        for (var j = 0; j < ObjectData[i].fillcolor.length; j++) {
                            grad.push({ color: ObjectData[i].fillcolor[j].color, stop: ObjectData[i].fillcolor[j].stop });
                        }
                        markerfill = GradientCircle(XGradient, YGradient, Areamarker / 5, XGradient, YGradient, Areamarker, grad, ctx);
                    }

                    ctx.save();
                    if (ObjectData[i].filltype == "color" && ObjectData[i].style == "2d") markerlinestroke = ObjectData[i].fillcolor;
                    else if (ObjectData[i].filltype == "gradient") markerlinestroke = ObjectData[i].fillcolor[ObjectData[i].fillcolor.length - 1].color;

                    //set line dash
                    if (ObjectData[i].dash == undefined) ObjectData[i].dash = [0];
                    ctx.setLineDash(ObjectData[i].dash);

                    //cap and join
                    if (ObjectData[i].cap == undefined) ObjectData[i].cap = "butt";
                    if (ObjectData[i].join == undefined) ObjectData[i].join = "miter";

                    ctx.lineCap = ObjectData[i].cap;
                    ctx.lineJoin = ObjectData[i].join;

                    Line(Xmarker + 10, Ymarker, Xmarker - 10, Ymarker, 2, markerlinestroke, ctx);
                    //Line(lcolorwidth + 10, llineheight, lwidth, llineheight, 2, markerlinestroke, ctx);
                    ctx.restore();

                    var strokewidth = ObjectData[i].strokewidth
                    if (ObjectData[i].strokewidth > 2) strokewidth = 3;
                    if (ObjectData[i].strokewidth < 0) strokewidth = 1;
                    markerwidth = strokewidth;
                    markerstroke = ObjectData[i].strokecolor;

                    if (ObjectData[i].strokecolor == undefined) {
                        if (ObjectData[i].filltype == "color" && ObjectData[i].style == "2d") markerstroke = ObjectData[i].fillcolor;
                        else if (ObjectData[i].filltype == "gradient") ctx.strokeStyle = markerstroke = ObjectData[i].fillcolor[ObjectData[i].fillcolor.length - 1].color;
                    }

                    ctx.fillStyle = markerfill;
                    ctx.lineWidth = markerwidth;
                    ctx.strokeStyle = markerstroke;
                    Markers(ObjectData[i].marker, Xmarker, Ymarker, Areamarker, markerwidth, markerfill, markerstroke, ctx);
                }

                    //bar legend
                else if (ObjectData[i].charttype = "bar") {
                    var lbarfill;
                    if (ObjectData[i].style == undefined) ObjectData[i].style = "2d";
                    shine = [];
                    shine.push({ color: ObjectData[i].fillcolor, stop: 0 });
                    shine.push({ color: 'white', stop: 0.2 });
                    shine.push({ color: ObjectData[i].fillcolor, stop: 0.6 });
                    if (ObjectData[i].filltype == "gradient") {
                        if (ObjectData[i].gradienttype == undefined) ObjectData[i].gradienttype = "linear A";
                        var grad = [];
                        for (var j = 0; j < ObjectData[i].fillcolor.length; j++) {
                            grad.push({ color: ObjectData[i].fillcolor[j].color, stop: ObjectData[i].fillcolor[j].stop });
                        }

                        switch (ObjectData[i].gradienttype) {
                            case "linear A": lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, true); break
                            case "linear B": lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, false); break
                            case "linear C": lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, true); break
                            case "linear D": lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, false); break
                            default: undefined
                        }

                    }
                    else if (ObjectData[i].filltype == "color" && ObjectData[i].style == "2d") {
                        lbarfill = ObjectData[i].fillcolor;
                    }
                    else if (ObjectData[i].filltype == "color" && ObjectData[i].style == "3d") {
                        lbarfill = GradientH(Xmarker - 5, 6, 6, shine, ctx, false);
                    }
                    shapeA(Xmarker, Ymarker, 45, 4, 6, 0.1, lbarfill, rgba(0, 0, 0, 0), ctx);
                }
                ctx.restore();
                TextDisplay(ObjectData[i].name, ltextX, ltextY, 0, legendfont.color, lalign, "middle", ctx);
            } //end legend position display
        } //end for loop
    } //end function
    //animation
    var a = elementID(canvasID);
    var p8draw = a.getAttribute("p8draw", true);
    var barlineAnimate;
    if (animation == undefined) animation = false;

    if (animation == true) {
        if (p8draw != "true" && p8draw == undefined) {
            requestAnimFrame(animateChart);
        } else {
            percent = 99;
            animateChart();
        }
    }
    else {
        percent = 99;
        animateChart();
    }

    function animateChart() {
        var a = elementID(canvasID);

        if (percent == 100) {
            cancelAnimFrame(barlineAnimate);
            a.setAttribute("p8animate", false);
            a.setAttribute("p8draw", true);
        }
        else {
            if (percent < 100) {
                barlineAnimate = requestAnimFrame(animateChart);
            }
            percent++
            percentanimation = percent / 100;
            clear(conw, conh, ctx);
            //bground(conw, conh, background, ctx);
            canvasdrawing();
            var xaddW = addW;
            ctx.save();
            for (ic = 1; ic <= ObjectData.length; ic++) {
                if (ObjectData[ic - 1].fillcolor == undefined) ObjectData[ic - 1].fillcolor = "black";
                if (ObjectData[ic - 1].charttype == undefined) ObjectData[ic - 1].charttype = "bar";
                if (ObjectData[ic - 1].filltype == undefined) ObjectData[ic - 1].filltype = "color";
                if (ObjectData[ic - 1].style == undefined) ObjectData[ic - 1].style = "2d"
                if (duration.metric == undefined) duration.metric = false;
                //bars
                if (ObjectData[ic - 1].charttype == "bar") {
                    for (i = 0; i < data.length; i++) {
                        var barfill;
                        var datacolor = data[i].color;
                        if (data[i].color == undefined || ic > 1) datacolor = ObjectData[ic - 1].fillcolor;
                        valuex = (-1 * (data[i][Object.keys(data[i])[ic]]));
                        var x;
                        if (xmeasure > 20) x = xaddW + (xnumbase + 5) + ((Math.floor(XCanvas - 52) / duration.xaxis) * i);
                        else x = xaddW + Xorigin + (w * i * (ObjectData.length));
                        var y = YaddB;
                        var width;
                        width = w * 0.9;
                        //if (ObjectData.length > 2) width = w * 0.8;
                        var height = (valuex * ratioX) * percentanimation;

                        if (valuex >= 0) y += 1;

                        //gradient
                        var shine = [];
                        shine.push({ color: datacolor, stop: 0 });
                        shine.push({ color: 'white', stop: 0.2 });
                        shine.push({ color: datacolor, stop: 0.6 });

                        if (ObjectData[ic - 1].filltype == "gradient") {
                            if (ObjectData[ic - 1].gradienttype == undefined) ObjectData[ic - 1].gradienttype = "linear A";
                            var grad = [];
                            for (var j = 0; j < ObjectData[ic - 1].fillcolor.length; j++) {
                                grad.push({ color: ObjectData[ic - 1].fillcolor[j].color, stop: ObjectData[ic - 1].fillcolor[j].stop });
                            }
                            switch (ObjectData[ic - 1].gradienttype) {
                                case "linear A": barfill = GradientV(y, width, height, grad, ctx, false); break
                                case "linear B": barfill = GradientV(y, width, height, grad, ctx, true); break
                                case "linear C": barfill = GradientH(x, width, height, grad, ctx, true); break
                                case "linear D": barfill = GradientH(x, width, height, grad, ctx, false); break
                                default: undefined
                            }
                        }
                        else if (ObjectData[ic - 1].filltype == "color" && ObjectData[ic - 1].style == "2d") {
                            barfill = datacolor;
                        }
                        else if (ObjectData[ic - 1].filltype == "color" && ObjectData[ic - 1].style == "3d") {
                            barfill = GradientH(x, width, height, shine, ctx, false);
                        }

                        rectangle(x, y, width, height, barfill, ctx, 0, 0, 1, "black");

                        Line(linelength, Math.round(YaddB) + 0.5, XCanvas, Math.round(YaddB) + 0.5, gridline.width, gridline.color, ctx);

                        if (duration.format == undefined) duration.format = "num";

                        if (duration.format == "num") format = xaxis[i].x;
                        else format = TimeDateElement(xaxis[i].x, duration.format);

                        var elementlabel = xaxis[i].label;
                        if (xaxis[i].label == undefined) elementlabel = format;
                        if (xaxis[i].x == undefined && xaxis[i].label == undefined) elementlabel = i;

                        if (valuex < 0) // if positive value
                        {
                            element = {
                                x: x
                                , y: vposition + (height * conh)
                                , width: width
                                , height: height * -conh
                                , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"
                            };
                        }
                        else {
                            element = {
                                x: x
                                , y: vmovey
                                , width: width
                                , height: height * conh
                                , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"
                            };
                        }
                        if (percent == 100) elementlist.push(element);
                    }
                    xaddW += width;
                }
                    //lines and plots
                else if (ObjectData[ic - 1].charttype == "line") {
                    var linestroke;
                    if (ObjectData[ic - 1].areafill == undefined) ObjectData[ic - 1].areafill == 'rgba(0,0,0,0)';
                    if (ObjectData[ic - 1].area == undefined) ObjectData[ic - 1].area = false;
                    //lines
                    for (i = 0; i < data.length; i++) {
                        valuex = -1 * (data[i][Object.keys(data[i])[ic]]);
                        //var xmeasure = xaxis.length;

                        var x;
                        if (xmeasure > 20) x = (xnumbase + 10) + ((Math.floor(XCanvas - 62) / duration.xaxis) * i);//Xorigin + 5 + (w * i * (ObjectData.length)) - 8;
                        else x = Xorigin + 5 + (w * i * (ObjectData.length));
                        y = YaddB;
                        width = ((w * 0.7 * ObjectData.length) / 2);
                        height = (valuex * ratioX) * percentanimation;
                        if (valuex == undefined) continue;
                        plotx = x + width;
                        liney = parseFloat(y + height);

                        ctx.lineWidth = ObjectData[ic - 1].linewidth;

                        if (ObjectData[ic - 1].filltype == "gradient") linestroke = ObjectData[ic - 1].fillcolor[ObjectData[ic - 1].fillcolor.length - 1].color;
                        else if (ObjectData[ic - 1].filltype == "color") linestroke = ObjectData[ic - 1].fillcolor;

                        //line dash
                        if (ObjectData[ic - 1].dash == undefined) ObjectData[ic - 1].dash = [0];

                        //cap and join
                        if (ObjectData[ic - 1].cap == undefined) ObjectData[ic - 1].cap = "butt";
                        if (ObjectData[ic - 1].join == undefined) ObjectData[ic - 1].join = "miter";

                        function linepoint(stroke) {
                            ctx.save();
                            ctx.setLineDash(ObjectData[ic - 1].dash);
                            shadowset(shadow.x, shadow.y, shadow.blur, shadow.color, ctx);
                            ctx.strokeStyle = stroke;
                            if (i >= 1) {
                                ctx.lineTo(plotx, liney);
                                ctx.stroke();
                                ctx.closePath();
                            }
                            ctx.beginPath();
                            ctx.moveTo(plotx, liney);
                            ctx.restore();
                        }

                        function arealine() {
                            ctx.save();
                            ctx.setLineDash(ObjectData[ic - 1].dash);
                            shadowset(shadow.x, shadow.y, shadow.blur, shadow.color, ctx);
                            ctx.fillStyle = ObjectData[ic - 1].areafill;
                            var curveadd;
                            if (valuex > 0) curveadd = 10
                            else curveadd = -10
                            if (i >= 1) {
                                ctx.save();
                                //ctx.strokeStyle = "black";//ObjectData[ic - 1].areafill;
                                //ctx.lineWidth = 1;
                                //ctx.bezierCurveTo(plotx - 5, liney + 10, plotx - 10, liney - 5, plotx, liney); //this is only a trial
                                ctx.lineTo(plotx, liney);
                                //ctx.stroke();
                                ctx.restore();

                                ctx.save();
                                ctx.lineTo(plotx, YaddB);
                                ctx.restore();
                                ctx.fill();
                                ctx.closePath();
                            }
                            ctx.beginPath();
                            ctx.moveTo(plotx, YaddB);
                            ctx.lineTo(plotx, liney);
                            ctx.restore();
                        }

                        ctx.save();
                        ctx.lineCap = ObjectData[ic - 1].cap;
                        ctx.lineJoin = ObjectData[ic - 1].join;

                        if (ObjectData[ic - 1].area == true) {
                            arealine();
                        }
                        else {
                            linepoint(linestroke);
                        }
                        ctx.restore();

                        if (duration.format == undefined) duration.format = "num";

                        if (duration.format == "num") format = xaxis[i].x;
                        else format = TimeDateElement(xaxis[i].x, duration.format);

                        var elementlabel = xaxis[i].label;
                        if (xaxis[i].label == undefined) elementlabel = format;
                        if (xaxis[i].x == undefined && xaxis[i].label == undefined) elementlabel = i;

                        if (valuex < 0) // if positive value
                        {
                            element = {
                                x: x
                                , y: vposition + (height * conh)
                                , width: width
                                , height: height * -conh
                                , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"
                            };
                        }
                        else {
                            element = {
                                x: x
                                , y: vmovey
                                , width: width
                                , height: height * conh
                                , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"
                            };
                        }
                        if (percent == 100) elementlist.push(element);

                    }

                    //plots
                    for (i = 0; i < data.length; i++) {
                        var markerfill, markerstroke, markerwidth;
                        var datacolor = data[i].color;
                        if (data[i].color == undefined || ic > 1) datacolor = ObjectData[ic - 1].fillcolor;
                        if (ObjectData[ic - 1].strokewidth == undefined || ObjectData[ic - 1].strokewidth == 0) ObjectData[ic - 1].strokewidth = 1;

                        valuex = -1 * (data[i][Object.keys(data[i])[ic]]);
                        var x;
                        if (xmeasure > 20) x = (xnumbase + 10) + ((Math.floor(XCanvas - 62) / duration.xaxis) * i);//Xorigin + 5 + (w * i * (ObjectData.length)) - 8;
                        else x = Xorigin + 5 + (w * i * (ObjectData.length));
                        y = YaddB;
                        var width;
                        width = (w * 0.7 * ObjectData.length) / 2;
                        height = (valuex * ratioX) * percentanimation;

                        if (valuex > 0) y += 1;

                        plotx = x + width;
                        liney = parseFloat(y + height);

                        if (ObjectData[ic - 1].areasize <= 2 || ObjectData[ic - 1].areasize == undefined) ObjectData[ic - 1].areasize = 2;

                        //for circle
                        var circlewidth = ObjectData[ic - 1].areasize;

                        //for other shapes and markers
                        var Xshape = plotx;
                        var Yshape = liney;
                        var Areashape = ObjectData[ic - 1].areasize;

                        //gradient
                        if (ObjectData[ic - 1].filltype == "gradient") {
                            var grad = [];
                            for (var j = 0; j < ObjectData[ic - 1].fillcolor.length; j++) {
                                grad.push({ color: ObjectData[ic - 1].fillcolor[j].color, stop: ObjectData[ic - 1].fillcolor[j].stop });
                            }
                            markerfill = GradientCircle(plotx, liney, circlewidth / 5, plotx, liney - 1, circlewidth, grad, ctx);
                        }
                        else if (ObjectData[ic - 1].filltype == "color") markerfill = datacolor;

                        markerwidth = ObjectData[ic - 1].strokewidth;
                        markerstroke = ObjectData[ic - 1].strokecolor;
                        if (ObjectData[ic - 1].strokecolor == undefined) markerstroke = datacolor;//data[i].color;

                        var plotmarker = data[i].marker;
                        if (data[i].marker == undefined) plotmarker = ObjectData[ic - 1].marker;

                        if (/*duration.xaxis > 20 ||*/ duration.xaxis > 50) break;

                        Markers(plotmarker, Xshape, Yshape, Areashape, markerwidth, markerfill, markerstroke, ctx, shadow.x, shadow.y, shadow.blur, shadow.color);

                        /*var elementlabel = xaxis[i].label;
                        if (xaxis[i].label == undefined) elementlabel = xaxis[i].x;

                        if (valuex < 0) // if positive value
                        {
                            element = {
                                x: Xorigin + 5 + (w * i * (ObjectData.length))
                                , y: YaddB + height
                                , width: width
                                , height: height * -1//conh * -1//height * -1
                                , text: "(" + elementlabel + ") " + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]])
                            };
                        }
                        else {
                            element = {
                                x: Xorigin + 5 + (w * i * (ObjectData.length))
                                , y: YaddB
                                , width: width
                                , height: height//conh//height
                                , text: "(" + elementlabel + ") " + ObjectData[ic - 1].name
                                , value: (data[i][Object.keys(data[i])[ic]])
                            };
                        }
                        if (percent == 100) elementlist.push(element);*/
                    }
                }
            }
            ctx.restore();
            canvaslabel();
            legend();
        } //end else
    } //end function animateChart

    //draw hover
    var hoverfontsize = 12;
    var hover = elementID(canvasID);
    if (option.iscreated == false || option.iscreated == undefined) {
        option.iscreated = true;
        hover.addEventListener("mousemove", function (event) {

            var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;

            var coordinates = getCursorPosition(hover, event);
            var y = coordinates.y;
            var x = coordinates.x;

            elementlist.forEach(function (element) {
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {
                    //redraw with tooltip
                    document.getElementById(canvasIDcon + "_hover").style.display = "block";
                    var txt = element.text + ": " + parseInt(element.value);
                    var e = document.getElementById(canvasIDcon + "_hover");
                    e.innerHTML = "<div style='color:white;padding:5px;'>" + txt + "</div>";
                    e.style.fontFamily = "Arial";
                    e.style.fontSize = hoverfontsize + "px";
                    e.style.marginTop = y + hoverfontsize + 15 + "px";
                    e.style.marginLeft = x + "px";
                    e.style.textAlign = "center";
                    e.style.position = "absolute";
                    e.style.backgroundColor = rgba(0, 0, 0, 0.5);
                }
            });
            //console.log( " x:" +coordinates.x + " y:" + coordinates.y);
        }, false);

        hover.addEventListener("mouseout", function (event) {
            var a = elementID(canvasID);
            document.getElementById(canvasIDcon + "_hover").style.display = "none";
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;
        }, false);
    }


}
//end of vertical bar and line chart

//Horizontal Bar Chart
P8.HChart = function (canvasID) {
    var size = {
        width: 660
        , height: 400
    }
    var duration = {
        xaxis: 10
        , yaxis: 4
        , interval: 10
    }

    var data = [];

    var label = [];

    var animation = undefined;
    var legendposition = undefined;

    label.push({ label: "Item1" });
    label.push({ label: "Item2" });
    label.push({ label: "Item3" });
    label.push({ label: "Item4" });

    data.push({ id: 0, value: 10, color: "red" });
    data.push({ id: 1, value: 20, color: "blue" });
    data.push({ id: 2, value: 30, color: "yellow" });
    data.push({ id: 3, value: 40, color: "green" });

    var ObjectData = [];
    ObjectData.push({
        name: "Item"
        , fillcolor: "orange"
        , filltype: "color"
        , shadow: true
    });

    //Grid Line Option
    optionGridLine = {
        color: "Black"
        , width: 1
    };
    optionH = { //header
        color: "black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Header"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionF = { //footer
        color: "black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Footer"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionLL = { //label left
        color: "black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Left"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionLR = { //label right
        color: "black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Right"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Label Font Option
    optionLabelFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , display: true
    };
    //Legend Font Option
    optionLegendFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: ""
        , fontStyle: "Normal"
    };
    //Measure Font Option
    optionMeasureFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , rotate: "off"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , display: true
    };
    var background = 'rgba(0,0,0,0)'; //transparent
    var option = {
        canvasID: canvasID
        , data: data
        , duration: duration
        , yaxis: label
        , ObjectData: ObjectData
        , background: background
        , header: optionH
        , footer: optionF
        , labelleft: optionLL
        , labelright: optionLR
        , labelfont: optionLabelFont
        , legendfont: optionLegendFont
        , gridline: optionGridLine
        , measurefont: optionMeasureFont
        , animation: animation
        , size: size
        , legendposition: legendposition
    };
    this.option = option;
};
P8.HChart.prototype.SetOption = function (option) {
    this.option = option;
};
P8.HChart.prototype.SetHeader = function (header) {
    this.option.header = header;
};
P8.HChart.prototype.SetFooter = function (footer) {
    this.option.footer = footer;
};
P8.HChart.prototype.SetLabelLeft = function (labelleft) {
    this.option.labelleft = labelleft;
};
P8.HChart.prototype.SetLabelRight = function (labelright) {
    this.option.labelright = labelright;
};
P8.HChart.prototype.SetData = function (data) {
    this.option.data = data;
};
P8.HChart.prototype.SetDuration = function (duration) {
    this.option.duration = duration;
};
P8.HChart.prototype.SetYAxis = function (yaxis) {
    this.option.yaxis = yaxis;
};
P8.HChart.prototype.SetObject = function (ObjectData) {
    this.option.ObjectData = ObjectData;
};
P8.HChart.prototype.SetBackground = function (background) {
    this.option.background = background;
};
P8.HChart.prototype.SetGridLine = function (gridline) {
    this.option.gridline = gridline;
};
P8.HChart.prototype.SetLegendFont = function (legendfont) {
    this.option.legendfont = legendfont;
};
P8.HChart.prototype.SetLabelFont = function (labelfont) {
    this.option.labelfont = labelfont;
};
P8.HChart.prototype.SetMeasureFont = function (measurefont) {
    this.option.measurefont = measurefont;
};
P8.HChart.prototype.SetAnimation = function (animation) {
    this.option.animation = animation;
};
P8.HChart.prototype.SetSize = function (size) {
    this.option.size = size;
};
P8.HChart.prototype.SetLegendPosition = function (legendposition) {
    this.option.legendposition = legendposition;
}
P8.HChart.prototype.Render = function () {
    CreateHorizontalBar(this.option);
};

function CreateHorizontalBar(option) {
    var canvasIDcon = option.canvasID;
    var canvasID = option.canvasID + "_canvas";

    var elementcanvas = document.getElementById(canvasID);

    if (elementcanvas == undefined) {

        var element = document.getElementById(canvasIDcon);

        var para = document.createElement("div");
        para.id = canvasIDcon + "_hover";
        element.appendChild(para);

        var para = document.createElement("canvas");
        para.id = canvasID;
        para.width = option.size.width;
        para.height = option.size.height;
        para.style.backgroundColor = option.background;
        para.style.borderStyle = "solid";
        para.style.borderColor = "black";
        para.style.borderWidth = "thin";

        element.appendChild(para);
    }

    var ctx = Canvas(canvasID);
    var conw = option.size.width;//660 default number
    var conh = option.size.height;//400 default number
    var centerX = Math.round((conw / 2) * 1.211);
    var centerY = conh / 2;
    var center = centerX + centerY;
    var b;
    var h;
    var w;

    var elementlist = [];

    var data = option.data;
    var yaxis = option.yaxis;
    var ObjectData = option.ObjectData;
    var gridline = option.gridline;
    var legendfont = option.legendfont;
    var measurefont = option.measurefont;
    var labelfont = option.labelfont;
    var duration = option.duration;

    var background = option.background;
    var animation = option.animation;

    var ymeasure = duration.yaxis;

    var legendposition = option.legendposition;
    if (legendposition == undefined) legendposition = "none";

    var xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 25;//default

    //multiple vertical lines
    var vline;
    var yline = duration.xaxis;

    switch (legendposition) {
        case "top":
            lineheight = 60; //40
            hposition = conh - 50; //320
            xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 25;//default
            hline = conw - 40;//Math.round(conw * 0.916); //605
            break
        case "bottom":
            lineheight = 40;
            hposition = conh - 70; //320
            xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 25;//default
            hline = conw - 40;//Math.round(conw * 0.916); //605
            break
        case "left":
            lineheight = 40;
            hposition = conh - 50; //320
            xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 52 + MaxArrayText(ObjectData, legendfont, ctx);
            hline = conw - 40;//Math.round(conw * 0.916); //605
            break
        case "right":
            lineheight = 40;
            hposition = conh - 50; //320
            xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 25;//default
            hline = conw - (50 + MaxArrayText(ObjectData, legendfont, ctx));//Math.round(conw * 0.916); //605
            break
        default:
            lineheight = 40;
            hposition = conh - 50; //320
            xlabelbase = MaxArrayLabel(yaxis, labelfont, ctx) + 25;//default
            hline = conw - 40;//Math.round(conw * 0.916); //605
    }

    var YCanvas = hposition; //conh - 55
    var ynumbase = YCanvas + 10;

    var hmovex = xlabelbase + 3;//Math.round(conw * 0.0833);  //55

    //checking max and min
    var XaddB;
    var maxY = 0;
    var minY = 0;
    for (var ic = 1; ic <= ObjectData.length; ic++) {
        for (i = 0; i < data.length; i++) {
            valuey = (-1 * data[i][Object.keys(data[i])[ic]]);
            if (valuey >= maxY) maxY = valuey;
            if (valuey <= minY) minY = valuey;
        }
    }
    var WCanvas = hline - hmovex;
    var totalY = Math.abs(maxY) + Math.abs(minY);
    var tmptotalY = totalY;
    var ynumbercounter = 0;
    var ydivisor = 10;
    var totdivisor = 1;

    while (tmptotalY > ydivisor) {
        tmptotalY /= ydivisor;
        ynumbercounter++;
        if (ynumbercounter > 1) totdivisor *= ydivisor;
    }
    tmptotalY = parseInt(tmptotalY) + 1;
    for (var i = 1; i <= ynumbercounter; i++)
        tmptotalY = parseInt(tmptotalY) * (ydivisor);

    totalY = tmptotalY;
    var ratioY = (WCanvas / totalY);

    var numy = totalY / yline;

    //get perline width
    vline = (WCanvas / yline)

    //compute for origin
    XaddB = WCanvas * (Math.abs(maxY) / totalY);
    XaddB += hmovex;
    var Xbase = XaddB;

    var Yorigin = lineheight;
    var addH = 1;

    //graph and labels
    var heightC = YCanvas - lineheight;

    var heightCperY = YCanvas - lineheight;
    heightCperY /= yaxis.length;

    heightC /= ObjectData.length;
    heightC /= data.length;
    h = heightC;

    function canvasdrawing() {
        ctx.lineWidth = gridline.width;
        ctx.strokeStyle = gridline.color;
        //measurement
        //vertical lines
        for (var i = 1; i <= yline; i++) {
            var m = (Xbase + vline) - (vline * i);
            if (hmovex > m) break;
            Line(Math.round(m) + 0.5, lineheight, Math.round(m) + 0.5, YCanvas, gridline.width, gridline.color, ctx);
        }

        for (var i = 0; i <= yline; i++) {
            var mi = (Xbase + vline) + (vline * i);
            if (hline < mi & hline > 10) break;
            Line(Math.round(mi) + 0.5, lineheight, Math.round(mi) + 0.5, YCanvas, gridline.width, gridline.color, ctx);
        }

        //horizontal line
        Line(hmovex, Math.round(hposition) + 0.5, hline + 1, Math.round(hposition) + 0.5, gridline.width, gridline.color, ctx);
    }

    function canvaslabel() {
        //measurement
        if (measurefont.display == undefined) measurefont.display = false;
        if (measurefont.display == true) {
            for (var i = 1; i <= yline; i++) {
                var m = (Xbase + vline) - (vline * i);
                var numA = ((numy * i) - numy) * -1;
                if (hmovex > m) break;
                Font(measurefont.fontSize, measurefont.fontWeight, measurefont.fontFamily, measurefont.fontStyle, ctx);
                TextDisplay(convert(numA), m, ynumbase, 0, measurefont.color, "center", "middle", ctx);
            }
            for (var i = 0; i <= 10; i++) {
                var mi = (Xbase + vline) + (vline * i);
                var numB = ((numy * i) + numy);
                if (hline < mi & hline > 10) break;
                Font(measurefont.fontSize, measurefont.fontWeight, measurefont.fontFamily, measurefont.fontStyle, ctx);
                TextDisplay(convert(numB), mi, ynumbase, 0, measurefont.color, "center", "middle", ctx);
            }
        }

        //label rows
        if (labelfont.display == undefined) labelfont.display == false;
        if (labelfont.display == true) {
            for (i = 0; i < yaxis.length; i++) {
                Font(labelfont.fontSize, labelfont.fontWeight, labelfont.fontFamily, labelfont.fontStyle, ctx);
                var intervaly = duration.interval;
                var YoriginAdd = Yorigin;
                var YoriginSub = 260
                var labely;
                //var labelcanvas = (heightCperY / 2) + YoriginAdd + (heightCperY * i);
                var labelmeasure = Math.floor((duration.yaxis / intervaly) * (i));
                var loopmeasure;
                if (ymeasure > 20) {
                    if (labelmeasure == ymeasure) break;
                    labelcanvas = (lineheight + 2) + ((Math.floor(YCanvas - 38) / intervaly) * (i));
                    loopmeasure = labelmeasure;
                }
                else {
                    labelcanvas = (heightCperY / 2) + YoriginAdd + (heightCperY * i);
                    loopmeasure = i;
                }
                if (duration.format == undefined) duration.format = "num";

                labely = yaxis[loopmeasure].label;

                if (duration.format == "num") format = convert(parseInt(yaxis[loopmeasure].y));
                else format = TimeDateLabel(yaxis[loopmeasure].y, duration.format);

                if (yaxis[loopmeasure].label == undefined) labely = format;
                else if (yaxis[loopmeasure].y = undefined && yaxis[loopmeasure].label == undefined) labely = convert(loopmeasure);
                TextDisplay(labely, xlabelbase, labelcanvas, 0, labelfont.color, "right", "middle", ctx);
            }
        }

        //header
        var suboptionH = option.header;
        ctx.fillStyle = suboptionH.color;
        Font(suboptionH.fontSize, suboptionH.fontWeight, suboptionH.fontFamily, suboptionH.fontStyle, ctx);
        TextDisplay(suboptionH.text, conw / 2, 10, 0, suboptionH.color, "center", "hanging", ctx);

        //footer
        var suboptionF = option.footer;
        ctx.fillStyle = suboptionF.color;
        Font(suboptionF.fontSize, suboptionF.fontWeight, suboptionF.fontFamily, suboptionF.fontStyle, ctx);
        TextDisplay(suboptionF.text, conw / 2, conh - 10, 0, suboptionF.color, "center", "alphabetic", ctx);

        //labelleft
        var suboptionLL = option.labelleft;
        Font(suboptionLL.fontSize, suboptionLL.fontWeight, suboptionLL.fontFamily, suboptionLL.fontStyle, ctx);
        TextDisplay(suboptionLL.text, 6, conh * 0.45, -90, suboptionLL.color, "center", "hanging", ctx);

        //labelright
        var suboptionLR = option.labelright;
        Font(suboptionLR.fontSize, suboptionLR.fontWeight, suboptionLR.fontFamily, suboptionLR.fontStyle, ctx);
        TextDisplay(suboptionLR.text, conw - 5, conh * 0.45, 90, suboptionLR.color, "center", "hanging", ctx);
    }

    function legend() {
        //legend
        for (i = 0; i < ObjectData.length; i++) {
            var ltextX, ltextY, Xmarker, Ymarker, legendX, legendY, XGradient, YGradient, lalign;
            var lbase, llength;
            var llineH = conw / ObjectData.length;

            var lheight = conh * 0.5;
            var llineV = 17;
            lheight -= ((llineV / 2) * ObjectData.length);
            var lcolorheight = lheight + (llineV * i);

            var llength = conw * 0.5;
            llength /= ObjectData.length;

            Font(legendfont.fontSize, legendfont.fontWeight, legendfont.fontFamily, legendfont.fontStyle, ctx);
            var textwidth = (ctx.measureText(ObjectData[i].name).width * 0.5);

            var ltextH = llength + (llineH * i);
            var ltextV = lheight + (llineV * i);

            //for bar legend
            var lcolorwidth = (llength - (textwidth + 14)) + (llineH * i);

            switch (legendposition) {
                case "top":
                    ltextX = ltextH;
                    ltextY = 40;
                    Xmarker = lcolorwidth;
                    Ymarker = 40//conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "bottom":
                    ltextX = ltextH;
                    ltextY = conh - 32;
                    Xmarker = lcolorwidth;
                    Ymarker = conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "left":
                    ltextX = 40;
                    ltextY = ltextV;
                    Xmarker = ltextX - 10;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
                    break
                case "right":
                    ltextX = conw - (20 + (MaxArrayText(ObjectData, legendfont, ctx)));
                    ltextY = ltextV;
                    Xmarker = ltextX - 10;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
            }

            if (legendposition != "none") {

                var shine = [];
                shine.push({ color: ObjectData[i].fillcolor, stop: 0 });
                shine.push({ color: 'white', stop: 0.2 });
                shine.push({ color: ObjectData[i].fillcolor, stop: 0.6 });

                if (ObjectData[i].fillcolor == undefined) ObjectData[i].fillcolor = "black";
                if (ObjectData[i].filltype == undefined) ObjectData[i].filltype = "color";
                if (ObjectData[i].style == undefined) ObjectData[i].style = "2d";
                if (ObjectData[i].filltype == "gradient") {
                    if (ObjectData[i].gradienttype == undefined) ObjectData[i].gradienttype = "linear C";
                    var grad = [];
                    for (var j = 0; j < ObjectData[i].fillcolor.length; j++) {
                        grad.push({ color: ObjectData[i].fillcolor[j].color, stop: ObjectData[i].fillcolor[j].stop });
                    }
                    /*if (ObjectData[i].gradienttype == "linear A") lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, true);
                    else if (ObjectData[i].gradienttype == "linear B") lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, false);
                    else if (ObjectData[i].gradienttype == "linear C") lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, true);
                    else if (ObjectData[i].gradienttype == "linear D") lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, false);*/

                    switch (ObjectData[i].gradienttype) {
                        case "linear A": lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, true); break
                        case "linear B": lbarfill = GradientV(Ymarker - 3, 6, 6, grad, ctx, false); break
                        case "linear C": lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, true); break
                        case "linear D": lbarfill = GradientH(Xmarker - 3, 6, 6, grad, ctx, false);
                    }
                }
                else if (ObjectData[i].filltype == "color" && ObjectData[i].style == "2d") {
                    lbarfill = ObjectData[i].fillcolor;
                }
                else if (ObjectData[i].filltype == "color" && ObjectData[i].style == "3d") {
                    lbarfill = GradientV(Ymarker - 4, 6, 6, shine, ctx, false);
                }
                shapeA(Xmarker, Ymarker, 45, 4, 6, 1, lbarfill, rgba(0, 0, 0, 0), ctx);
                //shapeA(Xmarker, Ymarker, 45, 4, 6, 1, lbarfill, rgba(0, 0, 0, 0), ctx);
                TextDisplay(ObjectData[i].name, ltextX, ltextY, 0, legendfont.color, lalign, "middle", ctx);
            }
        }
    }

    //animate
    var a = elementID(canvasID);
    var p8draw = a.getAttribute("p8draw", true);
    var barHAnimate;
    if (animation == undefined) animation = false;

    if (animation == true) {
        if (p8draw != "true" && p8draw == undefined) {
            requestAnimFrame(animateHBar);
        } else {
            percent = 99;
            animateHBar();
        }
    }
    else {
        percent = 99;
        animateHBar();
    }

    ctx.beginPath();
    function animateHBar() {
        if (percent == 100) {
            cancelAnimFrame(barHAnimate);
            var a = elementID(canvasID);
            a.setAttribute("p8animate", false);
            a.setAttribute("p8draw", true);
        }
        else {
            if (percent < 100) {
                barHAnimate = requestAnimFrame(animateHBar);
            }
            percent++
            if (animation == true) var percentanimation = percent / 100;
            else percentanimation = 1;
            clear(conw, conh, ctx);
            canvasdrawing();
            /*if (percent < 100) {
                a.setAttribute("p8animate", true);
            }*/
            var YaddH = addH;
            ctx.save();
            for (var ic = 1; ic <= ObjectData.length; ic++) {
                if (ObjectData[ic - 1].fillcolor == undefined) ObjectData[ic - 1].fillcolor = "black";
                if (ObjectData[ic - 1].filltype == undefined) ObjectData[ic - 1].filltype = "color";
                if (ObjectData[ic - 1].style == undefined) ObjectData[ic - 1].style = "2d"
                for (var i = 0; i < data.length; i++) {
                    var barfill;
                    var datacolor = data[i].color;
                    if (data[i].color == undefined || ic > 1) datacolor = ObjectData[ic - 1].fillcolor;
                    valuey = (data[i][Object.keys(data[i])[ic]]);
                    var x = XaddB; //XaddB
                    var y;
                    if (ymeasure > 20) y = YaddH + lineheight + ((Math.floor(YCanvas - 38) / duration.yaxis) * i);
                    else y = YaddH + Yorigin + (h * i * (ObjectData.length));
                    var width = (valuey * ratioY) * percentanimation;
                    var height;
                    if (ymeasure > 20) height = h * 0.7;
                    else height = h * 0.9;

                    if (valuey >= 0) x += 1;

                    //gradient
                    var shine = [];
                    shine.push({ color: datacolor, stop: 0 });
                    shine.push({ color: 'white', stop: 0.2 });
                    shine.push({ color: datacolor, stop: 0.6 });

                    if (ObjectData[ic - 1].filltype == "gradient") {
                        if (ObjectData[ic - 1].gradienttype == undefined) ObjectData[ic - 1].gradienttype = "linear A";
                        var grad = [];
                        for (var j = 0; j < ObjectData[ic - 1].fillcolor.length; j++) {
                            grad.push({ color: ObjectData[ic - 1].fillcolor[j].color, stop: ObjectData[ic - 1].fillcolor[j].stop });
                        }
                        if (ObjectData[ic - 1].gradienttype == "linear A") barfill = GradientV(y, width, height, grad, ctx, true);
                        else if (ObjectData[ic - 1].gradienttype == "linear B") barfill = GradientV(y, width, height, grad, ctx, false);
                        else if (ObjectData[ic - 1].gradienttype == "linear C") barfill = GradientH(x, width, height, grad, ctx, true);
                        else if (ObjectData[ic - 1].gradienttype == "linear D") barfill = GradientH(x, width, height, grad, ctx, false);
                    }
                    else if (ObjectData[ic - 1].filltype == "color" && ObjectData[ic - 1].style == "2d") barfill = datacolor;
                    else if (ObjectData[ic - 1].filltype == "color" && ObjectData[ic - 1].style == "3d") barfill = GradientV(y, width, height, shine, ctx, false);

                    if (ObjectData[ic - 1].shadow == undefined) ObjectData[ic - 1].shadow == false;

                    if (ObjectData[ic - 1].shadow == true) shadowset(0, 0, 1, "black", ctx);
                    ctx.fillStyle = barfill;
                    ctx.fillRect(x, y, width, height);

                    //rectangle(x, y, width, height, barfill, ctx, 0, 0, 1, "black");

                    var elementlabel = yaxis[i].label;
                    if (yaxis[i].label == undefined) elementlabel = yaxis[i].y;
                    else if (yaxis[i].y == undefined && yaxis[i].label == undefined) elementlabel = convert(i);

                    element = (valuey > 0) ? {
                        x: x
                        , y: y
                        , width: width
                        , height: height
                        , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                        , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"

                    } : {
                        x: x + width
                        , y: y
                        , width: width * -1
                        , height: height
                        , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                        , value: (data[i][Object.keys(data[i])[ic]]) + "<br>"
                    };
                    if (percent == 100) elementlist.push(element);
                }
                YaddH += height;
            }
            ctx.restore();
            canvaslabel();
            legend();
        } //end else
        ctx.closePath();
    }

    //draw hover
    var hoverfontsize = 12;
    var hover = elementID(canvasID);
    if (option.iscreated == false || option.iscreated == undefined) {
        option.iscreated = true;
        hover.addEventListener("mousemove", function (event) {

            var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;

            var coordinates = getCursorPosition(hover, event);
            var y = coordinates.y;
            var x = coordinates.x;
            //console.log(y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width);
            //console.log(y +">"+ element.y +"&&"+y +"<"+ element.y + element.height +"&&" + x > element.x +"&&"+ x +"<"+ element.x + element.width);
            elementlist.forEach(function (element) {
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {
                    //redraw with tooltip
                    document.getElementById(canvasIDcon + "_hover").style.display = "block";
                    var txt = element.text + ": " + parseInt(element.value);
                    var e = document.getElementById(canvasIDcon + "_hover");
                    e.innerHTML = "<div style='color:white;padding:5px;'>" + txt + "</div>";
                    e.style.fontFamily = "Arial";
                    e.style.fontSize = hoverfontsize + "px";
                    e.style.marginTop = y + hoverfontsize + 15 + "px";
                    e.style.marginLeft = x + "px";
                    e.style.textAlign = "center";
                    e.style.position = "absolute";
                    e.style.backgroundColor = rgba(0, 0, 0, 0.5);
                }
            });
            //console.log( " x:" +coordinates.x + " y:" + coordinates.y);
        }, false);

        hover.addEventListener("mouseout", function (event) {
            var a = elementID(canvasID);
            document.getElementById(canvasIDcon + "_hover").style.display = "none";
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;
        }, false);
    }

} //end of Horizontal Chart

//Bubble Chart
P8.BChart = function (canvasID) {
    var size = {
        width: 660
        , height: 400
    }

    var duration = {
        metric: false
        , xaxis: 4
        , yaxis: 10
    }

    var data = [];

    var label = [];

    label.push({ label: "Sample 1" });
    label.push({ label: "Sample 2" });
    label.push({ label: "Sample 3" });
    label.push({ label: "Sample 4" });

    data.push({ id: 0, value: 10, color: "red" });
    data.push({ id: 1, value: 20, color: "blue" });
    data.push({ id: 2, value: 30, color: "yellow" });
    data.push({ id: 3, value: 40, color: "green" });

    var animation = undefined;
    var legendposition = undefined;

    var gradcolor = [];
    gradcolor.push({ color: "orange" });
    gradcolor.push({ color: "yellow" });

    var ObjectData = [];
    ObjectData.push({
        name: "Item"
        , fillcolor: "orange"
        , filltype: "color"
        , style: "3d"
        , strokewidth: 1
        , transparency: 1
    });

    var bubblearea = [];
    bubblearea.push({ id: 0, area: 100 });
    bubblearea.push({ id: 1, area: 70 });
    bubblearea.push({ id: 2, area: 50 });
    bubblearea.push({ id: 3, area: 20 });

    var bubblelabel = "Area";

    //Grid Line Option
    optionGridLine = {
        color: "Black"
        , width: 1
    };
    //Measure Left Option
    optionMeasureLeft = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , textdirection: "off"
        , display: true
    };
    //Measure Right Option
    optionMeasureRight = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 9
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , textdirection: "off"
        , display: true
    };
    optionH = { //header
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Sample Chart"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionF = { //footer
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Footer"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionLL = { //label left
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Left"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionLR = { //label right
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Label Right"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Label Font Option
    optionLabelFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
        , rotate: 0 //number of degrees
        , display: true
        , align: "center"
    };
    //Legend Font Option
    optionLegendFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    var background = 'rgba(0,0,0,0)'; //transparent
    //Shadow Option
    var shadow = {
        x: 0
        , y: 0
        , blur: 0
        , color: "black"
    }
    var option = {
        canvasID: canvasID
        , data: data
        , xaxis: label
        , ObjectData: ObjectData
        , bubblearea: bubblearea
        , bubblelabel: bubblelabel
        , interval: bubblearea//
        , intname: bubblelabel//
        , duration: duration
        , header: optionH
        , footer: optionF
        , labelleft: optionLL
        , labelright: optionLR
        , labelfont: optionLabelFont
        , background: background
        , gridline: optionGridLine
        , measureleft: optionMeasureLeft
        , measureright: optionMeasureRight
        , legendfont: optionLegendFont
        , legendposition: legendposition
        , gradcolor: gradcolor
        , animation: animation
        , shadow: shadow
        , size: size
    };
    this.option = option;

};
P8.BChart.prototype.SetOption = function (option) {
    this.option = option;
};
P8.BChart.prototype.SetHeader = function (header) {
    this.option.header = header;
};
P8.BChart.prototype.SetFooter = function (footer) {
    this.option.footer = footer;
};
P8.BChart.prototype.SetLabelLeft = function (labelleft) {
    this.option.labelleft = labelleft;
};
P8.BChart.prototype.SetLabelRight = function (labelright) {
    this.option.labelright = labelright;
};
P8.BChart.prototype.SetLabelFont = function (labelfont) {
    this.option.labelfont = labelfont;
};
P8.BChart.prototype.SetMeasureLeft = function (measureleft) {
    this.option.measureleft = measureleft;
};
P8.BChart.prototype.SetMeasureRight = function (measureright) {
    this.option.measureright = measureright;
};
P8.BChart.prototype.SetLegendFont = function (legendfont) {
    this.option.legendfont = legendfont;
};
P8.BChart.prototype.SetData = function (data) {
    this.option.data = data;
};
P8.BChart.prototype.SetXAxis = function (xaxis) {
    this.option.xaxis = xaxis;
};
P8.BChart.prototype.SetDuration = function (duration) {
    this.option.duration = duration;
};
P8.BChart.prototype.SetObject = function (ObjectData) {
    this.option.ObjectData = ObjectData;
};
P8.BChart.prototype.SetBubbleArea = function (bubblearea) {
    this.option.bubblearea = bubblearea;
};
P8.BChart.prototype.SetBubbleLabel = function (bubblelabel) {
    this.option.bubblelabel = bubblelabel;
};
P8.BChart.prototype.SetBackground = function (background) {
    this.option.background = background;
};
P8.BChart.prototype.SetSize = function (size) {
    this.option.size = size;
};
P8.BChart.prototype.SetGridLine = function (gridline) {
    this.option.gridline = gridline;
};
P8.BChart.prototype.SetGradColor = function (gradcolor) {
    this.option.gradcolor = gradcolor;
};
P8.BChart.prototype.SetAnimation = function (animation) {
    this.option.animation = animation;
};
P8.BChart.prototype.SetShadow = function (shadow) {
    this.option.shadow = shadow;
};
P8.BChart.prototype.SetLegendPosition = function (legendposition) {
    this.option.legendposition = legendposition;
}
P8.BChart.prototype.Render = function () {
    CreateBubble(this.option);
};

//Start of Bubble Chart
function CreateBubble(option) {
    var canvasIDcon = option.canvasID;
    var canvasID = option.canvasID + "_canvas";

    var elementcanvas = document.getElementById(canvasID);

    if (elementcanvas == undefined) {

        var element = document.getElementById(canvasIDcon);

        var para = document.createElement("div");
        para.id = canvasIDcon + "_hover";
        element.appendChild(para);

        var para = document.createElement("canvas");
        para.id = canvasID;
        para.width = option.size.width;
        para.height = option.size.height;
        para.style.backgroundColor = option.background;
        para.style.borderStyle = "solid";
        para.style.borderColor = "black";
        para.style.borderWidth = "thin";

        element.appendChild(para);
    }

    var ctx = Canvas(canvasID);
    var conw = option.size.width; //660 default number
    var conh = option.size.height; //400 default number
    var centerX = Math.round((conw / 2) * 1.211);
    var centerY = conh / 2;
    var center = centerX + centerY;
    ctx.clearRect(0, 0, conw, conh); //clear canvas
    var b, w;
    //var XCanvas = conw - 42 //620
    //var YCanvas = Math.round(conh * 0.83); //415
    var xnumbase = 42; //42
    var ynumbase = Math.round(conh * 0.86); //430
    //var numbaseB = conw - 40;
    var verticalTitle = (XCanvas + 3) * -1;

    var elementlist = [];

    var data = option.data;
    var xaxis = option.xaxis;
    var ObjectData = option.ObjectData;
    var bubblearea = option.bubblearea;
    var bubblelabel = option.bubblelabel;
    var duration = option.duration;
    var bubble = option.bubble;
    var labelfont = option.labelfont;
    var gridline = option.gridline;
    var measureleft = option.measureleft;
    var measureright = option.measureright;
    var legendfont = option.legendfont;
    var subgradcolor = option.gradcolor;
    var shadow = option.shadow;
    var background = option.background;
    var animation = option.animation;
    var legendposition = option.legendposition;

    if (legendposition == undefined) legendposition = "none";
    var xmeasure = duration.xaxis;

    //X
    //multiple vertical lines
    var vline;
    var lineheight = Math.round(ynumbase * 0.092);//40
    var yline = duration.xaxis;

    //horizontal line
    var hmovex = Math.round(conw * 0.0833);  //55
    var hline = Math.round(conw * 0.916); //605
    var hposition = Math.round(conh * 0.83); //415

    //checking max and min
    var XaddB;
    var maxY = 0;
    var minY = 0;
    //for (var ic = 1; ic <= ObjectData.length; ic++) {
    for (i = 0; i < xaxis.length; i++) {
        valuey = (-1 * xaxis[i][Object.keys(xaxis[i])[ic]]);
        if (valuey >= maxY) maxY = valuey;
        if (valuey <= minY) minY = valuey;
    }
    //}
    var WCanvas = hline - hmovex;
    var totalY = Math.abs(maxY) + Math.abs(minY);
    var tmptotalY = totalY;
    var ynumbercounter = 0;
    var ydivisor = 10;
    var ytotdivisor = 1;

    while (tmptotalY > ydivisor) {
        tmptotalY /= ydivisor;
        ynumbercounter++;
        if (ynumbercounter > 1) totdivisor *= ydivisor;
    }
    tmptotalY = parseInt(tmptotalY) + 1;
    for (var i = 1; i <= ynumbercounter; i++)
        tmptotalY = parseInt(tmptotalY) * (ydivisor);

    totalY = tmptotalY;
    var ratioY = (WCanvas / totalY);

    var numy = totalY / yline;

    //get perline width
    //vline = (WCanvas / yline)

    //compute for origin
    /*XaddB = WCanvas * (Math.abs(maxY) / totalY);
    XaddB += hmovex;
    var Xbase = XaddB;*/

    /*var Yorigin = Math.round(conh * 0.08); //40
    //var xlabelbase = Math.round(conw * 0.08); //53
    var addH = 1;

    //graph and labels
    var heightC = YCanvas - lineheight;

    var heightCperY = YCanvas - lineheight;
    heightCperY /= data.length;

    heightC /= ObjectData.length;
    heightC /= data.length;
    h = heightC;*/

    //Y
    var xnumbase, numbaseB;

    //vertical line
    var vmovey;
    var vposition;
    var YaddB; // where the drawing start

    switch (legendposition) {
        case "top":
            vmovey = 60; //40
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
            break
        case "bottom":
            vmovey = 40;
            vposition = conh - 80; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
            break
        case "left":
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 55 + MaxArrayText(ObjectData, legendfont, ctx);
            numbaseB = conw - 42; //default
            break
        case "right":
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - (55 + MaxArrayText(ObjectData, legendfont, ctx));
            break
        default:
            vmovey = 40;
            vposition = conh - 60; //320
            xnumbase = 42;
            numbaseB = conw - 42; //default
    }

    var Xorigin = xnumbase + 4;
    var XCanvas = numbaseB;//conw - 42; //620

    //multiple horizontal lines
    var hline;
    var linelength = xnumbase + 1; //43
    var xline = duration.yaxis;

    var vline = xnumbase + 1; //43

    //multiple horizontal lines
    /*var hline;
    var linelength = xnumbase + 1; //43
    var xline = 10;

    //vertical line
    var vmovey = 40; //49
    var vline = xnumbase + 1; //43
    var vposition = conh - 80; //413
    var YaddB; // where the drawing start*/

    //checking max and min area of circle
    var maxbubblearea = 0;
    var minbubblearea = 0;
    for (ic = 1; ic <= ObjectData.length; ic++) {
        for (i = 0; i < bubblearea.length; i++) {
            valuearea = (bubblearea[i][Object.keys(bubblearea[i])[ic]]);
            if (valuearea >= maxbubblearea) maxbubblearea = valuearea;
            if (valuearea <= minbubblearea) minbubblearea = valuearea;
        }
    }

    //checking max and min
    var maxX = 0;
    var minX = 0;
    for (ic = 1; ic <= ObjectData.length; ic++) {
        for (i = 0; i < data.length; i++) {
            valuex = (data[i][Object.keys(data[i])[ic]]);
            if (valuex >= maxX) maxX = valuex;
            if (valuex <= minX) minX = valuex;
        }
    }
    var HCanvas = (vposition - vmovey);
    var totalX = Math.abs(maxX) + Math.abs(minX);

    var tmptotalX = totalX;
    var xnumbercounter = 0;
    var xdivisor = xline;
    var totdivisor = 1;

    while (tmptotalX > xdivisor) {
        tmptotalX /= xdivisor;
        xnumbercounter++;
        if (xnumbercounter > 1) totdivisor *= xdivisor;
    }
    tmptotalX = parseInt(tmptotalX) + 1;
    for (i = 1; i <= xnumbercounter; i++)
        tmptotalX = parseInt(tmptotalX) * (xdivisor);

    totalX = tmptotalX;

    var ratioX = HCanvas / totalX;

    //get perline height
    hline = (HCanvas / xline);

    //compute for origin
    YaddB = HCanvas * (Math.abs(maxX) / totalX);
    YaddB += vmovey;
    var Ybase = YaddB;

    var Xorigin = 46;
    var ylabelbase = vposition + 12;//340
    /*if (labelfont.align = "center") ylabelbase = (conh - 70) + 5;
    else if (labelfont.align = "right") ylabelbase = (conh - 70) - 5;*/
    var addW = 1;

    //graph and label
    var widthC = XCanvas - linelength;
    var widthCperX = XCanvas - linelength;
    var widthmetric = XCanvas - linelength;
    widthCperX /= duration.xaxis;
    widthmetric /= duration.xaxis;

    widthC /= ObjectData.length;
    widthC /= data.length;
    w = widthC;

    //measurement
    var numx = totalX / xline;

    //metric
    var metrictotal = 10;
    while (metrictotal < duration.xtotal) {
        metrictotal += 10;
    }
    metricresult = metrictotal;

    function canvasdrawing() {
        //measurement
        for (var i = 1; i <= xline; i++) {
            var m = (Ybase + hline) - (hline * i);
            if (vmovey > m) break;
            Line(linelength, Math.round(m) + 0.5, XCanvas, Math.round(m) + 0.5, gridline.width, gridline.color, ctx);
        }

        for (var i = 0; i <= xline; i++) {
            var mi = (Ybase + hline) + (hline * i);
            if (vposition < mi & vposition > 10) break;
            Line(linelength, Math.round(mi) + 0.5, XCanvas, Math.round(mi) + 0.5, gridline.width, gridline.color, ctx);
        }

        //vertical line drawing left
        Line(Math.round(vline) + 0.5, vmovey, Math.round(vline) + 0.5, vposition, gridline.width, gridline.color, ctx);

        //vertical line drawing right
        Line(Math.round(XCanvas - 1) + 0.5, vmovey, Math.round(XCanvas - 1) + 0.5, vposition, gridline.width, gridline.color, ctx);
    }//end of canvas drawing

    if (measureleft.textdirection == undefined) measureleft.textdirection = "off";
    if (measureright.textdirection == undefined) measureright.textdirection = "off";
    if (measureleft.display == undefined) measureleft.display = false;
    if (measureright.display == undefined) measureright.display = false;

    function canvaslabel() {
        //measurement labels positive
        for (var i = 1; i <= xline; i++) {
            var m = (Ybase + hline) - (hline * i);
            var numA = (numx * i) - numx;
            if (vmovey > m) break;
            Clabeltext = convert(numA);
            Clabelbaseline = "middle";

            //measure label left
            if (measureleft.display == true) {
                ClabelY = m + Math.ceil(conh * 0.001);
                Clabelfontweight = measureleft.fontWeight;
                Clabelfontsize = measureleft.fontSize;
                Clabelfontfamily = measureleft.fontFamily;
                Clabelcolor = measureleft.color;
                Clabelfontstyle = measureleft.fontStyle;
                if (measureleft.textdirection == "left") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "right") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = 90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "off") {
                    ClabelX = xnumbase;
                    Clabelrotate = 0
                    Clabelalign = "right";
                }
                Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
                TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
            }

            //measure label right
            if (measureright.display == true) {
                ClabelY = m + Math.ceil(conh * 0.001);
                Clabelfontweight = measureright.fontWeight;
                Clabelfontsize = measureright.fontSize;
                Clabelfontfamily = measureright.fontFamily;
                Clabelcolor = measureright.color;
                Clabelfontstyle = measureright.fontStyle;
                if (measureright.textdirection == "left") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "right") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = 90;
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "off") {
                    ClabelX = numbaseB;
                    Clabelrotate = 0;
                    Clabelalign = "left";
                }
                Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
                TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
            }
        }
        //measure labels negative
        for (var i = 0; i <= xline; i++) {
            var mi = (Ybase + hline) + (hline * i);
            var numB = ((numx * i) + numx) * -1;
            if (vposition < mi & vposition > 10) break;
            Clabeltext = convert(numB);
            Clabelbaseline = "middle";

            //measure label left

            if (measureleft.display == true) {
                ClabelY = mi + Math.ceil(conh * 0.001);
                Clabelfontweight = measureleft.fontWeight;
                Clabelfontsize = measureleft.fontSize;
                Clabelfontfamily = measureleft.fontFamily;
                Clabelcolor = measureleft.color;
                Clabelfontstyle = measureleft.fontStyle;
                if (measureleft.textdirection == "left") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "right") {
                    ClabelX = xnumbase - 7;
                    Clabelrotate = 90
                    Clabelalign = "center";
                }
                else if (measureleft.textdirection == "off") {
                    ClabelX = xnumbase;
                    Clabelrotate = 0
                    Clabelalign = "right";
                }
                Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
                TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
            }

            //measure label right

            if (measureright.display == true) {
                ClabelY = mi + Math.ceil(conh * 0.001);
                Clabelfontweight = measureright.fontWeight;
                Clabelfontsize = measureright.fontSize;
                Clabelfontfamily = measureright.fontFamily;
                Clabelcolor = measureright.color;
                Clabelfontstyle = measureright.fontStyle;
                if (measureright.textdirection == "left") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = -90
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "right") {
                    ClabelX = numbaseB + 4;
                    Clabelrotate = 90;
                    Clabelalign = "center";
                }
                else if (measureright.textdirection == "off") {
                    ClabelX = numbaseB;
                    Clabelrotate = 0;
                    Clabelalign = "left";
                }
                Font(Clabelfontsize, Clabelfontweight, Clabelfontfamily, Clabelfontstyle, ctx);
                TextDisplay(Clabeltext, ClabelX, ClabelY, Clabelrotate, Clabelcolor, Clabelalign, Clabelbaseline, ctx);
            }
        }

        //header
        var suboptionH = option.header;
        Font(suboptionH.fontSize, suboptionH.fontWeight, suboptionH.fontFamily, suboptionH.fontStyle, ctx);
        TextDisplay(suboptionH.text, conw / 2, 10, 0, suboptionH.color, "center", "hanging", ctx);

        //footer
        var suboptionF = option.footer;
        Font(suboptionF.fontSize, suboptionF.fontWeight, suboptionF.fontFamily, suboptionF.fontStyle, ctx);
        TextDisplay(suboptionF.text, conw / 2, conh - 10, 0, suboptionF.color, "center", "alphabetic", ctx);

        //labelleft
        var suboptionLL = option.labelleft;
        Font(suboptionLL.fontSize, suboptionLL.fontWeight, suboptionLL.fontFamily, suboptionLL.fontStyle, ctx);
        TextDisplay(suboptionLL.text, 6, Math.round(conh * 0.45), -90, suboptionLL.color, "center", "hanging", ctx);

        //labelright
        var suboptionLR = option.labelright;
        Font(suboptionLR.fontSize, suboptionLR.fontWeight, suboptionLR.fontFamily, suboptionLR.fontStyle, ctx);
        TextDisplay(suboptionLR.text, conw - 5, Math.round(conh * 0.45), 90, suboptionLR.color, "center", "hanging", ctx);

        //label columns
        if (labelfont.display == undefined) labelfont.display = false;
        for (i = 0; i < xmeasure; i++) {
            if (labelfont.display == true) {
                intervalx = duration.interval;
                Font(labelfont.fontSize, labelfont.fontWeight, labelfont.fontFamily, labelfont.fontStyle, ctx);
                var labelcanvas;
                var labelx;
                var labelmeasure = Math.floor((duration.xaxis / intervalx) * (i));
                var loopmeasure;
                if (xmeasure > 20) {
                    if (labelmeasure == xmeasure) break;
                    labelcanvas = (xnumbase + 10) + ((Math.floor(XCanvas - 62) / intervalx) * (i));
                    loopmeasure = labelmeasure;
                }
                else {
                    labelcanvas = (widthCperX / 2) + Xorigin + (widthCperX * i);
                    loopmeasure = i;
                }
                //labelx = xaxis[loopmeasure].label;
                /*if (xaxis[loopmeasure].label == undefined) labelx = convert(parseInt(xaxis[loopmeasure].x));
                else if (xaxis[loopmeasure].x = undefined && xaxis[loopmeasure].label == undefined)*/ labelx = convert(loopmeasure);
                TextDisplay(labelx, labelcanvas, ylabelbase, labelfont.rotate, labelfont.color, labelfont.align, "middle", ctx);
            }
        }
    }

    function legend() {
        //legend
        for (i = 0; i < ObjectData.length; i++) {
            var ltextX, ltextY, Xmarker, Ymarker, legendX, legendY, XGradient, YGradient, lalign;
            var bubblewidth, bubblefill, bubblestroke;
            Font(legendfont.fontSize, legendfont.fontWeight, legendfont.fontFamily, legendfont.fontStyle, ctx);
            var textwidth = (ctx.measureText(ObjectData[i].name).width * 0.5);
            var lbase, llength;

            var llineH = conw / ObjectData.length;
            var llength = conw * 0.5;
            llength /= ObjectData.length;

            var lheight = conh * 0.5;
            var llineV = 17;
            lheight -= ((llineV / 2) * ObjectData.length);
            var lcolorheight = lheight + (llineV * i);

            var ltextH = llength + (llineH * i);
            var ltextV = lheight + (llineV * i);

            //for circle legend
            var lcolorcB = conh - 32; //Ymarker
            var lradius = 6;
            var lcolorwidth = (llength - (textwidth + 15)) + (llineH * i); //Xmarker

            switch (legendposition) {
                case "top":
                    ltextX = ltextH;
                    ltextY = 40;
                    Xmarker = lcolorwidth;
                    Ymarker = 40//conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "bottom":
                    ltextX = ltextH;
                    ltextY = conh - 32;
                    Xmarker = lcolorwidth;
                    Ymarker = conh - 32;
                    XGradient = Xmarker + (llineH * i);
                    YGradient = Ymarker;
                    lalign = "center";
                    break
                case "left":
                    ltextX = 40;
                    ltextY = ltextV;
                    Xmarker = ltextX - 10;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
                    break
                case "right":
                    ltextX = conw - (20 + (MaxArrayText(ObjectData, legendfont, ctx)));
                    ltextY = ltextV;
                    Xmarker = ltextX - 10;
                    Ymarker = lcolorheight;
                    XGradient = Xmarker;
                    YGradient = Ymarker + (llineV * i);
                    lalign = "left";
            }

            if (ObjectData[i].fillcolor == undefined) ObjectData[i].fillcolor = "gray";
            if (ObjectData[i].filltype == undefined) ObjectData[i].filltype = "color";
            //if (ObjectData[i].transparency == undefined || ObjectData[i].transparency > 1) ObjectData[i].transparency = 1;
            //if (ObjectData[i].transparency < 0) ObjectData[i].transparency = 0;
            if (ObjectData[i].style == undefined) ObjectData[i].style == "2d";
            if (ObjectData[i].strokewidth == undefined || ObjectData[i].strokewidth <= 0) ObjectData[i].strokewidth = 1E-45;

            if (legendposition != "none") {
                ctx.save();

                var shine = [];
                shine.push({ color: 'rgba(255,255,255,0.5)', stop: 0 });
                shine.push({ color: ObjectData[i].fillcolor, stop: 0.7 });

                var strokewidth = ObjectData[i].strokewidth

                if (ObjectData[i].strokewidth > 2) strokewidth = 3;
                if (ObjectData[i].strokewidth <= 0) strokewidth = 1E-45;
                bubblewidth = strokewidth;
                bubblestroke = ObjectData[i].strokecolor;
                if (ObjectData[i].strokecolor == undefined) bubblestroke = ObjectData[i].fillcolor;

                //GradientCircle(lcolorcW + (lline * i), lcolorcB, lradius / 5, lcolorcW + (lline * i), lcolorcB, lradius, grd, ctx);
                if (ObjectData[i].filltype == "color" && ObjectData[i].style == "3d") {
                    bubblefill = GradientCircle(XGradient, YGradient, lradius / 5, XGradient, YGradient, lradius, grad, ctx);
                    //GradientCircle(XGradient, YGradient, lradius / 5, XGradient, YGradient, lradius, grad, ctx);
                }
                else if (ObjectData[i].filltype == "color") {
                    bubblefill = ObjectData[i].fillcolor;
                }
                else if (ObjectData[i].filltype == "gradient") {
                    var grad = [];
                    for (var j = 0; j < ObjectData[i].fillcolor.length; j++) {
                        grad.push({ color: ObjectData[i].fillcolor[j].color, stop: ObjectData[i].fillcolor[j].stop });
                    }
                    //GradientH(y, width, height, grad, ctx, false);
                    bubblefill = GradientCircle(XGradient, YGradient, lradius / 5, XGradient, YGradient, lradius, grad, ctx);
                    //GradientCircle(XGradient, YGradient, lradius / 5, XGradient, YGradient, lradius, grad, ctx);
                }

                if (ObjectData[i].marker == undefined) ObjectData[i].marker = "o";
                //circle(Xmarker, Ymarker, lradius, bubblewidth, bubblefill, bubblestroke, ctx);
                Markers(ObjectData[i].marker, Xmarker, Ymarker, lradius, bubblewidth, bubblefill, bubblestroke, ctx);
                ctx.restore();
                TextDisplay(ObjectData[i].name, ltextX, ltextY, 0, legendfont.color, lalign, "middle", ctx);
            }
        }
    }

    //animation
    var a = elementID(canvasID);
    var p8draw = a.getAttribute("p8draw", true);
    var bubbleAnimate;
    if (animation == undefined) animation = false;

    if (animation == true) {
        if (p8draw != "true" && p8draw == undefined) {
            requestAnimFrame(animateBubble);
        } else {
            percent = 99;
            animateBubble();
        }
    }
    else {
        percent = 99;
        animateBubble();
    }

    //bubble
    ctx.beginPath();
    function animateBubble() {
        var a = elementID(canvasID);
        if (percent == 100) {
            cancelAnimFrame(bubbleAnimate);
            a.setAttribute("p8animate", false);
            a.setAttribute("p8draw", true);
        }
        else {
            if (percent < 100) {
                bubbleAnimate = requestAnimFrame(animateBubble);
            }
            percent++
            if (animation == true) percentanimation = percent / 100;
            else percentanimation = 1;
            clear(conw, conh, ctx);
            canvasdrawing();
            //percent++;
            /*if (percent < 100) {
                a.setAttribute("p8animate", true);
            }*/
            for (ic = 1; ic <= ObjectData.length; ic++) {
                if (ObjectData[ic - 1].fillcolor == undefined) ObjectData[ic - 1].fillcolor = "black";
                if (ObjectData[ic - 1].filltype == undefined) ObjectData[ic - 1].filltype = "color";
                if (ObjectData[ic - 1].style == undefined) ObjectData[ic - 1].style == "2d";
                if (ObjectData[ic - 1].strokewidth == undefined || ObjectData[ic - 1].strokewidth <= 0) ObjectData[ic - 1].strokewidth = 1E-45;
                if (ObjectData[ic - 1].marker == undefined) ObjectData[ic - 1].marker = "o";
                for (i = 0; i < data.length; i++) {
                    var bubblewidth, bubblefill, bubblestroke;

                    var datacolor = data[i].color;
                    if (data[i].color == undefined || ic > 1) datacolor = ObjectData[ic - 1].fillcolor;

                    valuex = -1 * (data[i][Object.keys(data[i])[ic]]);

                    var x;
                    if (xmeasure > 20) x = xnumbase + ((Math.floor(XCanvas - 62) / duration.xaxis) * i);//Xorigin + 5 + (w * i * (ObjectData.length)) - 8;
                    else x = Xorigin + 5 + (w * i * (ObjectData.length));
                    var y = YaddB;
                    var width = (w * ObjectData.length) / 2;
                    var height = (valuex * ratioX);

                    if (valuex > 0) y += 1;

                    var plotx = x + width;
                    liney = parseFloat(y + height) - 1;
                    valuearea = bubblearea[i][Object.keys(bubblearea[i])[ic]];

                    var circleradius = Math.round(conh * 0.092);

                    var circlewidth = (circleradius * (valuearea / maxbubblearea)) * percentanimation;
                    //gradient

                    bubblewidth = ObjectData[ic - 1].strokewidth;
                    bubblestroke = ObjectData[ic - 1].strokecolor;
                    if (ObjectData[ic - 1].strokecolor == undefined) bubblestroke = datacolor;

                    if (ObjectData[ic - 1].filltype == "color" && ObjectData[ic - 1].style == "3d") {
                        var shine = [];
                        shine.push({ color: 'rgba(255, 255, 255, 0.5)', stop: 0 });
                        shine.push({ color: datacolor, stop: 0.7 });
                        bubblefill = GradientCircle(plotx, liney, circlewidth / 5, plotx, liney - 1, circlewidth, shine, ctx);
                    }
                    else if (ObjectData[ic - 1].filltype == "color") {
                        bubblefill = datacolor;
                    }
                    else if (ObjectData[ic - 1].filltype == "gradient") {
                        var grad = [];
                        for (var j = 0; j < ObjectData[ic - 1].fillcolor.length; j++) {
                            grad.push({ color: ObjectData[ic - 1].fillcolor[j].color, stop: ObjectData[ic - 1].fillcolor[j].stop });
                        }
                        bubblefill = GradientCircle(plotx, liney, circlewidth / 5, plotx, liney - 1, circlewidth, grad, ctx);
                    }
                    //if (ObjectData[ic - 1].transparency == undefined || ObjectData[ic - 1].transparency > 1) ObjectData[ic - 1].transparency = 1;
                    //if (ObjectData[ic - 1].transparency < 0) ObjectData[ic - 1].transparency = 0;

                    //circle(plotx, liney, circlewidth, bubblewidth, bubblefill, bubblestroke, ctx, shadow.x, shadow.y, shadow.blur, shadow.color);

                    Markers(ObjectData[ic - 1].marker, plotx, liney, circlewidth, bubblewidth, bubblefill, bubblestroke, ctx);

                    if (duration.format == undefined) duration.format = "num";

                    if (duration.format == "num") format = xaxis[i].x;
                    else format = TimeDateElement(xaxis[i].x, duration.format);

                    var elementlabel = xaxis[i].label;
                    if (xaxis[i].label == undefined) elementlabel = format;
                    if (xaxis[i].x == undefined && xaxis[i].label == undefined) elementlabel = i;

                    if (valuex < 0) // if positive value
                    {
                        element = {
                            x: x
                            , y: (y + height) - circlewidth
                            , width: (width * 0.5) + circlewidth
                            , height: ((height * 0.01) * -1) + (circlewidth * 2)
                            , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                            , value: (data[i][Object.keys(data[i])[ic]])
                            , textaverage: bubblelabel
                            , valueaverage: (bubblearea[i][Object.keys(bubblearea[i])[ic]]) + "<br>"
                        };
                    }
                    else {
                        element = {
                            x: x
                            , y: (y + height) - circlewidth
                            , width: (width * 0.5) + circlewidth
                            , height: (height * 0.01) + (circlewidth * 2)
                            , text: "<b>" + elementlabel + "</b> <br>" + ObjectData[ic - 1].name
                            , value: (data[i][Object.keys(data[i])[ic]])
                            , textaverage: bubblelabel
                            , valueaverage: (bubblearea[i][Object.keys(bubblearea[i])[ic]]) + "<br>"
                        };
                    }
                    if (percent == 100) elementlist.push(element);
                }
            }
            canvaslabel();
            legend();
        } //end else
    }//end function animate bubble
    ctx.closePath();

    //draw hover
    var hoverfontsize = 12;
    var hover = elementID(canvasID);
    if (option.iscreated == false || option.iscreated == undefined) {
        option.iscreated = true;
        hover.addEventListener("mousemove", function (event) {

            var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;

            var coordinates = getCursorPosition(hover, event);
            var y = coordinates.y;
            var x = coordinates.x;
            //console.log(y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width);
            //console.log(y +">"+ element.y +"&&"+y +"<"+ element.y + element.height +"&&" + x > element.x +"&&"+ x +"<"+ element.x + element.width);
            elementlist.forEach(function (element) {
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {
                    //redraw with tooltip
                    for (j = 0; j < ObjectData.length; j++) {
                        document.getElementById(canvasIDcon + "_hover").style.display = "block";
                        var txt = element.text + ": " + parseInt(element.value) + "<br>" + element.textaverage + ": " + parseInt(element.valueaverage);
                        var e = document.getElementById(canvasIDcon + "_hover");
                        e.innerHTML = "<div style='color:white;padding:5px;'>" + txt + "</div>";
                        e.style.fontFamily = "Arial";
                        e.style.fontSize = hoverfontsize + "px";
                        e.style.marginTop = y + hoverfontsize + 15 + "px";
                        e.style.marginLeft = x + "px";
                        e.style.textAlign = "center";
                        e.style.position = "absolute";
                        e.style.backgroundColor = rgba(0, 0, 0, 0.5);
                    }
                }
            });
            //console.log( " x:" +coordinates.x + " y:" + coordinates.y);
        }, false);

        hover.addEventListener("mouseout", function (event) {
            var a = elementID(canvasID);
            document.getElementById(canvasIDcon + "_hover").style.display = "none";
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;
        }, false);
    }
}
//end of Bubble Chart

//Pie Chart
P8.PieChart = function (canvasID) {
    var size = {
        width: 660
        , height: 400
    }
    var colordata = [];
    colordata.push({ name: "Item1", color: "red" });
    colordata.push({ name: "Item2", color: "blue" });
    colordata.push({ name: "Item3", color: "yellow" });

    var data = [];
    data.push({ id: 0, value: 50 });
    data.push({ id: 1, value: 50 });
    data.push({ id: 2, value: 50 });

    //Line Option
    var optionLine = {
        color: "Black"
        , width: 1
    };
    optionH = { //header
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Sample Chart"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    optionF = { //footer
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Footer"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    //Legend Font Option
    optionLegendFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: ""
        , fontStyle: "Normal"
    };
    var background = 'rgba(0,0,0,0)'; //transparent
    option = {
        canvasID: canvasID
        , colordata: colordata
        , data: data
        , background: background
        , header: optionH
        , footer: optionF
        , line: optionLine
        , legendfont: optionLegendFont
        , size: size
    };
    this.option = option;
};
P8.PieChart.prototype.SetOption = function (option) {
    this.option = option;
};
P8.PieChart.prototype.SetColorData = function (colordata) {
    this.option.colordata = colordata;
};
P8.PieChart.prototype.SetData = function (data) {
    this.option.data = data;
};
P8.PieChart.prototype.SetBackground = function (background) {
    this.option.background = background;
};
P8.PieChart.prototype.SetHeader = function (header) {
    this.option.header = header;
};
P8.PieChart.prototype.SetFooter = function (footer) {
    this.option.footer = footer;
};
P8.PieChart.prototype.SetLine = function (line) {
    this.option.line = line;
};
P8.PieChart.prototype.SetLegendFont = function (legendfont) {
    this.option.legendfont = legendfont;
};
P8.PieChart.prototype.SetSize = function (size) {
    this.option.size = size;
}
P8.PieChart.prototype.Render = function () {
    PieChart(this.option);
};

//start of canvas
function PieChart(option) {
    var canvasIDcon = option.canvasID;
    var canvasID = option.canvasID + "_canvas";

    var elementcanvas = document.getElementById(canvasID);

    if (elementcanvas == undefined) {

        var element = document.getElementById(canvasIDcon);

        var para = document.createElement("div");
        para.id = canvasIDcon + "_hover";
        element.appendChild(para);

        var para = document.createElement("canvas");
        para.id = canvasID;
        para.width = option.size.width;
        para.height = option.size.height;
        para.style.backgroundColor = option.background;
        para.style.borderStyle = "solid";
        para.style.borderColor = "black";
        para.style.borderWidth = "thin";

        element.appendChild(para);
    }

    var ctx = Canvas(canvasID);
    var conw = option.size.width;//660 default number
    var conh = option.size.height;//400 default number
    var centerX = Math.round((conw / 2) * 1.211);
    var centerY = conh / 2;
    var center = centerX + centerY;
    var start = -PI / 2;
    var circum = PI * 2;
    var total = 0;
    var elementlist = [];

    var background = option.background;
    var lineoption = option.line;
    var legendfont = option.legendfont;
    var data = option.data;
    var colordata = option.colordata;

    var mid = {
        x: conw / 2,
        y: conh / 2,
        r: conh * 0.35
    }

    function canvaslabel() {
        //header
        var suboptionH = option.header;
        Font(suboptionH.fontSize, suboptionH.fontWeight, suboptionH.fontFamily, suboptionH.fontStyle, ctx);
        TextDisplay(suboptionH.text, conw / 2, Math.round(conh * 0.04), 0, suboptionH.color, "center", "hanging", ctx);

        //footer
        var suboptionF = option.footer;
        Font(suboptionF.fontSize, suboptionF.fontWeight, suboptionF.fontFamily, suboptionF.fontStyle, ctx);
        TextDisplay(suboptionF.text, conw / 2, Math.round(conh * 0.97), 0, suboptionF.color, "center", "alphabetic", ctx);
    }

    function legend() {
        //legend
        for (i = 0; i < colordata.length; i++) {
            var lbase = 40; //40
            var lheight = conh * 0.5;
            var lline = 17;
            lheight -= ((lline / 2) * colordata.length);
            var lcolor = lheight - 10;
            var lcolorbase = Math.round(conw * 0.038); //25
            var scolorsize = Math.round(center * 0.023); //12

            Font(legendfont.fontSize, legendfont.fontWeight, legendfont.fontFamily, legendfont.fontStyle, ctx);
            TextDisplay(colordata[i].name, lbase, lheight + (lline * i), 0, legendfont.color, "left", "alphabetic", ctx);

            ctx.fillStyle = colordata[i].color;
            ctx.strokeStyle = lineoption.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(lcolorbase, lcolor + (lline * i), scolorsize, scolorsize);
            ctx.fillRect(lcolorbase, lcolor + (lline * i), scolorsize, scolorsize);
        }
    }

    function toDegrees(angle) {
        return angle * (180 / PI);
    }

    function toRadians(angle) {
        return angle * (PI / 180);
    }

    /*var a = elementID(canvasID);
    var p8draw = a.getAttribute("p8draw", true);

    if (p8draw != "true" && p8draw == undefined) {
        //ChartAnimate = setInterval(animateChart, 10);
        animatePie();
    } else {
        percent = 99;
        animatePie();
    }*/

    //total values
    for (i = 0; i < data.length; i++) {
        total += data[i].value;
    }

    //pie chart
    function animatePie() {
        ctx.beginPath();
        //ctx = copy_ctx without element bar/line
        //var a = elementID(canvasID);
        /*if (percent == 100) {
            window.cancelAnimationFrame(animatePie);
            //a.setAttribute("p8animate", false);
            //a.setAttribute("p8draw", true);
        }
        else {
            if (percent < 100) {
                window.requestAnimationFrame(animatePie);
            }
            percent++
            */
        clear(conw, conh, ctx);
        //Pie Chart
        for (i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colordata[i].color;
            ctx.lineWidth = lineoption.width;
            //ctx.moveTo(conw / 2, conh / 2);
            var angle = circum * (data[i].value / total);
            var endangle = start + angle //* (50/100);
            // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
            ctx.arc(mid.x, mid.y, mid.r, start, endangle, false);
            ctx.lineTo(conw / 2, conh / 2);
            ctx.fill();
            element = {
                start: start
                , endangle: endangle//(circum * (data[i].value / total))
                , text: colordata[i].name
                , value: data[i].value
            }
            //if (percent == 100)
            elementlist.push(element);
            start = endangle;
        }
        canvaslabel();
        legend();
        //}//end else
        ctx.closePath();
    } // end animatePie
    animatePie();

    /*var cx = conw / 2;
    var cy = conh / 2;*/

    //draw hover
    var hoverfontsize = 12;
    var hover = elementID(canvasID);
    if (option.iscreated == false || option.iscreated == undefined) {
        option.iscreated = true;
        hover.addEventListener("mousemove", function (event) {

            /*var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;*/

            var coordinates = getCursorPosition(hover, event);
            var y = coordinates.y;
            var x = coordinates.x;
            y -= mid.y;
            x -= mid.x;
            var dist = Math.sqrt(x * x + y * y);
            //console.log(y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width);
            //console.log(y +">"+ element.y +"&&"+y +"<"+ element.y + element.height +"&&" + x > element.x +"&&"+ x +"<"+ element.x + element.width);
            elementlist.forEach(function (element) {
                //if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {

                //}
                if (dist < mid.r) {
                    var ang = Math.atan2(y, x);
                    ang += PI * 2;
                    ang %= PI * 2;
                    var angletan = 0;
                    while (i < element.value) {
                        if (ang < angletan + (element.endangle + element.start)) {
                            break;
                        }
                        angletan += element.start;
                        angletan += element.endangle;
                        i += 1;
                    }
                    //redraw with tooltip
                    document.getElementById(canvasIDcon + "_hover").style.display = "block";
                    var txt = element.text + ": " + parseInt(element.value);
                    var e = document.getElementById(canvasIDcon + "_hover");
                    e.innerHTML = "<div style='color:white;padding:5px;'>" + txt + "</div>";
                    e.style.marginTop = y + 200 + hoverfontsize + 15 + "px";
                    e.style.marginLeft = x + 330 + "px";
                    e.style.textAlign = "center";
                    e.style.position = "absolute";
                    e.style.backgroundColor = rgba(0, 0, 0, 0.5);
                    ctx.restore();
                    //c.title = element.value;
                }
            });
            //console.log( " x:" +coordinates.x + " y:" + coordinates.y);
        }, false);

        hover.addEventListener("mouseout", function (event) {
            document.getElementById(canvasIDcon + "_hover").style.display = "none";
            /*var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;*/
        }, false);
    } //end of hover
}//end of canvas

//Doughnut Chart
P8.DoughnutChart = function (canvasID) {
    var size = {
        width: 660
        , height: 400
    }
    var colordata = [];
    colordata.push({ name: "Item1", color: "red" });
    colordata.push({ name: "Item2", color: "blue" });
    colordata.push({ name: "Item3", color: "yellow" });

    var data = [];
    data.push({ id: 0, value: 50 });
    data.push({ id: 1, value: 50 });
    data.push({ id: 2, value: 50 });

    //Line Option
    var optionLine = {
        color: "Black"
        , width: 1
    };
    var optionH = { //header
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Sample Chart"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };
    var optionF = { //footer
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 12
        , text: "Test Footer"
        , fontWeight: "Bold"
        , fontStyle: "Normal"
    };

    //Legend Font Option
    var optionLegendFont = {
        color: "Black"
        , fontFamily: "Arial"
        , fontSize: 10
        , fontWeight: ""
        , fontStyle: "Normal"
    };
    var background = 'rgba(0,0,0,0)'; //transparent
    option = {
        canvasID: canvasID
        , colordata: colordata
        , data: data
        , background: background
        , header: optionH
        , footer: optionF
        , line: optionLine
        , legendfont: optionLegendFont
        , size: size
    };
    this.option = option;
};
P8.DoughnutChart.prototype.SetOption = function (option) {
    this.option = option;
};
P8.DoughnutChart.prototype.SetColorData = function (colordata) {
    this.option.colordata = colordata;
};
P8.DoughnutChart.prototype.SetData = function (data) {
    this.option.data = data;
};
P8.DoughnutChart.prototype.SetBackground = function (background) {
    this.option.background = background;
};
P8.DoughnutChart.prototype.SetHeader = function (header) {
    this.option.header = header;
};
P8.DoughnutChart.prototype.SetFooter = function (footer) {
    this.option.footer = footer;
};
P8.DoughnutChart.prototype.SetLine = function (line) {
    this.option.line = line;
};
P8.DoughnutChart.prototype.SetLegendFont = function (legendfont) {
    this.option.legendfont = legendfont;
};
P8.DoughnutChart.prototype.SetSize = function (size) {
    this.option.size = size;
}
P8.DoughnutChart.prototype.Render = function () {
    DoughnutChart(this.option);
};

//start of canvas
function DoughnutChart(option) {
    var canvasIDcon = option.canvasID;
    var canvasID = option.canvasID + "_canvas";

    var elementcanvas = document.getElementById(canvasID);

    if (elementcanvas == undefined) {

        var element = document.getElementById(canvasIDcon);

        var para = document.createElement("div");
        para.id = canvasIDcon + "_hover";
        element.appendChild(para);

        var para = document.createElement("canvas");
        para.id = canvasID;
        para.width = option.size.width;
        para.height = option.size.height;
        para.style.backgroundColor = option.background;
        para.style.borderStyle = "solid";
        para.style.borderColor = "black";
        para.style.borderWidth = "thin";

        element.appendChild(para);
    }

    var ctx = Canvas(canvasID);
    var conw = option.size.width;//660 default number
    var conh = option.size.height;//400 default number
    var centerX = Math.round((conw / 2) * 1.211);
    var centerY = conh / 2;
    var center = centerX + centerY;
    var start = PI / -2;
    var circum = PI * 2;
    var total = 0;
    var elementlist = [];

    var background = option.background;
    var lineoption = option.line;
    var legendfont = option.legendfont;
    var data = option.data;
    var colordata = option.colordata;

    var mid = {
        x: conw / 2,
        y: conh / 2,
        r: conh * 0.35
    }

    function canvaslabel() {
        //header
        var suboptionH = option.header;
        Font(suboptionH.fontSize, suboptionH.fontWeight, suboptionH.fontFamily, suboptionH.fontStyle, ctx);
        TextDisplay(suboptionH.text, conw / 2, Math.round(conh * 0.04), 0, suboptionH.color, "center", "hanging", ctx);

        //footer
        var suboptionF = option.footer;
        Font(suboptionF.fontSize, suboptionF.fontWeight, suboptionF.fontFamily, suboptionF.fontStyle, ctx);
        TextDisplay(suboptionF.text, conw / 2, Math.round(conh * 0.97), 0, suboptionF.color, "center", "alphabetic", ctx);
    }

    function legend() {
        //legend
        for (i = 0; i < colordata.length; i++) {
            var lbase = conw - 50;
            var lheight = conh * 0.5;
            var lline = 17;
            lheight -= ((lline / 2) * colordata.length);
            var lcolor = lheight - 10;
            var lcolorbase = lbase - 15 //25
            var scolorsize = Math.round(center * 0.023); //12

            Font(legendfont.fontSize, legendfont.fontWeight, legendfont.fontFamily, legendfont.fontStyle, ctx);
            TextDisplay(colordata[i].name, lbase, lheight + (lline * i), 0, legendfont.color, "left", "alphabetic", ctx);

            ctx.fillStyle = colordata[i].color;
            ctx.strokeStyle = lineoption.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(lcolorbase, lcolor + (lline * i), scolorsize, scolorsize);
            ctx.fillRect(lcolorbase, lcolor + (lline * i), scolorsize, scolorsize);
        }
    }

    function toDegrees(angle) {
        return angle * (180 / PI);
    }

    function toRadians(angle) {
        return angle * (PI / 180);
    }

    /*var a = elementID(canvasID);
    var p8draw = a.getAttribute("p8draw", true);

    if (p8draw != "true" && p8draw == undefined) {
        //ChartAnimate = setInterval(animateChart, 10);
        animateDoughnut();
    } else {
        percent = 99;
        animateDoughnut();
    }*/

    //total values
    for (i = 0; i < data.length; i++) {
        total += data[i].value;
    }

    //pie chart

    function animateDoughnut() {
        ctx.beginPath();
        //ctx = copy_ctx without element bar/line
        //var a = elementID(canvasID);
        /*if (percent == 100) {
            window.cancelAnimationFrame(animateDoughnut);
            //a.setAttribute("p8animate", false);
            //a.setAttribute("p8draw", true);
        }
        else {*/
        /*if (percent < 100) {
            window.requestAnimationFrame(animateDoughnut);
        }
        percent++
        */
        clear(conw, conh, ctx);
        for (i = 0; i < data.length; i++) {
            ctx.beginPath();
            //ctx.fillStyle = colordata[i].color;
            ctx.strokeStyle = colordata[i].color;
            ctx.lineWidth = mid.r * 0.5;//80;
            //
            var angle = circum * (data[i].value / total)
            var endangle = start + angle;
            // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
            ctx.arc(mid.x, mid.y, mid.r * 0.75, start /** (percent / 100)*/, endangle, false);
            ctx.stroke();

            element = {
                angle: (circum * (data[i].value / total))
                , text: colordata[i].name
                , value: data[i].value
            }
            //if (percent == 100)
            elementlist.push(element);
            start = endangle;
        }
        canvaslabel();
        legend();
        //}//end else
        ctx.closePath();
    } // end animateDoughnut
    animateDoughnut();


    //draw hover
    var hoverfontsize = 12;
    var hover = elementID(canvasID);
    if (option.iscreated == false || option.iscreated == undefined) {
        option.iscreated = true;
        hover.addEventListener("mousemove", function (event) {

            /*var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;*/

            var coordinates = getCursorPosition(hover, event);
            var y = coordinates.y;
            var x = coordinates.x;
            y -= mid.y;
            x -= mid.x;
            var dist = Math.sqrt(x * x + y * y);
            //console.log(y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width);
            //console.log(y +">"+ element.y +"&&"+y +"<"+ element.y + element.height +"&&" + x > element.x +"&&"+ x +"<"+ element.x + element.width);
            elementlist.forEach(function (element) {
                if (dist < mid.r) {
                    var ang = Math.atan2(y, x);
                    ang += PI * 2;
                    ang %= PI * 2;
                    var angletan = 0;
                    while (i < element.value) {
                        if (ang < angletan + element.angle) {
                            break;
                        }
                        angletan += element.angle;
                        i += 1;
                    }
                    document.getElementById(canvasIDcon + "_hover").style.display = "block";
                    var txt = element.text + ": " + parseInt(element.value)
                    var e = document.getElementById(canvasIDcon + "_hover");
                    e.innerHTML = "<div style='color:white;padding:5px;'>" + txt + "</div>";
                    e.style.marginTop = y + 200 + hoverfontsize + 15 + "px";
                    e.style.marginLeft = x + 330 + "px";
                    e.style.textAlign = "center";
                    e.style.position = "absolute";
                    e.style.backgroundColor = rgba(0, 0, 0, 0.5);
                    //c.title = element.value;
                }
            });
            //console.log( " x:" +coordinates.x + " y:" + coordinates.y);
        }, false);

        hover.addEventListener("mouseout", function (event) {
            document.getElementById(canvasIDcon + "_hover").style.display = "none";
            /*var a = elementID(canvasID);
            var p8animate = a.getAttribute("p8animate", false);
            var p8draw = a.getAttribute("p8draw", false);
            if (p8animate == "true") return false;
            if (p8draw != "true") return false;*/
        }, false);
    } //end of hover
}//end of canvas