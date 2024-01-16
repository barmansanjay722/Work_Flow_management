$(document).on("click", ".sidebar-mini-btn ", function () {
  $(".sidebar").toggleClass("open");
  $("#kt_wrapper").toggleClass("show");
  if ($(window).width() < 1023) {
    $(".sidebar").removeClass("sidebar-mini");
  }
});
$(document).on("click", ".btn-right a", function () {
  $(".rightbar").toggleClass("open");
});
$(document).on("click", ".sidebar-mini-btn", function () {
  $(".sidebar").toggleClass("sidebar-mini");
  $(".wrapper").toggleClass("hide-padding");
});
$(document).on("click", ".hamburger-icon", function () {
  $(this).toggleClass("active");
  if ($(window).width() < 1024) {
    $(".sidebar").toggleClass("sidebar-mini");
  }
});
// $(document).on("click",".hamburger-icon ",function () {
//     if ($(window).width() < 1023) {
//         $(".sidebar").addClass("sidebar-show");
//     }
// })

$(document).on("click", ".hamburger-icon ", function () {
  if ($(window).width() < 640) {
    $("#sidenav-overlay").toggleClass("show");
  }
});

$(document).on("click", ".sidebar-title ", function () {
  if ($(window).width() < 640) {
    $(".sidebar").removeClass("open");
    $("#sidenav-overlay").removeClass("show");
  }
});
$(document).on("click", ".sidebar .menu-list .m-link ", function () {
  if ($(window).width() < 640) {
    $(".sidebar").removeClass("open");
    $("#sidenav-overlay").removeClass("show");
  }
});
$(document).on("click", "#sidenav-overlay ", function () {
  if ($(window).width() < 640) {
    $(".sidebar").removeClass("open");
    $("#sidenav-overlay").removeClass("show");
  }
});
$(document).on("click", ".hamburger-icon", function () {
  setTimeout(function () {
    if ($(window).width() < 1023 && $(window).width() > 480) {
      $(".sidebar").removeClass("sidebar-mini");
      $(".sidebar-mini-btn").toggleClass("show");
    }
  }, 1);
});
// timer
/* initialization of different variables 
to be used in Count-Up App*/
let seconds = 0,
  minutes = 0,
  hours = 0;
let secs, mins, gethours;

function startWatch() {
  /* check if seconds is equal to 60 and add a +1 
    to minutes, and set seconds to 0 */
  if (seconds === 60) {
    seconds = 0;
    minutes = minutes + 1;
  }

  /* i used the javascript tenary operator to format 
    how the minutes should look and add 0 to minutes if 
    less than 10 */
  //   mins = minutes < 10 ? "0" + minutes + ": " : minutes + ": ";
  mins = minutes < 10 ? "0" + minutes : minutes;
  /* check if minutes is equal to 60 and add a +1 
    to hours set minutes to 0 */
  if (minutes === 60) {
    minutes = 0;
    hours = hours + 1;
  }
  /* i used the javascript tenary operator to format 
    how the hours should look and add 0 to hours if less than 10 */
  //   gethours = hours < 10 ? "0" + hours + ": " : hours + ": ";
  gethours = hours < 10 ? "0" + hours : hours;
  //   secs = seconds < 10 ? "0" + seconds : seconds;
  secs = seconds < 10 ? "0" + seconds : seconds;

  let continueButton = document.getElementById("continue");
  continueButton.removeAttribute("hidden");

  /* display the Count-Up Timer */
  let x = document.getElementById("timer");
  x.innerHTML = "<span>" + gethours + "</span>" + " : " + "<span>" + mins + "</span>" + " : " + "<span>" + secs + "</span>";

  /* call the seconds counter after displaying the Count-Up 
    and increment seconds by +1 to keep it counting */
  seconds++;

  /* call the setTimeout( ) to keep the Count-Up alive ! */
  setTimeout("startWatch()", 1000);
}

//create a function to start the Count-Up
function startTime() {
  /* check if seconds, minutes, and hours are equal to zero 
    and start the Count-Up */
  if (seconds === 0 && minutes === 0 && hours === 0) {
    /* hide the fulltime when the Count-Up is running */
    let fulltime = document.getElementById("fulltime");
    fulltime.style.display = "none";
    let showStart = document.getElementById("start");
    showStart.style.display = "none";

    /* call the startWatch( ) function to execute the Count-Up 
        whenever the startTime( ) is triggered */
    startWatch();
  }
}

// active menu
$(function ($) {
  let path = window.location.href;
  // because the 'href' property of the DOM element is the absolute path
  $("ul.menu-list a").each(function () {
    if (this.href === path) {
      $(this).parent().siblings().children(".m-link").removeClass("active");
      $(this).addClass("active");
    }
  });
});

// location
let row = 1;
$(document).on("click", "#add-row", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#location").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#location").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// process
row = 1;
$(document).on("click", "#add-row1", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#process").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#process").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// designation
row = 1;
$(document).on("click", "#add-row2", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#designation").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#designation").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// clients
row = 1;
$(document).on("click", "#add-row3", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#clients").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#clients").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// Dispositions
row = 1;
$(document).on("click", "#add-row4", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#dispositions").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#dispositions").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// Specialities
row = 1;
$(document).on("click", "#add-row5", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row = '<div class="applicant-fileds mt-5"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control mw-100 w-85" name="product_option_value" placeholder="" />' + '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#specialities").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#specialities").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});

// allocate volume
row = 1;
$(document).on("click", "#add-allocate-volume", function () {
  if (row < 1000) {
    row = row + 1;
    let new_row =
      '<div class="applicant-fields"><div class="form-group"><div data-repeater-list="kt_ecommerce_add_product_options" class="d-flex flex-column gap-3"><div data-repeater-item="" class="form-group d-flex flex-wrap align-items-center gap-5"><input type="text" class="form-control w-50 w-md-100px mt-6" name="product_option_value" placeholder="From" />' +
      '<input type="text" class="form-control mt-6 w-50 w-md-100px" name="product_option_value" placeholder="To" />' +
      '<div class="w-100 w-md-150px"><select class="form-select mt-6"  data-control="select2" data-hide-search="true" data-placeholder="Assign to" name="" id=""><option value="Assign to">Assign to</option><option value="Anjali Sharma">Anjali Sharma</option><option value="Adilakshmi Peteti"><img alt="Pic" src="../assets/media/avatars/300-4.jpg" />Adilakshmi Peteti</option><option value="Shruti Swapnil Poyrekar">Shruti Swapnil Poyrekar</option><option value="Pavan Sharma">Pavan Sharma</option></select></div>' +
      '<button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row mt-6"><i class="fas fa-times"></i></button></div></div></div>	</div>';
    $("#allocate-volume").append(new_row);
  } else {
    return false;
  }
});

// Remove criterion
$("#allocate-volume").on("click", ".delete-row", function () {
  $(this).closest(".applicant-fileds").remove();
});
