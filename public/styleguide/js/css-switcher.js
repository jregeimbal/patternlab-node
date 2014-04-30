$(function(){
  $('.sg-nav-css li a').click(function (e){
    e.preventDefault();
    $("iframe").contents().find("link[rel=stylesheet]:eq(1)").attr({href : $(this).attr('data-source')}); 
    return false;
  });
});