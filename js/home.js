$(document).ready(() => {
  // Get current user and display welcome message
  let currentUser = localStorage.getItem("current-user");
  $("#greeting-msg").text(`${currentUser}'s todos`);

    // Helper functions
    // get items from local storage
    function getUsers(){
      let todoUsers = JSON.parse(localStorage.getItem("todo-users")) || [];
      return todoUsers
    }

    function updateLocalStorage(){
      localStorage.setItem("todo-users", JSON.stringify(todoUsers));
    }
    function displayCategories(user) {

          user.todoInfo.categories.forEach((cat) => {
            let uniqueId = Math.random().toString(16).slice(2)
             $("#category-list").append(`
         
            <div class="color-div opacity7" data-id = ${uniqueId} style="background-color: ${cat.color};"></div>
         
            <p class="category-name">${cat.category}</p>
            <div class="edit-delete-cat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list edit-delete-tag-menu-icon" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
  </svg>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square edit-tag-icon" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
    
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x delete-tag-icon" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>
            </div>
   
        `)
  
                // add availiable categories to task form
                $("#availiable-categories")
                .append(`<div class="chosen-color flex align-center gap-10">
      <div class="color-div-md" style="background-color: ${cat.color};"></div>
      <p class="category-name-sm">${cat.category}</p>
      </div>`);
          });
          if (user.todoInfo.categories.length !== 0) {
            $("#add-new-task").css("display", "flex");
          } else {
            $("#add-new-task").css("display", "none");
          }
      
    }

    function displayTodos(user) {
            // remove welcome illustration and applied styles
            if (user.todoInfo.todoTasks.length !== 0) {
              $("#getstarted").css("display", "none");
              $("#todo-items").removeClass("justify-center");
              $("#todo-items").css("height", "fit-content");
            } else {
              $("#getstarted").css("display", "flex");
            }
          user.todoInfo.todoTasks.forEach((todo, i) => {
            
            let checkedValue = todo.done ? "checked" : "";
            let applyStrikeThrough = todo.done ? true : false;
            let newCard = $(`<div class="task-card" data-id="${i}">
              <div style="text-align: end;" class="dropdown-edit-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots dropdown-edit-delete-icon" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg>
                <div class="dropdown-edit-delete-list display-none">
                  <div class="edit">Edit..</div>
                  <div class="delete">Delete..</div>
                </div>
              </div>
              <p class="task-title">${todo.title}</p>
              <p class="task-description">${todo.description}</p>
              <div style="text-align: end;">
                <input type="checkbox" name="" class="check-task" ${checkedValue}> <span class="done">Done</span>
              </div>
              <div class="flex gap-10 color-list-chosen">
              </div>
            </div>`);
            todo.colors.forEach((color) => {
              newCard.find(".color-list-chosen").append(`<div class="color-div-md" style="background-color: ${color}"></div>`);
            });
            if (applyStrikeThrough) {
              newCard.find(".task-title").addClass("strike-through");
              newCard.find(".task-description").addClass("strike-through");
            }
            $("#todo-items").append(newCard);
          });
   
    }

   // Get todos from localStorage
  let todoUsers = getUsers();
  todoUsers.forEach((user)=>{
    if (user.fullName === currentUser) {  
      displayCategories(user);
      displayTodos(user);
      
      // create categories
      $("#category-form").on("submit", function (e) {
        e.preventDefault();
        if ($("#category-input").val() === "") {
          $("#cat-error").css("display", "block");
          $("#category-input").addClass("wrong-format");
        } else {
          $("#cat-error").css("display", "none");
          $("#category-input").removeClass("wrong-format");
    
          let category = $("#category-input").val();
          let color = $("#color-picker").val();
          user.todoInfo.categories.push({ category: category, color: color });
          updateLocalStorage()            
          $("#category-form")[0].reset();
          $("#add-new-task").css("display", "flex");
        }
        location.reload(true);
      });
    
      // open tasks
      $("#add-new-task").click(function () {
        $("#add-tasks").css('display', 'flex');
        $("#task-title").removeClass("wrong-format");
        $("#task-details").removeClass("wrong-format");
        $("#add-task-error").css("display", "none");
        $(".chosen-color").removeClass("chosen-tag");
      });
    
      // filter by categories
      $(document).on("click", ".color-div", function () {
        $(this).next().toggleClass("font-weight");
        let color = $(this).css("background-color");
             user.todoInfo.todoTasks.forEach((todo, i) => {
              if (!todo.colors.includes(color)) {
                $(`[data-id=${i}]`).toggle();
              }
            });
      
    
        $(this).next().siblings().toggleClass("opacity");
      });
    
      // close category modal
      $("#close").on("click", function () {
        $("#add-categories").hide();
      });
    
      // open category modal
      $("#open-cat").click(function () {
        $("#add-categories").css('display', 'flex');
        $("#cat-error").css("display", "none");
        $("#category-input").removeClass("wrong-format");
      });
    
      // close task modal
      $("#close-task").on("click", function () {
        $("#add-tasks").hide();
      });
    

      $("#task-form").on("submit", function (e) {
        e.preventDefault();
        if ($("#task-title").val() === "" && $("#task-details").val() === "") {
          $("#task-title").addClass("wrong-format");
          $("#task-details").addClass("wrong-format");
          $("#add-task-error").text("Empty fields");
          $("#add-task-error").css("display", "block");
        } else if ($("#task-title").val() === "") {
          $("#task-title").addClass("wrong-format");
          $("#task-details").removeClass("wrong-format");
          $("#add-task-error").text("Enter a title");
          $("#add-task-error").css("display", "block");
        } else if ($("#task-details").val() === "") {
          $("#task-details").addClass("wrong-format");
          $("#task-title").removeClass("wrong-format");
          $("#add-task-error").text("Enter a Description");
          $("#add-task-error").css("display", "block");
        } else {
          $("#task-title").removeClass("wrong-format");
          $("#task-details").removeClass("wrong-format");
    
          let taskTitle = $("#task-title").val();
          let taskDescription = $("#task-details").val();
          let chosenColorsTask = [];
          $("#task-form").find(".chosen-tag").find(".color-div-md").each((index, element) => {
            let catColor = $(element).css("background-color");
            chosenColorsTask.push(catColor);
          });
    
          $("#task-form")[0].reset();
          $("#add-tasks").hide();

              user.todoInfo.todoTasks.push({
                title: taskTitle,
                description: taskDescription,
                colors: chosenColorsTask,
                done: false,
              });
              updateLocalStorage()
              $('#todo-items').empty()  
              // location.reload(true)      
        }
       
      });
    
      // add chosen tag style
      $(document).on("click", ".chosen-color", function () {
        $(this).toggleClass("chosen-tag");
      });
    
      // hide and show edit and delete drop down
      $(document).on("click", ".dropdown-edit-delete-icon", function () {
        $(this).next().toggle();
      });
    
      // delete tasks
      $(document).on("click", ".delete", function () {
        let id = $(this).parent().parent().parent().data("id");
            user.todoInfo.todoTasks.splice(id, 1);
           updateLocalStorage()
            location.reload(true);
      });
    
      // edit tasks
      $(document).on("click", ".edit", function () {
        $("#add-tasks").css('display', 'flex');
        $("#list-of-tags").css("display", "none");
        let id = $(this).parent().parent().parent().data("id");
            
            let todoTasks =  user.todoInfo.todoTasks
            let todo = user.todoInfo.todoTasks[id];
            let todoColors = user.todoInfo.todoTasks[id].colors;
            
            $("#task-title").val(todo.title);
            $("#task-details").val(todo.description);


            $("#task-form").submit(function (e) {
              e.preventDefault();
              let title = $("#task-title").val();
              let description = $("#task-details").val();
              todoTasks[id] = {
                title: title,
                description: description,
                done: false,
                colors: todoColors,
              }
              user.todoInfo.todoTasks = todoTasks
              updateLocalStorage()
              // location.reload(true);
            });
        
      });
    
      // mark task as done
      $(document).on("click", ".check-task", function () {
        let id = $(this).closest(".task-card").data("id");

            let todo = user.todoInfo.todoTasks[id];
            todo.done = this.checked;
            updateLocalStorage()
            $('#todo-items').empty()
                
        location.reload(true)
      });
    
      // hide all finished tasks
      $(document).on("click", "#done-tasks", function () {
        $(".task-card").each(function () {
          if ($(this).find(".check-task").is(":checked")) {
            $(this).toggleClass("display-none");
          }
        });
      });
    
      //others
       // show edit and delete tag options
       $(document).on("click", ".edit-delete-tag-menu-icon", function () {
        $(this).siblings().toggle("fast");
      });
    
      // dropdown menu for responsiveness
      $("#category-menu").click(function () {
        $("#categories").toggle("slow");
      });
      // remove edit and delete task button once document is clicked
      $(document).click(function (e) {
        if (e.target.classList.contains("dropdown-edit-delete-icon") === false) {
          $(".dropdown-edit-delete-list").addClass("display-none");
        }
      });
    
    // open delete tag modal
  $(document).on("click", ".delete-tag-icon", function () {
    $(this).css("display", "none");
    $(this).prev().css("display", "none");
    let chosenID = $(this).parent().prev().prev().data("id");
    let selectedTag = $(this).parent().prev().text();
    let selectedColor = $(this).parent().prev().prev().css("background-color");
 
        // console.log(data);
        console.log(user.todoInfo.todoTasks.colors)
        if (user.todoInfo.todoTasks.colors.length > 0) {
          $("#delete-task").css("display", "flex");
          $("#delete-task-details-info").html(`
            <div id="error-delete-cat">
            <p class = "mb-30">Error</p>
            <p>Unable to delete <span id="delete-task-title">${selectedTag}.</span></p>
            <p>Please remove tasks already assigned to this tag.</p>
            </div>
            
            `);
        } else {
          $("#delete-categories").css("display", "flex");
          $("#delete-tag").text(selectedTag);
          $("#delete-tag-color").css("background-color", selectedColor);
          // delete a tag
          $("#delete-category-form").on("submit", function (e) {
            e.preventDefault();
         console.log('delete item')
            $("#delete-categories").hide();
          });
        }
   
  });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      $("#logout-btn").click(() => {
        window.location.href = "index.html";
      });
      }
    
  })


});
