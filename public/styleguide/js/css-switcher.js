$(function(){
  console.log($('.sg-nav-css li a').length);
  $('.sg-nav-css li a').click(function (e){
    e.preventDefault();
    console.log($(this).attr('data-source'));
    $("iframe").contents().find("link[rel=stylesheet]:eq(1)").attr({href : $(this).attr('data-source')}); 
    console.log($("iframe").contents().find("link[rel=stylesheet]").length);
    return false;
  });
});