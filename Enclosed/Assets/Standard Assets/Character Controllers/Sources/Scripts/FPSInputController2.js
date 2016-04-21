private var motor : CharacterMotor;
public var health : float;
private var keyFound : int;
private var windowRect : Rect;
private var message : String;
private var timer : float;
public var sound : AudioClip;
private var source : AudioSource;
// Use this for initialization

function Awake () {
	motor = GetComponent(CharacterMotor);
	source = GetComponent(AudioSource);
	keyFound = 0;
	health = 100;
	windowRect = Rect (0, Screen.height - 50, 500, 50);
	message = "yes";
	timer = 0;
}

// Update is called once per frame
function Update () {
	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;

	}
	
	EnemyGameObjects();
	FindKey();
	timer = timer + Time.deltaTime;
	
	if(timer > 3.0f) {
		message = "";
		timer = 0;
	}
	
	if(health < 0) {
			Application.LoadLevel(Application.loadedLevel + 1);
		}
	if(keyFound) {
			//open door
	}
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
	
	
}

function EnemyGameObjects() {
	var enemyArray : GameObject[];
	enemyArray = GameObject.FindGameObjectsWithTag("GameController");
	for (var enemy : GameObject in enemyArray) {
		if(Vector3.Distance(this.transform.position, enemy.transform.position) < 1.0f) {
			health = health - 1;
			
			if(!source.isPlaying) {
				source.clip = sound;
				source.Play();
			}
			
			Debug.Log(health);
		}
	}
}

function FindKey() {
	var key : GameObject;
	key = GameObject.Find("Key");
	//if(Vector3.Distance(this.transform.position, key.transform.position) < 1.0f) {
		//pop up message achieved key
		keyFound = 1;
	//}
}

function OnGUI () {
	
	GUI.Box(windowRect, message);
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
@script RequireComponent (AudioSource)
