#pragma strict

var credits : boolean = false;
var instructions : boolean = false;

function MainWindow() {
	if (GUILayout.Button("Start")) {
		Application.LoadLevel("School Cafeteria");
	}
	if (GUILayout.Button("Instructions")) {
		instructions = true;
	}
	if (GUILayout.Button("Credits")) {
		credits = true;
	}
	if (GUILayout.Button("Exit")) {
		Application.Quit();
	}
}

function CreditWindow() {
	GUILayout.Label("Team");
	GUILayout.Label("Simeon Blimke");
	GUILayout.Label("Eric Lam");
	GUILayout.Label("Steven Luoma");
	GUILayout.Label("Tanvir Sajed");

	if (GUILayout.Button("Back")) {
		credits = false;
	}
}

function InstructionWindow() {
	GUILayout.Label("W A S D - Walking");
	GUILayout.Label("Space - Jump");
	GUILayout.Label("F - Interact");

	if (GUILayout.Button("Back")) {
		instructions = false;
	}
}

function OnGUI() {

	if(!credits && !instructions)
		GUI.Window(0, Rect((Screen.width/2)-100, (Screen.height/2)-100, 200, 200), MainWindow, "Menu");
	else if(credits)
		GUI.Window(0, Rect((Screen.width/2)-100, (Screen.height/2)-100, 200, 200), CreditWindow, "Credits");
	else if(instructions)
		GUI.Window(0, Rect((Screen.width/2)-100, (Screen.height/2)-100, 200, 200), InstructionWindow, "Instructions");

}