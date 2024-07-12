function select(section) {
    for(let i=1; i<=3;i++){
        if(i == section) {
            document.getElementById(`section${i}`).style.display = 'block'
        }else {
            document.getElementById(`section${i}`).style.display = 'none'
        }
    }
}