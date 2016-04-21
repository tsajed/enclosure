private var motor : CharacterMotor;
public var health : float;
public var windowMat : Material;
public var doorMat : Material;
public var keyMat : Material;
public var cdMat : Material;
public var cdplayerMat : Material;
public var jailerfrontMat : Material;
public var jailerbackMat : Material;
public var particle : ParticleSystem;
public var paperRipping : AudioClip;
public var CdintoPlayer : AudioClip;
public var doorUnlock : AudioClip;
public var CDPlayersound : AudioClip;
public var tensionStinger : AudioClip;
public var Ambience : AudioClip;
public var keyFound = false;
public var jailerFound = false;
public var doorFound = false;
private var windowFound = false;
private var cdFound = false;
private var cdplayerFound = false;
private var windowRect : Rect;
private var message : String;
private var timer : float;
// Use this for initialization

function Awake () {
	motor = GetComponent(CharacterMotor);
	source = GetComponent(AudioSource);

	windowRect = Rect (0, Screen.height - 50, Screen.width, 50);
	message = "The university calls this meatloaf, but I’d  say it’s closer to @&$%" + "\n" +
	"and the broccoli is akin to tree branches. Why is the food here so terrible? … sigh." +
	"Maybe I’ll just go home.";

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
	timer = timer + Time.deltaTime;
	
	if(timer > 10.0f) {
		message = "";
		timer = 0;
	}
	
	if(health < 0) {
		if(Application.loadedLevel == 4)
			Application.LoadLevel(0);
		else
			Application.LoadLevel(Application.loadedLevel + 1);
	}
	if(keyFound) {
			//open door
	}
	
	FindDoor();
	
	if(doorFound) {
		FindJailer();
	}
	FindWindow();
	//FindCD();
	FindCDPlayer();
	FindKey();
	
	if(!doorFound && Input.GetKey("f")) {
		message = "I just want to go home…";
		timer = 0;
	}
	
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
	
	
}

function EnemyGameObjects() {
	var enemyArray : GameObject[];
	enemyArray = GameObject.FindGameObjectsWithTag("GameController");
	/*for (var enemy : GameObject in enemyArray) {
		if(Vector3.Distance(this.transform.position, enemy.transform.position) < 1.0f
			&& Input.GetKey("f")) {
			health = health - 1;
			
			if(source.isPlaying) {	
				source.clip = sound;
				source.Play();
			}
		
			Debug.Log(health);
		}
	}*/
}

function FindKey() {
	if(windowFound) {
	//if(cdplayerFound) {
		var key : GameObject;
		key = GameObject.Find("Key");
		if(key != null) {
			if(Vector3.Distance(this.transform.position, key.transform.position) < 2.0f
				&& Input.GetKey("f") && !keyFound) {
				//pop up message achieved key
				keyFound = true;
				
				var mRender : MeshRenderer;
				mRender = key.GetComponent(MeshRenderer);
				if(mRender.material.name  == "PosterMaterial (Instance)") {
					mRender.material = keyMat;
				}
				Instantiate(particle, this.transform.position, Quaternion.identity);
				var source : AudioSource;
				source = this.GetComponent(AudioSource);
				if(!source.isPlaying) {
					source.clip = paperRipping;
					source.Play();
				}
				
				message = "Huh? This poster has changed…" +
						"There’s a key in here… I wonder if it opens the front door." + "\n" +
						"I guess I should prepare for the worst.";
				  timer = 0;

			}
			if(Vector3.Distance(this.transform.position, key.transform.position) < 4.0f
				 && !keyFound) {
				 
				message = "Hmm? This is an arrest report… it says the person was arrested at 2:36 AM and " + "\n" +
				 "that he had a weapon when he was arrested… wait… it… it has my name on it…" + "\n" +
				  "but I’ve never been arrested. Maybe someone with the same name…";
				timer = 0;	 
			}
		}
	}
}

function FindJailer() {
	var jailer : GameObject;
	jailer = GameObject.Find("PrisonGuard");
	if(jailer != null) {
		if(Vector3.Distance(this.transform.position, jailer.transform.position) < 1.0f
			&& Input.GetKey("f") && !jailerFound) {
			//pop up message achieved key
			jailerFound = true;
			
			var mRender : MeshRenderer[];
			mRender = jailer.GetComponentsInChildren.<MeshRenderer>();
				
			for(mrend in mRender) {
				if(mrend.material.name  == "SchoolTeachBack (Instance)") {
					mrend.material = jailerbackMat;
				}
				if(mrend.material.name  == "SchoolTeachFront (Instance)") {
					mrend.material = jailerfrontMat;
				}
			}
			Instantiate(particle, this.transform.position, Quaternion.identity);
			var source : AudioSource;
			source = this.GetComponent(AudioSource);
			if(!source.isPlaying) {
				source.clip = tensionStinger;
				source.Play();
			}
			
			message = "'Mr. Douglas, why is the front door locked?'" + "\n" +
				"Teacher does not respond. 'Why isn’t he talking?" +
				"'Mr. Douglas?'" + 
				 "Oh god. Oh god. Okay. Ummm ummm ummm. Maybe the window." + "\n" +  
				 "It’s the first floor, so I won’t get hurt. Window, window, window.";
			timer = 0;
		}
	}
}

function FindDoor() {
	var door : GameObject;
	door = GameObject.Find("Door");
	if(door != null) {
		if(Vector3.Distance(this.transform.position, door.transform.position) < 2.0f
			&& Input.GetKey("f") && !doorFound) {
			//pop up message achieved key
			doorFound = true;
			
			var mRender : MeshRenderer;
			mRender = door.GetComponent(MeshRenderer);
			if(mRender.material.name  == "SchoolCafeteriaDoor (Instance)") {
				mRender.material = doorMat;
			}
			Instantiate(particle, this.transform.position, Quaternion.identity);
			var source : AudioSource;
			source = this.GetComponent(AudioSource);
			if(!source.isPlaying) {
				source.clip = tensionStinger;
				source.Play();
			}
			var mainCamera = GameObject.Find("Main Camera");
			var mainSound = mainCamera.GetComponent(AudioSource);
			mainSound.clip = Ambience;
			mainSound.Play();
			
			message = "What the…? Why would the door to the school be locked? Maybe Mr. Douglas knows.";
			timer = 0;

		}
		else if(Vector3.Distance(this.transform.position, door.transform.position) < 1.0f
			&& Input.GetKey("f") && keyFound) {

			source = this.GetComponent(AudioSource);
			if(!source.isPlaying) {
				source.clip = doorUnlock;
				source.Play();
			}
			Application.LoadLevel(1);	
		}
	}
}

function FindCDPlayer() {
	if(windowFound) {
	//if(cdFound) {
		var cdPlayer : GameObject;
		cdPlayer = GameObject.Find("CDPlayer");
		if(cdPlayer != null) {
			if(Vector3.Distance(this.transform.position, cdPlayer.transform.position) < 1.0f
				&& Input.GetKey("f") && !cdplayerFound) {
				//pop up message achieved key
				cdplayerFound = true;
				
				var mRender : MeshRenderer;
				mRender = cdPlayer.GetComponent(MeshRenderer);
				if(mRender.material.name  == "CDPlayerMaterial (Instance)") {
					mRender.material = cdplayerMat;
				}
				Instantiate(particle, this.transform.position, Quaternion.identity);
				
				var source : AudioSource;
				source = this.GetComponent(AudioSource);
				if(!source.isPlaying) {
					source.clip = CDPlayersound;
					source.Play();
				}
				
				message = "Huh? That person… he sounded like me… But I’ve never even had a ticket before.";
				timer = 0;

			}
		}
	}
}

function FindCD() {
	if(windowFound) {
		var cd : GameObject;
		cd = GameObject.Find("CD");
		if(cd != null) {
			if(Vector3.Distance(this.transform.position, cd.transform.position) < 1.0f
				&& Input.GetKey("f") && !cdFound) {
				//pop up message achieved key
				cdFound = true;
				
				var mRender : MeshRenderer;
				mRender = cd.GetComponent(MeshRenderer);
				if(mRender.material.name  == "CDMaterial (Instance)") {
					mRender.material = cdMat;
				}
				Instantiate(particle, this.transform.position, Quaternion.identity);
				var source : AudioSource;
				source = this.GetComponent(AudioSource);
				if(!source.isPlaying) {
					source.clip = CdintoPlayer;
					source.Play();
				}
				
				
			}
		}
	}
}

function FindWindow() {
	if(jailerFound) {
		var window : GameObject;
		window = GameObject.Find("Window");
		if(window != null) {
			if(Vector3.Distance(this.transform.position, window.transform.position) < 2.0f
				&& Input.GetKey("f") && !windowFound) {
				//pop up message achieved key
				windowFound = true;
				
				var mRender : MeshRenderer;
				mRender = window.GetComponent(MeshRenderer);
				if(mRender.material.name  == "SchoolWindow (Instance)") {
					mRender.material = windowMat;
				}
				Instantiate(particle, this.transform.position, Quaternion.identity);
				var source : AudioSource;
				source = this.GetComponent(AudioSource);
				if(!source.isPlaying) {
					source.clip = tensionStinger;
					source.Play();
				}
				
				message = "Bars? Ugh…. my head hurts. Wait, what was that on the floor?" + "\n" +
							"A CD? Wait… I remember seeing a CD player on one of the tables.";
				timer = 0;

			}
		}
	}
}

function OnGUI () {
	
	GUI.Box(windowRect, message);
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
@script RequireComponent (AudioSource)
