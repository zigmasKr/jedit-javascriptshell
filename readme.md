
# jedit-javascriptshell

<h1>JavaScriptShell plugin, version 0.5.1</h1>

<h2>Overview</h2>
<p>The JavaScriptShell plugin adds to jEdit a new script handler so you can
write macros and startup scripts in JavaScript (Nashorn). It also adds a JavaScript
(scripting) shell to the console interface provided by the Console Plugin.
A feature of JavaScriptShell is that it uses the built in Javascript engine provided by Java 1.8 and later.
No external libraries are required.</p>

<h2>Installation of the plugin</h2>
<p>From the file JavaScriptShell.jar extract copies of files startup.js and SwingApplication.js.
Put the file JavaScriptShell.jar into the jEdit's plugin folder, put the file startup.js into the
startup folder, put the file SwingApplication.js into the folder macros/js. Then restart jEdit.</p>

<h2>Macros and jEdit Plugins in Nashorn</h2>
<p>Nashorn scripts placed in the jEdit's home subfolder ``macros`` become macros. It is even better to place
the macros written in Nashorn in the subfolder ``macros/js``.
Global variables, listed in the plugin's help, allow to operate on jEdit's objects or files (buffers) opened in jEdit.</p>

<p>The methods runScriptInvocable(...) and evaluateScript(...) allow to write jEdit's plugins in
Java + Nashorn where the main functional part can be written in Nashorn. When writing Nashorn script
for a jEdit plugin, one may follow an idea that a function (or an object) in a script returns (evaluates in)
a Java JPanel like object which aferwards is added to the plugins [...]PluginPanel.</p>

<p>The demo macro SwingApplication.js shows how a Swing application may be written in javascript.
This macro is slightly modified as compared to the earlier version (0.4) of the plugin.</p>
