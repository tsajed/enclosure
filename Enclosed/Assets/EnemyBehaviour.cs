using UnityEngine;
using System.Collections;

public class EnemyBehaviour : MonoBehaviour {

	public Material mat1 = null;
	public Material mat2 = null;
	public Material mat3 = null;
	public Material mat4 = null;

	public ParticleSystem particle = null;
	public FPSInputController fps = null;
	public AudioClip sound = null;
	private AudioSource source = null;

 	GameObject player = null;
 	public Renderer vignet = null;
	float speed = 4.0f;
	bool touched = false;
	// Use this for initialization
	void Start () {
		player = GameObject.Find("First Person Controller");
		fps = player.GetComponent<FPSInputController>();
		source = player.GetComponent<AudioSource>();
		vignet = GameObject.Find("Vignet").renderer;
	}
	
	// Update is called once per frame
	void Update () {

		if(fps.doorFound && fps.jailerFound && !fps.keyFound) {
			if(Vector3.Distance(transform.position, player.transform.position) >= 0.5f && touched
			   && Vector3.Distance(transform.position, player.transform.position) < 3.0f) {
				GoTowardPlayer();
				fps.health = fps.health - 0.5f;
			}
			else if(Vector3.Distance(transform.position, player.transform.position) < 1.0f && !touched
			        && Input.GetKey("f")) {
				touched = true;
				Instantiate(particle, this.transform.position, Quaternion.identity);
				//yield WaitForSeconds(0.1f);
				//sprite.sprite = ;
				MeshRenderer[] mRender = this.GetComponentsInChildren<MeshRenderer>();
				foreach (MeshRenderer mrend in mRender) {
					Debug.Log(mrend.material.name);
					if(mrend.material.name  == "SchoolerFront (Instance)") {
						mrend.material = mat1;
					}
					if(mrend.material.name  == "SchoolerBack (Instance)") {
						mrend.material = mat2;
					}
				}
				if(!source.isPlaying) {
					source.clip = sound;
					source.Play ();
				}
				//Instantiate(particle, this.transform.position, Quaternion.identity);

			}
			else if(Vector3.Distance(transform.position, player.transform.position) > 5.0f && touched) {
				if(fps.health >= 100.0f) {
					touched = false;
					MeshRenderer[] mRender = this.GetComponentsInChildren<MeshRenderer>();
					foreach (MeshRenderer mrend in mRender) {
						Debug.Log(mrend.material.name);
						if(mrend.material.name  == "PrisonerFront (Instance)") {
							mrend.material = mat3;
						}
						if(mrend.material.name  == "PrisonerBack (Instance)") {
							mrend.material = mat4;
						}
					}
				}
				fps.health = fps.health + 0.5f;
			}
			else if(Vector3.Distance(transform.position, player.transform.position) < 0.5f ) {
				//change  this.getComponent
			}
		}
		else if(fps.keyFound) {
			GoTowardPlayer();
			if(Vector3.Distance(transform.position, player.transform.position) > 0.5f
			   && Vector3.Distance(transform.position, player.transform.position) < 3.0f) {
				fps.health = fps.health - 0.1f;

				if(!source.isPlaying) {
					source.clip = sound;
					source.Play ();
				}
			}
			MeshRenderer[] mRender = this.GetComponentsInChildren<MeshRenderer>();
			foreach (MeshRenderer mrend in mRender) {
				Debug.Log(mrend.material.name);
				if(mrend.material.name  == "SchoolerFront (Instance)") {
					mrend.material = mat1;
				}
				if(mrend.material.name  == "SchoolerBack (Instance)") {
					mrend.material = mat2;
				}
			}
		}
		transform.position = new Vector3(transform.position.x, 1, transform.position.z);

		Color color = vignet.material.color;
		color.a = 1.0f - (fps.health/100);
		// Deals with the transparency of the static image
		vignet.material.color = color;
	}

	public void GoTowardPlayer() {
		//player = GameObject.Find("First Person Controller");
		transform.position = Vector3.MoveTowards(transform.position, player.transform.position,
		                                         speed * Time.deltaTime);
	}
	
}
