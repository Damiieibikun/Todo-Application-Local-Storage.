$(document).ready(() => {
  const localStorageKey = 'todo-users';

  // Transition styles
  $("#signup").click(function () {
    $("#landingpage").slideUp();
    $("#signup-page").css("z-index", 1);
  });

  $("#login").click(function () {
    $("#landingpage").slideUp();
    $("#login-page").css("z-index", 1);
  });

  $("#login-link").click(function () {
    $("#signup-page").slideUp(function () {
      $("#login-page").css("z-index", 1);
    });
  });

  $("#signup-link").click(function () {
    $("#signup-page").hide();
    $("#login-page").css("z-index", -1);
    $("#signup-page").slideDown();
  });

  // Validate fields
  function validateEmail() {
    let emailValidated = false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if ($("#email").val() !== "") {
      emailRegex.test($("#email").val())
        ? ($("#email").removeClass("wrong-format"), $("#email").siblings().hide(), (emailValidated = true))
        : ($("#email").addClass("wrong-format"), $("#email").siblings().show());
    }
    return emailValidated;
  }

  function validatePassword() {
    let passwordValidated = false;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if ($("#password").val() !== "") {
      passwordRegex.test($("#password").val())
        ? ($("#password").removeClass("wrong-format"), $("#password").siblings().hide(), (passwordValidated = true))
        : ($("#password").addClass("wrong-format"), $("#password").siblings().show());
    }
    return passwordValidated;
  }

  function confirmPassword() {
    let passwordConfirmed = false;
    if ($("#confirm-password").val() !== "") {
      $("#password").val() !== $("#confirm-password").val()
        ? ($("#confirm-password").addClass("wrong-format"), $("#confirm-password").siblings().show())
        : ($("#confirm-password").removeClass("wrong-format"), $("#confirm-password").siblings().hide(), (passwordConfirmed = true));
    }
    return passwordConfirmed;
  }

  function validateEmpty() {
    if ($(this).val() === "") {
      $(this).addClass("wrong-format");
    } else {
      $(this).removeClass("wrong-format");
    }
  }

  function validateAll(e) {
    e.preventDefault();
    let emptyInput = false;
    let numEmptyFields = 0;

    $(this).find("input").each((i, element) => {
      if (element.value === "") {
        $(element).addClass("wrong-format");
        numEmptyFields++;
      } else {
        $(element).removeClass("wrong-format");
      }
    });

    if (numEmptyFields === 0) {
      emptyInput = true;
      $("#empty-field").hide();
    } else {
      emptyInput = false;
      $("#empty-field").show();
    }

    let result = emptyInput && validateEmail() && validatePassword() && confirmPassword();

    if (result) {
      let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      users.push({
        fullName: $("#name").val(),
        userName: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        todoInfo: {
          categories: [],
          todoTasks: [],
        },
      });
      localStorage.setItem(localStorageKey, JSON.stringify(users));

      $("#signup-page").html(`<h1 class='success' style="text-align: center;">Successful</h1>`);
      setTimeout(() => {
        $("#signup-page").slideUp(function () {
          $("#login-page").css("z-index", 1);
        });
      }, 1000);
    } else {
      console.log("Failed Registration");
    }
  }

  function validateLogin(e) {
    e.preventDefault();
    let emptyInput = false;
    let numEmptyFields = 0;

    $(this).find("input").each((i, element) => {
      if (element.value === "") {
        $(element).addClass("wrong-format");
        numEmptyFields++;
      } else {
        $(element).removeClass("wrong-format");
      }
    });

    if (numEmptyFields === 0) {
      emptyInput = true;
      $("#empty-field-login").hide();

      let validatedCredentials = false;
      let enteredUserName = $("#login-username").val();
      let enteredPassword = $("#login-password").val();
      let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

      users.forEach((element) => {
        if (element.userName === enteredUserName && element.password === enteredPassword) {
          validatedCredentials = true;
          $("#login-page").html(`<h1 class='success' style="text-align: center;">Welcome ${element.fullName}</h1>`);
          localStorage.setItem("current-user", element.fullName);
          setTimeout(() => {
            window.location.href = "home.html";
          }, 1000);
        }
      });

      if (!validatedCredentials) {
        console.log("Failed Authentication");
        $("#empty-field-login").show();
        $("#empty-field-login").text("Invalid username or password");
      }
    } else {
      $("#empty-field-login").show();
    }
  }

  $("#name").on("change", validateEmpty);
  $("#username").on("change", validateEmpty);
  $("#email").on("change", validateEmail);
  $("#password").on("change", validatePassword);
  $("#confirm-password").on("input", confirmPassword);
  $("#registration-form").on("submit", validateAll);
  $("#login-form").on("submit", validateLogin);
  $("#login-username").on("change", validateEmpty);
  $("#login-password").on("change", validateEmpty);
});
