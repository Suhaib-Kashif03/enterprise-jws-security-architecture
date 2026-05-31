# Lessons Learned

## Technical Lessons

### JWS Does Not Provide Confidentiality

One of the most important findings was that JWS protects token integrity but does not encrypt token contents.

Although token tampering was successfully detected, Wireshark analysis showed that tokens remained visible when transmitted over HTTP.

---

### HTTPS Is Essential

After implementing TLS encryption, Wireshark no longer displayed:

* Usernames
* Passwords
* Authorization Headers
* JWS Tokens

This demonstrated the importance of HTTPS in token-based authentication systems.

---

### Network Segmentation Reduces Risk

Separating the environment into:

* DMZ
* LAN
* Red Team

greatly improved security visibility and access control.

---

### Firewalls Are More Than Packet Filters

FortiGate was able to:

* Enforce segmentation
* Inspect traffic
* Detect SYN flooding
* Log attack activity
* Apply mitigation actions

---

### Wireshark Is Valuable for Security Validation

Wireshark allowed direct observation of:

* Authentication traffic
* Authorization headers
* TLS handshakes
* SYN flood packets

This provided evidence-based validation of security controls.

---

## Professional Lessons

Security should be viewed as a layered architecture rather than a single technology.

Strong cybersecurity requires:

* Secure Development
* Secure Communication
* Monitoring
* Detection
* Response

working together.

This project demonstrated a complete attack-detection-mitigation lifecycle similar to real-world enterprise environments.