function Iso3d(x, y, width, h) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.h = h;
    this.flag = false;
    this.colors = ["#808080", "#A9A9A9", "#909090"];
};
Iso3d.prototype.drawCube = function () {
    let ss = [this.width * 0.5, this.y - this.h, this.x - this.width, this.x + this.width];
    ss[4] = ss[1] - ss[0];
    this.path = [new Path2D(), new Path2D(), new Path2D()];
    let drawSide = (path, args) => {
        path.moveTo(args[0], args[1]);
        path.lineTo(args[2], args[3]);
        path.lineTo(args[4], args[5]);
        path.lineTo(args[6], args[7]);
        path.closePath()
    };
    drawSide(this.path[0], [this.x, this.y, ss[2], this.y - ss[0], ss[2], ss[4], this.x, ss[1] * 1]);
    drawSide(this.path[1], [this.x, this.y, ss[3], this.y - ss[0], ss[3], ss[4], this.x, ss[1] * 1]);
    drawSide(this.path[2], [this.x, ss[1], ss[2], ss[4], ss[2] + this.width, ss[1] - ss[0] * 2, ss[3], ss[4]]);
    return this;
};
Iso3d.prototype.fillCube = function (ctx) {
    for (let i = 0; i < this.path.length; i++) {
        ctx.fillStyle = this.colors[i];
        ctx.fill(this.path[i]);
        ctx.stroke(this.path[i]);
    };
    return this;
};

Iso3d.prototype.collision = function (ctx, mouseX, mouseY, event, map, row, col, el,block) {
    this.flag = false;
    //  let dir
    for (let i = 0; i < this.path.length; i++) {
        if (ctx.isPointInPath(this.path[i], mouseX, mouseY)) {
            this.flag = true;
            //  dir = i
            //  break;
        };
    };

    let value = this;
    if (value.flag == true) {
        ctx.canvas.onclick = function () {
            if (value.flag == true) {
                let events = {
                    increaseSize: () => {
                        let baseEl = map[row][col][el];
                        let ind = true;
                        for (let i = 0; i < map[row][col].length; i++) {
                            if (map[row][col][i].y == baseEl.y - baseEl.width) {
                                ind = false
                            }
                        }
                        if (ind == true) {
                            map[row][col][map[row][col].length] = new Iso3d(baseEl.x, baseEl.y - baseEl.width, baseEl.width, baseEl.h).drawCube()
                            map[row][col][map[row][col].length-1].colors = block
                        }

                        //if (dir == 2) {
                        //    map[row][col][map[row][col].length] = new Iso3d(baseEl.x, baseEl.y - baseEl.width, baseEl.width, baseEl.h).drawCube()
                        //} else if (dir == 1) {
                        //    if (map[row][col + 1]) {
                        //        map[row][col + 1][map[row][col + 1].length] = new Iso3d(baseEl.x + baseEl.width, baseEl.y + baseEl.width / 2, baseEl.width, baseEl.h).drawCube()
                        //    }
                        //} else if (dir == 0) {
                        //    if (map[row + 1][col]) {
                        //        map[row + 1][col][map[row + 1][col].length] = new Iso3d(baseEl.x - baseEl.width, baseEl.y + baseEl.width / 2, baseEl.width, baseEl.h).drawCube()
                        //    }
                        //}
                    },
                    removeTile: () => {
                        map[row][col] = map[row][col].filter(item => item !== map[row][col][el]);
                    }
                };
                events[event]();
                value.drawCube();
            };
        };
    };
    return this;
};
