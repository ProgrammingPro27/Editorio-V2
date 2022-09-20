function BlockMenu() {
  this.container = document.createElement("div");
  this.container.id = "wrapper"
  this.container.name = "8B4513A0522D6B8E23"
  document.body.appendChild(this.container)
  this.container.addEventListener("click", function (e) {
    if (e.target.nodeName == "CANVAS") {
      e.target.parentElement.name = e.target.id
    };
  });
};
BlockMenu.prototype.saveEl = function (value) {
  let key = value.join("").split("#").join("");
  if (!document.getElementById(key)) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 50;
    ctx.lineWidth = 0.2;
    let cube = new Iso3d(25, 50, 25, 25).drawCube();
    cube.colors = value;
    cube.fillCube(ctx);
    canvas.id = key;
    canvas.style.cursor = "pointer";
    this.container.appendChild(canvas);
  };
  return this;
};