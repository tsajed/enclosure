using UnityEngine;
using System.Collections;
 
public class CameraFacingBillboard : MonoBehaviour
{
    public Camera m_Camera;

    public Transform front;

    public float xRot;

    void Awake() {
    	xRot = gameObject.transform.rotation.eulerAngles.x;
        front = GameObject.Find("PlayerFront").transform;
    }
 
    void Update()
    {
       
		//Vector3 target = new Vector3(m_Camera.transform.position.x, transform.position.y, m_Camera.transform.position.z);
      
    /*
        Vector3 target = new Vector3(front.transform.position.x, transform.position.y, front.transform.position.z);
        transform.LookAt(target);
        transform.rotation = Quaternion.Euler(xRot, transform.rotation.eulerAngles.y, transform.rotation.eulerAngles.z);
    */

        float distance = Vector3.Distance(transform.position, front.position);

        if(distance < 5.0f && distance > 1.0f) {               
            // Look at and dampen the rotation
            Quaternion rotation = Quaternion.LookRotation(front.position - transform.position);
            
            // Keep the old x rotation so that object does not look up
            rotation.eulerAngles = new Vector3(xRot, rotation.eulerAngles.y, rotation.eulerAngles.z);
            
            // Smoothly rotate the object to look at the target
            transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * 6.0f);
        }   

    }
}