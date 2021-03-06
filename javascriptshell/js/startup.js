/*
 * ~/.jedit/startup/startup.js
 */

jedit = org.gjt.sp.jedit;
jEdit = jedit.jEdit
Macros = jedit.Macros
JsShell = Java.type('javascriptshell.JavaScriptShell');


//{{{ Dialog functions

function alert(message) {//{{{
	Macros.message(view, message);
}
alert.__docstring__ = "shows a message box to the user";
//}}}

function prompt(question, defaultValue) {//{{{
	return Macros.input(view, question, defaultValue || '');
}
prompt.__docstring__ = "shows a prompt box to the user and returns the answer";
//}}}

function confirm(question) {//{{{
	var op = javax.swing.JOptionPane;
	return Macros.confirm(view, question, op.OK_CANCEL_OPTION) === op.OK_OPTION;
}
confirm.__docstring__ = "shows a confirmation message box to the user";
//}}}

//{{{ openFileDialog function
/**
 * Opens a file dialog box
 *
 * @param curDir current directory [optional]
 * @return a list of absolute paths of files selected
 */
function openFileDialog(curDir) {

	var i,
		files,
		self = openFileDialog
		dialog = self.dialog;

	if (dialog === null) {
		self.dialog = dialog = jedit.browser.VFSFileChooserDialog(view, '', 0, true, false)
	}
	dialog.setVisible(true)
	files = dialog.getBrowser().getSelectedFiles()

	paths = []
	for (var i = 0; i < files.length; i++) {
			paths[i] = files[i].getPath();
	}
	dialog.setVisible(false)
	return paths;
}
openFileDialog.__docstring__ = "show an Open File dialog box";
openFileDialog.dialog = null;
//}}}

//}}}

function help() {//{{{
	var i, o;
	for (i in this) {
		o = this[i];
		if (typeof(o) === "function" && ("__docstring__" in o)) {
			print(i + " - " + o["__docstring__"]);
		}
	}
}
help.__docstring__ = "prints help messages for functions in the current scope";
//}}}

function include(path) {//{{{

	var paths, i;

	if (!path) {
		paths = openFileDialog();
		for (i = 0; i<paths.length; i++) {
			include(paths[i]);
		}
		return;
	}
	if (Macros.getHandler("JavaScriptHandler").accept(path)) {
		Macros.runScript(view, path, false);
	} else {
		throw new Error('Not a JavaScript macro - ' + path);
	}
}
include.__docstring__ = "evaluate a script file in the current scope";
//}}}

//{{{ echo function
/**
 * echo() Prints message to interactive console screen
 *
 * @param message message to print.
 * @param nl string to print after message [optional, default '\n']
 */
function echo(message, nl) {
	message = (typeof message == 'undefined')?'':message;
	output.writeAttrs(null,message);
	if (nl === undefined ){ nl = '\n';}
	output.writeAttrs(null, nl);
}
echo.__docstring__ = "prints message to interactive console";
//}}}

var document = {//{{{
	write: function (text) {
		textArea.setSelectedText(text);
	},
	close: function () {
		jEdit.closeBuffer(view, buffer);
	},
	open: function (path) {
		jEdit.openFile(view, path);
	}

	};//}}}

var window = { //{{{
	close: function () {
		jEdit.closeView(view);
	},
	open: function (path) {
		jEdit.openFile(view, path);
	},
	newFile: function() {
		jEdit.newFile(view);
	}
};//}}}

function show(o){//{{{

	for (i in o){
		echo(i + ': ' + o[i]);
	}
show.__docstring__ = "enumerate the contents of an object"
}//}}}

//{{{ Plugin functions

//{{{ classFromName function
/*
 * Get a class given its fully qualified name.
 *
 * This is equivelent to java.langClass.forName(name) but
 * can get the classes from plugins as well.
 *
 * TODO: A more sophisticated class loader
 *
 *  >>> classForName('console.gui.Button')
 *  class console.gui.Button
 */
function classForName(name) {
	// for example, in Java:
	// Class cls = Class.forName("java.lang.ClassLoader");
		try {
					//return classForName.loader.loadClass(name)
					return org.gjt.sp.jedit.JARClassLoader.loadClass(name)
		}
			catch (e) {
				return java.lang.Class.forName(name);
		}
}
//classForName.loader = org.gjt.sp.jedit.JARClassLoader; //();
classForName.__docstring__ = 'get a class from its fully qualified name (plugin classes allowed)'
//}}}

getPlugins = function(){//{{{
	return org.gjt.sp.jedit.jEdit.getPlugins();
};
getPlugins.__docstring__ = "returns a list of jedit.PluginJAR's one for each plugin";
//}}}

showPlugins = function(){//{{{
	var plugs = getPlugins();
	for (var i in plugs){
			print(plugs[i].getClassName());
	}
};
showPlugins.__docstring__ = "Print the names of availiable plugins";
//}}}

//}}}

//{{{ new functions; both print in blue color
function print(message) {//{{{
	JsShell.printConsole(message);
}
//}}}

function println(message) {//{{{
	JsShell.printlnConsole(message);
}
//}}}
//}}}

/* :folding=explicit:collapseFolds=1:tabSize=2:indentSize=2:noTabs=false: */
