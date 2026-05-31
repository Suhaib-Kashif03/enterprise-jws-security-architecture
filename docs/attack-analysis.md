# Attack Analysis

## Overview

This document analyzes the attacks simulated against the enterprise security architecture and evaluates the effectiveness of the implemented defensive controls.

---

# Threat Model

Attacker Location:

Red Team Network

Host:

KALI-RED01

IP Address:

172.16.1.10

Target:

WEB-API-SRV01

IP Address:

10.10.10.10

---

# Attack 1 – Unauthorized Access

## Objective

Access protected resources without authentication.

## Method

Request protected endpoint without a token.

Example:

curl http://10.10.10.10:3000/secure-data

## Expected Outcome

Request denied.

## Observed Outcome

Access denied.

## Security Control

Authorization validation.

## Result

Successful defense.

---

# Attack 2 – Token Tampering

## Objective

Modify token contents and bypass authorization.

## Method

Alter payload or signature portion of a valid JWS token.

Example:

HEADER.PAYLOAD.MODIFIED_SIGNATURE

## Expected Outcome

Token rejected.

## Observed Outcome

Invalid or Tampered Token.

## Security Control

JWS Signature Verification.

## Result

Successful defense.

---

# Attack 3 – Replay Attack

## Objective

Reuse valid token captured from network traffic.

## Method

Capture Authorization header using Wireshark.

Reuse captured token.

## Security Weakness

HTTP transmits bearer tokens in plaintext.

## Expected Outcome

Access granted.

## Observed Outcome

Access granted.

## Security Interpretation

Replay attack succeeded because:

* Token remained valid
* Token was visible over HTTP
* Bearer tokens rely on possession

## Mitigation

HTTPS/TLS

Short token lifetime

Refresh token rotation

Token revocation

---

# Attack 4 – SYN Flood

## Objective

Reduce service availability.

## Method

Generate excessive TCP SYN packets.

Tool:

hping3

Command:

sudo hping3 -S --flood -p 3000 10.10.10.10

## Expected Outcome

Abnormal traffic detected.

## Observed Outcome

FortiGate generated:

tcp_syn_flood

Action:

clear_session

## Security Control

FortiGate Anomaly Detection

FortiGate IPS

## Result

Attack detected and mitigated.

---

# Security Evaluation Summary

| Attack              | Goal                   | Result                 |
| ------------------- | ---------------------- | ---------------------- |
| Unauthorized Access | Bypass Authentication  | Failed                 |
| Token Tampering     | Modify Identity Claims | Failed                 |
| Replay Attack       | Reuse Valid Token      | Successful             |
| SYN Flood           | Reduce Availability    | Detected and Mitigated |

---

# Key Findings

1. JWS provides integrity protection.

2. JWS does not provide confidentiality.

3. HTTPS is required for secure token transport.

4. FortiGate successfully identified abnormal SYN traffic.

5. Network segmentation reduced attack surface.

6. Multiple layers of security provide stronger protection than individual controls.

---

# Security Recommendations

* Enforce HTTPS
* Disable HTTP in production
* Implement token expiration
* Enable token revocation
* Deploy SIEM monitoring
* Maintain firewall segmentation
* Enable IPS and anomaly detection
