 tinymce.init({
 selector: "textarea#text",
 height: 200,
 theme: 'modern',
 setup: function (editor) {
 editor.on('change', function () {
 editor.save();
 });
 }
 });
