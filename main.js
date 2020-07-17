var title = document.querySelectorAll(".grid1_text");
var shops = document.querySelectorAll(".grid1_img");
console.log(title);
console.log(shops);
var y = true;
function mov() {
    if (y) {
        title[0].style.background = "#00B262";
        shops[0].style.display = "block";
        title[1].style.background = 'rgb(241,241,241)';
        shops[1].style.display = "none";
        y = false;
    } else {
        title[1].style.background = "#00B262";
        shops[1].style.display = "block";
        title[0].style.background = 'rgb(241,241,241)';
        shops[0].style.display = "none";
        y = true
    }
}

for (let i = 0; i < title.length; i++) {
    title[i].onclick = function () {
        for (var j = 0; j < title.length; j++) {
            title[j].style.background = 'rgb(241,241,241)';
            shops[j].style.display = "none";
        }
        title[i].style.background = "#00B262";
        shops[i].style.display = "block";
    }
}


var f = setInterval(mov, 4000);

for (let r = 0; r < title.length; r++) {
    title[r].onmouseover = function () {
        for (var l = 0; l < title.length; l++) {
            title[l].style.background = 'rgb(241,241,241)';
            shops[l].style.display = "none";
        }
        title[r].style.background = "#00B262";
        shops[r].style.display = "block";
        clearInterval(f);
    }
    title[r].onmouseout = function () {
        f = setInterval(mov, 4000);
    }
}



//轮播图
function css(obj, attr, val) {
    if (arguments.length == 2) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
                return getComputedStyle(obj, null)[attr];
                break;
            default:
                return parseInt(getComputedStyle(obj, null)[attr]);
        }
    } else if (arguments.length == 3) {
        switch (attr) {
            case "background":
            case "color":
            case "opacity":
                obj.style[attr] = val
            default:
                obj.style[attr] = val + "px";
        }

    }
}

function animate(obj, attrObj, duration, fn, callback) {
    clearInterval(obj.t);

    if (obj.nodeType != 1) {
        console.log("类型不对");
        return;
    }
    var start = {};
    var change = {};
    var time = 0;
    var fn = fn || Tween.Linear;
    for (var i in attrObj) {
        start[i] = css(obj, i);

        change[i] = attrObj[i] - start[i];

    }
    obj.t = setInterval(() => {
        time = time + 50;
        for (var i in attrObj) {
            css(obj, i, fn(time, start[i], change[i], duration));
        }
        if (time >= duration) {
            for (var i in attrObj) {
                css(obj, i, attrObj[i])
            }
            clearInterval(obj.t);
            if (callback) {
                callback();
            }
        }
    }, 50);
}



var imgs = document.querySelectorAll(".lunbo_img");
var but = document.querySelectorAll(".butt li");

var num = 0;



var t = setInterval(() => {
    num++;
    if (num > imgs.length - 1) {
        num = 0;
    }
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0;
        imgs[i].style.zIndex = 0;
        but[i].style.background = "#000";
        but[i].style.opacity = 0.3;
    }
    animate(imgs[num], {
        opacity: 1
    }, 300, Tween.Linear, function () {
        imgs[num].style.zIndex = 1;
        but[num].style.background = "#fff"
    })
}, 3000);


for (let h = 0; h < but.length; h++) {
    num = h;
    but[h].onclick = function () {
        console.log("点击 " + h)
        console.log(but[h]);
        for (var k = 0; k < but.length; k++) {
            imgs[k].style.opacity = 0;
            imgs[k].style.zIndex = 0;
            but[k].style.background = "#000";
            but[k].style.opacity = 0.3;
        }

        animate(imgs[h], {
            opacity: 1
        }, 300, Tween.Linear, function () {
            imgs[h].style.zIndex = 1;
            but[h].style.background = "#fff";
        })
        console.log(imgs[h]);
        clearInterval(t);
    }


}





var topsearch = document.querySelector(".topsearch");
var fenlei = document.querySelector(".fenlei");
window.onscroll = function () {
    var st = document.documentElement.scrollTop;
    if (st > 1000) {
        animate(topsearch, {
            top: 0
        }, 300)
    } else {
        animate(topsearch, {
            top: -50
        }, 300)
    }
    if (st > 800) {
        fenlei.style.transform = "scale(1,1)";
    } else {
        fenlei.style.transform = "scale(0,0)"
    }
}


