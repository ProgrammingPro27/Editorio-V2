function NoiseControl() {
    this.values = {}
    this.container = document.createElement("div")
    this.container.id = "noiseControlWrapper"
    document.body.appendChild(this.container)
}
NoiseControl.prototype.createComponent = function (id, min, max, value, step, event) {
    let wrapper = document.createElement("div")
    wrapper.className = "noiseControlPart"
    let label = document.createElement("label")
    let input = document.createElement("input")
    input.style.width = "100%"
    input.type = "range"
    input.id = id
    input.min = min
    input.max = max
    input.value = value
    input.step = step
    label.innerHTML = `${input.id}: `
    let values = this.values
    let span = document.createElement("span");
    span.innerHTML = input.value
    values[input.id] = Number(input.value)

    function updateValues() {
        values[input.id] = Number(input.value)
        span.innerHTML = input.value
    }
    input.addEventListener("input", updateValues)
    input.onchange = event
    wrapper.appendChild(label)
    wrapper.appendChild(input)
    wrapper.appendChild(span)
    this.container.appendChild(wrapper)
    return this;
}