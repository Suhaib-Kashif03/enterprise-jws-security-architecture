# Wireshark Traffic Analysis

## Overview

Wireshark was used throughout the project to inspect, validate, and compare network traffic generated during authentication, authorization, attack simulation, and HTTPS deployment.

---

# Authentication Analysis

Filter:

http.request.method == "POST"

Observed Packet:

POST /login

Observed Data:

{
"username":"admin",
"password":"admin123"
}

Finding:

Credentials visible in plaintext.

Security Impact:

Credential exposure.

---

# JWS Token Generation Analysis

Observed Response:

HTTP/1.1 200 OK

Observed Data:

{
"token":"eyJ..."
}

Finding:

JWS token transmitted in plaintext.

Security Impact:

Token can be captured.

---

# Authorization Analysis

Filter:

http

Observed Packet:

GET /secure-data

Observed Header:

Authorization: Bearer eyJ...

Finding:

Token visible in transit.

Security Impact:

Replay attack possible.

---

# Unauthorized Access Analysis

Observed Request:

GET /secure-data

Observed Header:

No Authorization Header

Observed Result:

Access denied.

Finding:

Authorization enforcement working correctly.

---

# Token Tampering Analysis

Observed Request:

Authorization: Bearer ModifiedToken

Observed Result:

Invalid or Tampered Token

Finding:

JWS signature validation successful.

---

# SYN Flood Analysis

Filter:

tcp.flags.syn == 1

Observed Behavior:

Large volume of SYN packets.

Source:

172.16.1.10

Destination:

10.10.10.10

Tool:

hping3

Finding:

Traffic pattern consistent with SYN flooding.

---

# HTTPS Analysis

Filter:

tcp.port == 3443

Observed Packets:

TLS Client Hello

TLS Server Hello

Encrypted Application Data

Finding:

Authentication traffic encrypted.

No credentials visible.

No token visible.

No Authorization header visible.

---

# HTTP vs HTTPS Comparison

| Feature                      | HTTP | HTTPS                 |
| ---------------------------- | ---- | --------------------- |
| Username Visible             | Yes  | No                    |
| Password Visible             | Yes  | No                    |
| JWS Token Visible            | Yes  | No                    |
| Authorization Header Visible | Yes  | No                    |
| Replay Risk from Sniffing    | High | Significantly Reduced |
| Encryption                   | No   | Yes                   |

---

# Security Conclusions

1. HTTP exposes sensitive authentication data.

2. Wireshark confirmed that bearer tokens are visible when transmitted over HTTP.

3. JWS protects integrity but not confidentiality.

4. HTTPS successfully encrypted authentication traffic.

5. TLS implementation significantly improved security posture.

6. Packet analysis provided evidence-based validation of security controls.

---

# Final Observation

The combination of Wireshark analysis, JWS authentication, HTTPS encryption, and FortiGate security controls provided a complete demonstration of authentication, authorization, attack simulation, detection, and mitigation within a segmented enterprise architecture.
