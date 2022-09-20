function ButtonPicOptions() {
    this.container = document.createElement("div");
    this.container.id = "buttonPicOptions"
    document.body.appendChild(this.container)
}
ButtonPicOptions.prototype.addPicOption = function (event,id, src, src2) {
    let button = document.createElement("button");
    button.className = "picButton"
    let img = new Image();
    img.style.width = "50px"
    img.style.height = "50px"
    img.src = img.alt = src

    button.addEventListener("click", function () {
        if (src2) {
            if (img.alt == src) {
                img.src = src2
                img.alt = src2
            } else {
                img.src = src
                img.alt = src
            }
        }
        event(button)
    })

    button.appendChild(img)
    button.id = id
    this.container.appendChild(button)
    return this;
}