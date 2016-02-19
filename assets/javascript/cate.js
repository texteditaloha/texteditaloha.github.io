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
    cate.showToast("Loading saved text");
  }
};

cate.loadSaved = function(data){
  $("#cate-editable").html(data);
};

cate.bindSave = function(){
  $("#cate-save").on("click", function(e){
    var button = $(e.target);

  });
};

cate.showToast = function(){
  // implement;
};
