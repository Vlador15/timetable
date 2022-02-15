const renderNotes = (data: string): void => {
   
    let modal = <Element>document.querySelector(".modal");
    console.log(modal);
    
    console.log(typeof modal);
    

    if (!modal) {
      modal = document.createElement("div");
      modal.classList.add("modal");
    }
  
    modal.innerHTML = ` 
      <h1 class="modal__title">Заголовок</h1>
  
      <div class="modal__body">
  
      </div> `;
  
    document.querySelector("body").append(modal);
  };
  
  export { renderNotes };