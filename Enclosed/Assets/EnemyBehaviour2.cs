using UnityEngine;
using System.Collections;

public class EnemyBehaviour2 : MonoBehaviour {

	public Material mat1 = null;
	public Material mat2 = null;
	public ParticleSystem particle = null;

 	GameObject player = null;
	float speed = 4.0f;
	bool touched = false;
	// Use this for initialization
	void Start () {
		player = GameObject.Find("First Person Controller");
	}
	
	// Update is called once per frame
	void Update () {
		if(Vector3.Distance(transform.position, player.transform.position) > 2.0f && touched ) {
			GoTowardPlayer();
		}
		else if(Vector3.Distance(transform.position, player.transform.position) < 1.0f && !touched) {
			touched = true;
			Instantiate(particle, this.transform.position, Quaternion.identity);
			//yield WaitForSeconds(0.1f);
			//sprite.sprite = ;
			MeshRenderer[] mRender = this.GetComponentsInChildren<MeshRenderer>();
			foreach (MeshRenderer mrend in mRender) {
				Debug.Log(mrend.material.name);
				if(mrend.material.name  == "PrisonerFront (Instance)") {
					mrend.material = mat1;
				}
			}
			//Instantiate(particle, this.transform.position, Quaternion.identity);

		}
		else if(Vector3.Distance(transform.position, player.transform.position) < 0.5f ) {
			//change  this.getComponent
		}
		transform.position = new Vector3(transform.position.x, 1, transform.position.z);
	}

	public void GoTowardPlayer() {
		//player = GameObject.Find("First Person Controller");
		transform.position = Vector3.MoveTowards(transform.position, player.transform.position,
		                                         speed * Time.deltaTime);
	}
	
}
