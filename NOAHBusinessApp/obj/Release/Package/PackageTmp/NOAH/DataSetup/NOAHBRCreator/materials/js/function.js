let arrow = document.querySelectorAll(".arrow")
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
        const arrowParent = e.currentTarget.parentElement.parentElement
        arrowParent.classList.toggle("show")
    })
}



let sidebar = document.querySelector(".sidebar")
let btnSidebar = document.querySelector(".bx-menu")
console.log(sidebar)
btnSidebar.addEventListener("click", ()=> {
    sidebar.classList.toggle("close")
})