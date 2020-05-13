onload = function () {

    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;


    var p0 = {
        x: width / 2,
        y: height
    },

        p1 = {
            x: width / 2,
            y: 0
        },

        brachAngle = Math.PI / 6,
        trunkRatio = 0.4;

    tree(p0, p1, 6);


    function tree(p0, p1, limit) {

        var jetzt = new Date().getTime();

        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx),
            branchLength = dist * (1 - trunkRatio),

            pA = {
                x: p0.x + dx * trunkRatio,
                y: p0.y + dy * trunkRatio
            },

            pB = {
                x: pA.x + Math.cos(angle + brachAngle) * branchLength,
                y: pA.y + Math.sin(angle + brachAngle) * branchLength
            },

            pC = {
                x: pA.x + Math.cos(angle - brachAngle) * branchLength,
                y: pA.y + Math.sin(angle - brachAngle) * branchLength

            }

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(pA.x, pA.y);
        ctx.stroke();

        if (limit > 0) {

            let interval = setInterval(() => {
                tree(pA, pC, limit - 1);
                tree(pA, pB, limit - 1);
            }, 2000);

           setTimeout(() => {
                clearInterval(interval);
            }, 2000);

            console.log( limit )

        } else {

            ctx.beginPath();
            ctx.moveTo(pB.x, pB.y);
            ctx.lineTo(pA.x, pA.y);
            ctx.lineTo(pC.x, pC.y)
            ctx.stroke();

        }


    }

}





