function init() {

    stage = new createjs.Stage("demoCanvas");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stage.canvas.addEventListener("click", handleClick);

    function handleClick(event){
        createCircles(['#309975','#dad873','#efeeb4','#58b368'], 2, stage, event);
    }
}


function createCircles(colors, count, stage, event) {
    var length = colors.length;
    for (var i = 0; i < count; i++) {
        circleWidth = Math.floor(Math.random() * (50 - 10) + 10);

        circle = new createjs.Shape();
        circle.graphics.beginFill(colors[Math.floor(Math.random() * length)])
        .drawCircle(0, 0, circleWidth);

        // circle.y = Math.floor(Math.random() * (stage.canvas.height - 300));
        // circle.x = Math.floor(Math.random() * stage.canvas.width);

        circle.y = randomIntFromInterval(event.y-200, event.y+200);

        circle.x = randomIntFromInterval(event.x-200, event.x+200);

        circle.shadow = new createjs.Shadow("#000000", 5, 5, 10);

        stage.addChild(circle);

        createjs.Tween.get(circle, { loop: true })
        .to({ y: stage.canvas.height- circleWidth}, 1000, createjs.Ease.getPowIn(4))
        .to({ y: circle.y}, 600, createjs.Ease.getPowOut(2))
        createjs.Tween.get(circle, { loop: true })
        .to({ x: stage.canvas.width}, Math.floor(Math.random() * (10000 - 6000) + 6000), createjs.Ease.linear())
        .to({ x: 0}, 0)
        .to({ x: circle.x}, Math.floor(Math.random() * (10000 - 6000) + 6000), createjs.Ease.linear())


    }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


