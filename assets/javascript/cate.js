var cate = window.cate || {};

cate.init = function(){
  var autoSave = Lockr.get("autoSave");
  cate.setupAutoSave(autoSave);

  var data = Lockr.get("cateData");
  cate.loadSaved(data);

  cate.bindSave();
  cate.bindAutoSave();
};

cate.setupAutoSave = function(autoSave){
  if(autoSave){
    $("#cate-autosave").addClass("highlight");
    cate.showToast("loading saved text..");
  }
  cate.toggleUnload();
};

cate.loadSaved = function(data){
  if(data.length > 0){
    $("#cate-editable").html(data);
    cate.showToast("saved content loaded..");
  }
};

cate.bindSave = function(){
  $("#cate-save").on("click", function(e){
    cate.saveData();
    cate.showToast("content saved..");
  });
};

cate.saveData = function(){
  var data = $("#cate-editable").html();
  Lockr.set("cateData", data);
};

cate.bindAutoSave = function(){
  $("#cate-autosave").on("click", function(e){
    cate.toggleAutoSave();
    cate.toggleHighlight($("#cate-autosave"), Lockr.get("autoSave"));
    cate.toggleUnload();
    cate.showToast("auto save toggled..");
  });
};

cate.toggleHighlight = function(target, boolean){
  if(boolean){
    target.addClass("highlight");
  }else{
    target.removeClass("highlight");
  }
};

cate.toggleUnload = function(){
  if(Lockr.get("autoSave")){
    $(window).on("unload", function(){
      cate.saveData();
    });
  }else{
    $(window).off("unload");
  }
};

cate.toggleAutoSave = function(){
  if(Lockr.get("autoSave")){
    Lockr.set("autoSave", false);
  }else{
    Lockr.set("autoSave", true);
  }
};

cate.showToast = function(content){
  var container = $("#cate-toast");
  var selector = Math.random().toString(36).replace(/[^a-z]+/g, '');
  var htmlContent = "<span class='toast' id='" + selector +"'>" + content + "</span>";
  var toasts = container.find(".toast");
  if(toasts.length > 0){
    clearInterval(cate.toastInterval);
    toasts.remove();
  }
  container.append(htmlContent);
  cate.toastInterval = setTimeout(function(){
    $("#"+ selector).remove();
  }, 2000);
};


$(function(){
  cate.init();
});
