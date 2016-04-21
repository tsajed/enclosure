using UnityEngine;
using System.Collections;

public class BedroomEnding : MonoBehaviour {

	GameObject player;
	float timer  = 0.0f;
	public Material wall1mat = null;
	public Material wall2mat = null;
	public Material wall3mat = null;
	public Material wall4mat = null;
	public Material floormat = null;
	public ParticleSystem particle = null;
	private Rect windowRect ;
	private string message = "… nothing like your own bed after a long day… so comfy…  so warm";
	private bool once = false;
	// Use this for initialization
	void Start () {
		player = GameObject.Find("First Person Controller");
		//player.GetComponent<FPSInputController>().enabled = false;
		//player.GetComponent<MouseLook>().enabled = false;
		//GameObject.Find("Main Camera").GetComponent<MouseLook>().enabled = false;
		windowRect = new Rect (0, Screen.height - 50, Screen.width, 50);
	}
	
	// Update is called once per frame
	void Update () {
		Debug.Log ("yes");
		timer = timer + Time.deltaTime;

		if(timer >= 4.0f && !once) {
			GameObject wall1 = GameObject.Find("Wall 1");
			GameObject wall2 = GameObject.Find ("Wall 2");
			GameObject wall3 = GameObject.Find("Wall 3");
			GameObject wall4 = GameObject.Find ("Wall 4");
			GameObject floor = GameObject.Find ("Floor");
			//GameObject bedroom = GameObject.Find ("Bedroom");

			Instantiate(particle, wall1.transform.position, Quaternion.identity);
			Instantiate(particle, wall2.transform.position, Quaternion.identity);

			ChangeShape (wall1.GetComponent<MeshRenderer>(), wall1mat);
			ChangeShape (wall2.GetComponent<MeshRenderer>(), wall2mat);
			ChangeShape (wall3.GetComponent<MeshRenderer>(), wall3mat);
			ChangeShape (wall4.GetComponent<MeshRenderer>(), wall4mat);
			ChangeShape (floor.GetComponent<MeshRenderer>(), floormat);

			once = true;
			message = "Is this real?";
		}
		if(timer >= 10.0f) {
			Application.LoadLevel(0);
		}
	}

	void ChangeShape(MeshRenderer mesh, Material mat) {
		mesh.material = mat;
	}
	void OnGUI () {
		
		GUI.Box(windowRect, message);
	}
}
