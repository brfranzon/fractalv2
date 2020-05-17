/* Load DOM*/
onload = function () {
    execute();
}

let changeBtn = document.getElementById("btn-change");
changeBtn.onclick = execute;


function execute() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    /** Tree Position*/
    var p0 = {
        x: width / 2,
        y: height
    },
        p1 = {
            x: width / 2,
            y: height / 2
        },


        p0_1 = {
            x: width / 6,
            y: height / 1.2
        },
        p1_1 = {
            x: width / 6,
            y: 20
        },


        p0_2 = {
            x: 6 * width / 8,
            y: 2 * height / 3
        },

        p1_2 = {
            x: 6 * width / 8,
            y: 10
        },
        trunkRatio = 0.4;


    /* brachAngle */
    function changeAngle() {
        return brachAngle = Math.random(-Math.PI / 2, Math.PI / 2);
    }


    tree(p0, p1, 7);
    tree(p0_1, p1_1, 7);
    tree(p0_2, p1_2, 7);

    function tree(p0, p1, limit) {
        ctx.strokeStyle = "purple";

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
                x: pA.x + Math.cos(angle + changeAngle()) * branchLength,
                y: pA.y + Math.sin(angle + changeAngle()) * branchLength
            },

            pC = {
                x: pA.x + Math.cos(angle - changeAngle()) * branchLength,
                y: pA.y + Math.sin(angle - changeAngle()) * branchLength

            }

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(pA.x, pA.y);
        ctx.stroke();

        /** Limit definiert die Äste*/
        if (limit > 0) {
            let interval = setInterval(() => {
                tree(pA, pC, limit - 1);
                tree(pA, pB, limit - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
            }, 2000);

        } else {
            ctx.beginPath();
            ctx.setLineDash([5, 3])
            ctx.moveTo(pB.x, pB.y);
            ctx.lineTo(pA.x, pA.y);
            ctx.lineTo(pC.x, pC.y)
            ctx.strokeStyle = "green";
            ctx.stroke();
        }

    }
}





