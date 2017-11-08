 tinymce.init({
 selector: "textarea#text",
 height: 550,
 theme: 'modern',
 setup: function (editor) {
 editor.on('change', function () {
 editor.save();
 });
 }
 });
