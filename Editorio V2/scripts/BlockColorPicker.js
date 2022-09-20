function BlockColorPicker(menu) {
    this.picker = document.createElement("div")
    this.picker.id = "blockColorWindow"
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d")
    canvas.width = canvas.height = 200
    this.picker.appendChild(canvas)

    let optionHold = document.createElement("div");
    optionHold.id = "container"

    let colorPicker = document.createElement("input")
    colorPicker.id = "colorInput"
    colorPicker.type = "color"

    let cube = new Iso3d(100, 100 + 100, 100, 100).drawCube()
    cube.fillCube(ctx)

    colorPicker.addEventListener("input", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cube.colors = [shadeColor(this.value, -10), shadeColor(this.value, 20), shadeColor(this.value, 10)]
        cube.fillCube(ctx)
    }
    )

    let saveButton = document.createElement("button")
    saveButton.id = "saveButton"
    saveButton.innerHTML = "Save Color"
    saveButton.addEventListener("click", function () {
        menu.saveEl(cube.colors)
    })
    optionHold.appendChild(colorPicker)
    optionHold.appendChild(saveButton)
    this.picker.appendChild(optionHold)

    document.body.appendChild(this.picker)

    function shadeColor(color, percent) {
        let num = parseInt(color.substr(1), 16);
        let amt = Math.round(2.55 * percent);
        let R = (num >> 16) + amt;
        let G = (num >> 8 & 0x00FF) + amt;
        let B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}
BlockColorPicker.prototype.draggable = function () {
    let elmnt = this.picker
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = function (e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = function () {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = function (e) {
            e = e || window.event;
            e.preventDefault();
            let winW = document.documentElement.clientWidth || document.body.clientWidth;
            let winH = document.documentElement.clientHeight || document.body.clientHeight;
            let maxX = winW - elmnt.offsetWidth - 1;
            let maxY = winH - elmnt.offsetHeight - 1;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            if ((elmnt.offsetTop - pos2) <= maxY && (elmnt.offsetTop - pos2) >= 0) {
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            }
            if ((elmnt.offsetLeft - pos1) <= maxX && (elmnt.offsetLeft - pos1) >= 0) {
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        }
    }
    return this;
}