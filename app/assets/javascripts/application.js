// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require bootstrap
//= require bootstrap.min
//= require jquery.fancybox.js
//= require api_help/prettyprint.js
//= require jquery.nicescroll.js
//= require jquery.scrollTo.min.js
//= require jquery.dcjqaccordion.2.7.js
//= require common-scripts.js



var currentTarget = "";
var currentRaw    = "";
function example(name)
{
  currentTarget = $("#output_" + name);
  currentRaw    = $("#raw_" + name);
  currentTarget.html("..loading..");
  var link      = $("#example_" + name).val();
  var method    = $("#method_" + name).text();
  var data      = {};
  if($('.form_'+name).length){
    data = $('.form_'+name).serialize();
  };
  console.log(data);
  var link = $("#link_" + name).html();
  $.ajax({
    type:       method,
    url:        link,
    data:       data,
    processData: true,
    error: function(xhr, ajaxOptions, thrownError) {
      currentTarget.text("Error " + xhr.status + " " + xhr.responseText);
    }
  }).done(function(output){
    console.log("Output = ", output);
    if (typeof(output) == "object")
    {
      var txt = "Received JSON Object:\n<br/>";
      txt = prettyPrint(output);
      currentTarget.html(txt);
     } else {
       currentTarget.text("Raw output: " + output);
     }
  })
}

function exampleWithFile(name)
{
  currentTarget = $("#output_" + name);
  currentRaw = $("#raw_" + name);
  currentRaw.html("..loading..");
  currentTarget.html("..loading..");
  var link = $("#example_" + name).val();
  var method = $("#method_" + name).text();

  $.ajax({
    type:   method,
    url:    link,
    processData: false
  }).done(function(output){
    console.log("Output = ", output);
    if (typeof(output) == "object")
      {
         var txt = "Received JSON Object:\n<br/>";
         txt = prettyPrint(output);
         currentTarget.html(txt);
      } else {
        currentTarget.text("Raw output: " + output);
      }
    }).fail(function(obj, output)
    {
      currentTarget.text("FAILED: " + output);
    })
}

