/* variables */
const form = document.getElementById("clr-form")
const clrBoxes = document.querySelector(".clr-boxes")
const colorInput = document.getElementById("color-input")
const schemeInput = document.getElementById("scheme-options")
const toggleBtn = document.querySelector(".toggle-theme")

/* rendering html function */

function renderHtml(data) {
    data.colors.forEach(color => {
        clrBoxes.innerHTML +=
        `<div class="clr-result">
            <div class="clr-box" style="background:${color.hex.value}"></div>
            <p class="clr-text flex-center">${color.hex.value}</p>
        </div>`
    })
}

/* requesting data from the API */
fetch("https://www.thecolorapi.com/scheme?hex=FF0&mode=monochrome&count=5")
    .then(res => res.json())
    .then(data => {
        renderHtml(data)
    })

/* submiting colors */ 

form.addEventListener("submit", e => {
    e.preventDefault()

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput.value.replace("#", "")}&mode=${schemeInput.value}&count=5`)
        .then(res => res.json())
        .then(data => {
            /* resetting the html */
            clrBoxes.innerHTML = ""

            renderHtml(data)
        })
})

/* toggle btn functionality */

toggleBtn.addEventListener("click", () => {
    
    /* toggling theme icon */
    if (toggleBtn.innerHTML === '<i class="fa-solid fa-sun"></i>') {
        toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>'
    }

    /* changing theme */
    document.body.classList.toggle("dark-mode")

    toggleBtn.classList.toggle("slide")
})