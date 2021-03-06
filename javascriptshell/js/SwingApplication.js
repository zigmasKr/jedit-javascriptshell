/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/*
 * SwingApplication.js - a translation into JavaScript of
 * SwingApplication.java, a java.sun.com Swing example.
 *
 * @author Roger E Critchlow, Jr.
 */

/*
* The script is adapted to the Nashorn (JavaScript engine) by
* Zigmantas Kryzius, e-mail: zigmas.kr@gmail.com
* 2018
*
* Under:
* GNU GENERAL PUBLIC LICENSE
* Version 3, 29 June 2007
* =========================================
* The complete license text can be found on
* https://www.gnu.org/licenses/gpl.html
* https://opensource.org/licenses/GPL-3.0
* =========================================
*/

var imports = new JavaImporter(
	java.awt,
	java.awt.event,
	javax.swing
	);

with (imports) {

	function createComponents() {
		// Creates the top-level container.
		var pane = new JPanel();
		label = new JLabel();
		labelPrefix = "Number of button clicks: ";
		numClicks = 0;
		label.setText(labelPrefix.concat(numClicks));
		var button = new JButton("I'm a Swing button!");
		button.setMnemonic(KeyEvent.VK_S);
		/*
		* = This comment is retained from the Rhino version the script =
		* An easy way to put space between a top-level container
		* and its contents is to put the contents in a JPanel
		* that has an "empty" border.
		*/
		pane.setBorder(BorderFactory.createEmptyBorder(
			30, //top
			30, //left
			10, //bottom
			30)); //right
		pane.setLayout(new GridLayout(0, 1));
		pane.add(button);
		pane.add(label);

		/*
		* = This comment is retained from the Rhino version the script =
		* Since Rhino 1.5R5 JS functions can be passed to Java method if
		* corresponding argument type is Java interface with single method
		* or all its methods have the same number of arguments and the
		* corresponding arguments has the same type. See also comments for
		* frame.addWindowListener bellow
		*/

		button.addActionListener(
			// Anonymous action listener:
			function() {
				numClicks = numClicks + 1;
				label.setText(labelPrefix.concat(numClicks));
			});
		//label.setLabelFor(button);  // not needed, actually
		//
		return pane;
	}

	function mainFrame(panel) {
		// Lines with alert(...) can be uncommented if startup.js is run
		// within jEdit, i.e., run as a macro or run via plugin's
		// action "Evaluate buffer".
		// Make the main frame:
		frame = new JFrame("SwingApplication");
		frame.getContentPane().add(panel, BorderLayout.CENTER);
		frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		//
		// Named window listener - an extension of a native Java window adapter
		var WindowAdapter = Java.type('java.awt.event.WindowAdapter');
		var ClosingListenerExt = Java.extend(WindowAdapter,
			{
				windowClosing: function() {
					println("CLOSING?");
					//alert("CONFIRM");
					var choice = JOptionPane.showConfirmDialog(null, "Are you sure?");
					if (choice == JOptionPane.YES_OPTION) {
						//frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
						frame.dispose();
					}
				}
			});
		var ClosingListenerExtInstance = new ClosingListenerExt();
		//alert(ClosingListenerExtInstance);
		//
		frame.addWindowListener(ClosingListenerExtInstance);
		frame.pack();
		frame.setVisible(true);
	}

	//alert(UIManager);
	//alert(UIManager.getCrossPlatformLookAndFeelClassName());
	try {
		UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
	} catch (e) { }

	mainFrame(createComponents());

}
