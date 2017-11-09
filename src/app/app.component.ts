import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = `PoyChang's Chrome Extension`;

  codeOfSnow = {
    html: `
    document.body.innerHTML += '<canvas id="canvas"></canvas>';
    `,
    js: `
    (function() {
        var requestAnimationFrame =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    var flakes = [],
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        flakeCount = 400,
        mX = -100,
        mY = -100

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 150,
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                reset(flake);
            }

            if (flake.x >= canvas.width || flake.x <= 0) {
                reset(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(snow);
    };

    function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;
        flake.speed = (Math.random() * 1) + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;
    }

    function init() {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = (Math.random() * 3) + 2,
                speed = (Math.random() * 1) + 0.5,
                opacity = (Math.random() * 0.5) + 0.3;

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30,
                step: 0,
                opacity: opacity
            });
        }
        snow();
    };

    canvas.addEventListener("mousemove", function(e) {
        mX = e.clientX,
        mY = e.clientY
    });

    window.addEventListener("resize",function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })

    init();
    `,
    css: `
    body{margin:0;height:100%;}
    canvas{
        position:absolute;top:0;left:0
    }
    `
  };
  snow() {
    console.log('下雪囉！(https://codepen.io/loktar00/pen/CHpGo)');

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.executeScript(
          tabs[0].id, {code: this.codeOfSnow.html}, (response) => {});
      chrome.tabs.executeScript(
          tabs[0].id, {code: this.codeOfSnow.js}, (response) => {});
      chrome.tabs.insertCSS(
          tabs[0].id, {code: this.codeOfSnow.css}, (response) => {});
    });
  }

  cleaningArtech() {
    console.log('將此網站(http://www.cnblogs.com/artech/)的文章版面清乾淨 ;)');

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.executeScript(
          tabs[0].id, {
            code: `
          document.getElementById('sideBar').remove();
          document.getElementById('myRewards').remove();
          document.getElementById('div_digg').remove();
          document.getElementsByClassName('forFlow')[0].style.marginLeft = 0;
          `
          },
          (response) => {});
      chrome.tabs.insertCSS(
          tabs[0].id, {
            code: `
          body{font-size:12pt;}
          `
          },
          (response) => {});
    });
  }

  click() {
    console.log('常用的 Chrome Extension 指令');

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.executeScript(
          tabs[0].id, {code: `console.log('Execute JavaScript!');`},
          (response) => {});
      chrome.tabs.insertCSS(tabs[0].id, {code: `body{}`}, (response) => {});
    });
  }
}
