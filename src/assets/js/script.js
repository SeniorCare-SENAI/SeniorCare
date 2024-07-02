function select(section) {
    for (let i = 1; i < 4; i++) {
        if (i == section) {
            document.getElementById(`section${i}`).style.display = 'block'
        } else {
            document.getElementById(`section${i}`).style.display = 'none'
        }
    }
}

function label() {
    let labeis = document.getElementsByClassName('labeis')

    labeis.style.transform = "translateY(-31px)"
    labeis.style.fontSize = "12px"
    labeis.style.color = "var(--verde-pouco-escuro)"
    labeis.style.backgroundColor = "white"
    labeis.style.borderRadius = "var(--border-radius) var(--border-radius) 0 0"
    labeis.style.border = "var(--verde-escuro) 0.5px solid"
    labeis.style.padding = "0 var(--padding)"
    labeis.style.borderBottom = "0"
}