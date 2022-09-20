function Chunk(ctx) {
    this.mapData = [];
    this.ctx = ctx;
    this.flying = 0;
    this.flying2 = 0;
    this.action = "cube"
    this.points = (xx, yy, color) => { return { x: xx, y: yy, colors: color } }
    this.cube = (x, y, color) => {
        let cube = new Iso3d(x, y, 25, 25).drawCube()
        cube.colors = color
        return cube
    }
};
Chunk.prototype.createFlatChunk = function (tileW, tileZ, xx, yy, x, y, z) {
    this.mapData = [];
    let oriX = xx;
    let oriY = yy;
    for (let i = 0; i < x; i++) {
        this.mapData[i] = [];
        for (let j = 0; j < y; j++) {
            this.mapData[i][j] = [];
            for (let k = 0; k < z; k++) {
                this.mapData[i][j][k] = this[this.action](xx, yy, "808080A9A9A9909090")
                yy -= tileZ;
            };
            xx += tileW;
            yy += tileW / 2;
            yy += tileZ * z;
        };
        xx = oriX -= tileW;
        yy = oriY += tileW / 2;
    };
    return this;
};

// Chunk.prototype.cull = function () {
//     for (let i = 0; i < this.mapData.length - 1; i++) {
//         for (let j = 0; j < this.mapData[i].length - 1; j++) {
//             for (let k = 0; k < this.mapData[i][j].length - 1; k++) {
//                 // if (this.mapData[i][j][k + 1] && this.mapData[i][j + 1][k] && this.mapData[i + 1][j][k]) {
//                 //   this.mapData[i][j][k].dontRender = true
//                 //    }
//             }
//             this.mapData[i][j] = this.mapData[i][j].filter(item => item.dontRender !== true);
//         }
//     }
// }
Chunk.prototype.loadChunk = function (mouseX, mouseY, operation, block) {
    for (let i = 0; i < this.mapData.length; i++) {
        for (let j = 0; j < this.mapData[i].length; j++) {
            for (let k = 0; k < this.mapData[i][j].length; k++) {
                if (!this.mapData[i][j][k].dontRender) {
                    if (this.action == "cube") {
                        this.mapData[i][j][k].collision(this.ctx, mouseX, mouseY, operation, this.mapData, i, j, k, block)
                    }
                    this.ctx.drawImage(document.getElementById(this.mapData[i][j][k].colors), this.mapData[i][j][k].x - 25, this.mapData[i][j][k].y - 50)
                }
            };
        };
    };
    return this;
};
Chunk.prototype.setDirection = function (num, op, num1, op2, gridSize, resolution) {
    if (num, op) {
        eval(`this.${num} ${op}= gridSize / resolution`);
    };
    if (num1, op2) {
        eval(`this.${num1} ${op2}= gridSize / resolution`);
    };
    return this;
};
Chunk.prototype.createPerlinChunk = function (perlin, gridSize, resolution, groundLayers, heightLimit) {
    if (resolution != 0) {
        let m = []
        let yoff = this.flying2;
        for (let y = 0; y < this.mapData.length; y++) {
            let xoff = this.flying;
            let row = []
            for (let x = 0; x < this.mapData[y].length; x++) {
                let v = parseInt((perlin.get(xoff, yoff) + groundLayers) * heightLimit);
                if (v <= 0) { v = 1; }
                row[x] = v
                xoff += gridSize / resolution;
            };
            m[y] = row
            yoff += gridSize / resolution;
        };

        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                let base = this.mapData[x][y][0]
                let yy = base.y
                for (let i = 1; i < m[x][y]; i++) {
                    yy -= 25
                    if (x < m.length - 1 && y < m[y].length - 1) {
                        this.mapData[x][y][0].dontRender = true
                    }
                    let el = this[this.action](base.x, yy, "808080A9A9A9909090")

                    if (m[x + 1]) {
                        if (m[x][y + 1]) {
                            if (i < m[x][y + 1] && i < m[x + 1][y] && i < m[x][y] - 1) {
                            } else {
                                this.mapData[x][y].push(el)
                            }
                        } else {
                            this.mapData[x][y].push(el)
                        }
                    } else {
                        this.mapData[x][y].push(el)
                    }
                }
            }
        }
    };
    return this;
};
Chunk.prototype.createFilledPerlinChunk = function (perlin, gridSize, resolution, groundLayers, heightLimit) {
    if (resolution != 0) {
        let yoff = this.flying2;
        for (let y = 0; y < this.mapData.length; y++) {
            let xoff = this.flying;
            for (let x = 0; x < this.mapData[y].length; x++) {
                let v = parseInt((perlin.get(xoff, yoff) + groundLayers) * heightLimit);
                if (v <= 0) { v = 1; }
                let base = this.mapData[x][y][0]
                let yy = base.y
                for (let i = 1; i < v; i++) {
                    yy -= 25
                    this.mapData[x][y][i] = this[this.action](base.x, yy, "808080A9A9A9909090")
                }
                xoff += gridSize / resolution;
            };
            yoff += gridSize / resolution;
        };
    };
}
