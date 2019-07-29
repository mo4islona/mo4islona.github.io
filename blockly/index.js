import Blockly from '../../node-blockly/browser';

var editor;
var code = document.getElementById('startBlocks');

function render(element, toolbox, newCode) {
  var dom = code;
  if (editor) {
    editor.removeChangeListener(updateCode);
    if (!newCode) {
      dom = Blockly.Xml.workspaceToDom(editor)
    }
    editor.dispose()
  }
  editor = Blockly.inject(element, {
    toolbox: document.getElementById(toolbox)
  })

  Blockly.Xml.domToWorkspace(dom, editor);

  editor.addChangeListener(updateCode);

  return editor
}

function updateCode() {
  document.getElementById('js').childNodes[0].innerText = Blockly.JavaScript.workspaceToCode(editor)
  document.getElementById('php').childNodes[0].innerText = Blockly.PHP.workspaceToCode(editor)
  document.getElementById('lua').childNodes[0].innerText = Blockly.Lua.workspaceToCode(editor)
  document.getElementById('dart').childNodes[0].innerText = Blockly.Dart.workspaceToCode(editor)
  document.getElementById('python').childNodes[0].innerText = Blockly.Python.workspaceToCode(editor)
  document.getElementById('xml').childNodes[0].innerText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(editor))

  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

editor = render('editor', 'toolbox');

updateCode();

document.getElementById('locale').onchange = (e) => {
  import('node-blockly/lib/i18n/' + e.target.value).then((locale) => {
    Blockly.setLocale(locale);
    render('editor', 'toolbox');
  })
}

$("#locale").select2({
  allowClear: false,
  width: 200,
});

$("#import").click(() => {
  var xml = prompt('Insert xml');

  if (!xml) return;

  try {
    code.innerHTML = xml;

    if (code.childNodes[0].nodeType === 1 && code.childNodes[0].tagName.toLowerCase() === 'xml') {
      code.innerHTML = code.childNodes[0].innerHTML;
    } else {
      code.innerHTML = `
       <block type="text_print" inline="false">
                <value name="TEXT">
                    <block type="text">
                        <field name="TEXT">${code.innerHTML}</field>
                    </block>
                </value>
            </block>`
    }

    render('editor', 'toolbox', true);
  } catch (e) {
    alert('Invalid xml: ' + e.toString())
  }
});