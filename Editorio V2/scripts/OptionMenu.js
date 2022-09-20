function OptionMenu() {
    this.container = document.createElement("select");
    this.container.innerHTML += `<option value="none" selected disabled hidden>Map Settings</option>`
    this.container.id = "optionMenu"
    document.body.appendChild(this.container)
}
OptionMenu.prototype.addOption = function (name, value, event) {
    let options = this.container.options
    let eventOption = new Option(name, value)
    eventOption.event = event
    options[options.length] = eventOption
    let e = this.container
    e.onchange = () => e.options[e.selectedIndex].event();
    return this;
}