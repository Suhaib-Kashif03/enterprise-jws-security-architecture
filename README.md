# Enterprise Security Architecture Using JWS Authentication, FortiGate Security Controls, and Wireshark Traffic Analysis

[![Cybersecurity](https://img.shields.io/badge/Cybersecurity-Project-blue)]()
[![FortiGate](https://img.shields.io/badge/FortiGate-Firewall-red)]()
[![Wireshark](https://img.shields.io/badge/Wireshark-Traffic%20Analysis-blue)]()
[![Node.js](https://img.shields.io/badge/Node.js-Web%20Application-green)]()
[![HTTPS](https://img.shields.io/badge/HTTPS-TLS%20Enabled-success)]()

---

## Overview

This project presents the design, implementation, and evaluation of a segmented enterprise-style cybersecurity architecture deployed in EVE-NG.

The environment combines application security, network security, attack simulation, traffic analysis, and defensive controls to demonstrate how modern enterprise environments protect web applications against unauthorized access, token manipulation, replay attacks, and denial-of-service attacks.

The project was originally developed to explore Secure HTTP Authentication using JSON Web Signature (JWS) and was later expanded into a complete security engineering lab featuring:

* JWS Authentication and Authorization
* HTTPS/TLS Encryption
* FortiGate Firewall
* Intrusion Prevention System (IPS)
* SYN Flood Detection
* Network Segmentation
* DMZ Architecture
* Wireshark Traffic Analysis
* Kali Linux Attack Simulation
* Security Monitoring and Validation

---

## Project Objectives

The primary objectives of this project were:

* Design a segmented enterprise network architecture.
* Implement JWS-based authentication and authorization.
* Analyze authentication traffic using Wireshark.
* Demonstrate unauthorized access prevention.
* Demonstrate token tampering detection.
* Evaluate replay attack exposure over HTTP.
* Implement HTTPS encryption.
* Simulate a SYN Flood attack.
* Configure FortiGate IPS and anomaly detection.
* Validate attack detection and mitigation.
* Produce professional cybersecurity documentation suitable for GitHub, LinkedIn, CVs, and Master's applications.

---

# Architecture

## Enterprise Security Topology

![Topology](topology/network-topology.png)

The environment consists of five logical security zones:

| Zone          | Purpose                           |
| ------------- | --------------------------------- |
| WAN / Transit | Router-to-FortiGate Connectivity  |
| DMZ           | Public-facing Web Application     |
| Internal LAN  | Legitimate Users / SOC Operations |
| Red Team      | Attack Simulation                 |
| Management    | Administrative Access             |

---

## Network Segmentation

```text
                    Internet
                        |
                        |
                  EDGE-RTR01
                        |
                        |
                 10.10.20.0/24
                        |
                        |
                  FortiGate
               /     |      \
              /      |       \
             /       |        \
          DMZ       LAN      REDTEAM
           |         |          |
           |         |          |
 WEB-API-SRV01   SOC-CLIENT01  KALI-RED01
```

Security segmentation is enforced using FortiGate firewall policies and separate security zones.

---

# Technologies Used

## Infrastructure

* EVE-NG
* Ubuntu Server
* Windows XP SOC Client
* Kali Linux
* Cisco Router
* FortiGate Firewall

## Security Technologies

* JSON Web Signature (JWS)
* HTTPS/TLS
* Wireshark
* FortiGate IPS
* FortiGate Anomaly Detection
* hping3

## Development

* Node.js
* Express.js
* OpenSSL

---

# IP Addressing Plan

| Device            | IP Address      |
| ----------------- | --------------- |
| Edge Router       | 10.10.20.1      |
| FortiGate WAN     | 10.10.20.2      |
| FortiGate LAN     | 192.168.1.1     |
| FortiGate REDTEAM | 172.16.1.1      |
| FortiGate DMZ     | 10.10.10.1      |
| FortiGate MGMT    | 192.168.149.250 |
| WEB-API-SRV01     | 10.10.10.10     |
| SOC-CLIENT01      | 192.168.1.10    |
| KALI-RED01        | 172.16.1.10     |

Detailed addressing information can be found in:

```text
configurations/ip-addressing-plan.txt
```

---

# Security Features Implemented

## Authentication

✔ JWS Token Generation

✔ Login Validation

✔ Protected Endpoints

---

## Authorization

✔ Bearer Token Authentication

✔ Secure API Access

✔ Unauthorized Access Prevention

---

## Integrity Protection

✔ JWS Signature Validation

✔ Token Tampering Detection

---

## Confidentiality Protection

✔ HTTPS/TLS

✔ Encrypted Authentication Traffic

✔ Encrypted Authorization Traffic

---

## Network Security

✔ FortiGate Firewall Policies

✔ Network Segmentation

✔ DMZ Architecture

✔ Least Privilege Access Control

---

## Threat Detection

✔ FortiGate IPS

✔ SYN Flood Detection

✔ Security Event Logging

✔ Traffic Analysis

---

# Authentication Workflow

```text
SOC Client
     |
     | Login
     v
Web Application
     |
     | Validate Credentials
     v
Generate JWS Token
     |
     v
Return Signed Token
     |
     v
Access Protected Resources
```

---

# Security Evaluation

## Test Case 1 — Authentication

### Objective

Generate a valid JWS token.

### Result

Success.

### Evidence

* Dashboard Login
* Wireshark Authentication Capture

---

## Test Case 2 — Authorization

### Objective

Access protected resource using valid token.

### Result

Success.

### Evidence

Authorization header captured in Wireshark.

---

## Test Case 3 — Unauthorized Access

### Objective

Access protected resource without token.

### Result

Denied.

### Evidence

Server rejected request.

---

## Test Case 4 — Token Tampering

### Objective

Modify JWS token.

### Result

Denied.

### Evidence

Invalid or Tampered Token.

---

## Test Case 5 — Replay Attack Analysis

### Objective

Evaluate token exposure.

### Result

Replay attack risk identified.

### Finding

Authorization header visible over HTTP:

```http
Authorization: Bearer eyJ...
```

### Conclusion

JWS protects integrity but not confidentiality.

---

## Test Case 6 — SYN Flood Attack

### Objective

Reduce service availability.

### Tool

hping3

### Command

```bash
sudo hping3 -S --flood -p 3000 10.10.10.10
```

### Result

Attack detected by FortiGate.

---

# Attack Simulation

## Replay Attack

### Procedure

1. Capture token using Wireshark.
2. Extract bearer token.
3. Reuse valid token.
4. Access protected resource.

### Observation

Replay attack possible over HTTP.

### Mitigation

HTTPS/TLS.

---

## SYN Flood Attack

### Source

KALI-RED01

### Target

WEB-API-SRV01

### Tool

hping3

### Observation

Large volume of TCP SYN packets.

### Detection

FortiGate Anomaly Logs:

```text
tcp_syn_flood
```

### Action

```text
clear_session
```

---

# HTTPS Implementation

One of the most important findings from this project was that JWS does not encrypt token contents.

Under HTTP, Wireshark displayed:

* Username
* Password
* Authorization Header
* Bearer Token

After implementing HTTPS:

* Credentials hidden
* Token hidden
* Authorization header hidden

Wireshark only displayed:

```text
TLS Client Hello
TLS Server Hello
Encrypted Application Data
```

This significantly reduced replay attack exposure.

---

# FortiGate Security Controls

## Firewall Policies

Implemented:

* LAN → DMZ
* REDTEAM → DMZ
* LAN → WAN
* DMZ → WAN

No policy exists for:

```text
REDTEAM → LAN
```

This enforces security segmentation.

---

## IPS Configuration

Profile:

```text
Project-IPS
```

Configured For:

* Linux Servers
* HTTP
* TCP
* Medium Severity
* High Severity
* Critical Severity

Action:

```text
Block
```

---

## SYN Flood Detection

FortiGate successfully identified:

```text
tcp_syn_flood
```

Source:

```text
172.16.1.10
```

Action:

```text
clear_session
```

This demonstrated successful attack detection and response.

---

# Wireshark Analysis

Wireshark was used to validate:

* Authentication
* Authorization
* Token Visibility
* Replay Attack Exposure
* HTTPS Encryption
* SYN Flood Traffic

Documentation:

```text
docs/wireshark-analysis.md
```

---

# Key Security Findings

### Finding 1

JWS protects integrity.

### Finding 2

JWS does not provide confidentiality.

### Finding 3

Bearer tokens remain visible over HTTP.

### Finding 4

HTTPS protects credentials and tokens.

### Finding 5

FortiGate successfully detects SYN flood attacks.

### Finding 6

Network segmentation reduces attack surface.

### Finding 7

Security controls are most effective when combined.

---

# Repository Structure

```text
enterprise-jws-security-architecture/
│
├── README.md
│
├── report/
│   ├── Enterprise_JWS_Security_Architecture.pdf
│   └── Enterprise_JWS_Security_Architecture.tex
│
├── topology/
│   └── network-topology.png
│
├── screenshots/
│
├── source-code/
│
├── configurations/
│   ├── fortigate-config.txt
│   ├── firewall-policies.txt
│   ├── ip-addressing-plan.txt
│   └── project-execution-notes.txt
│
└── docs/
    ├── architecture-overview.md
    ├── attack-analysis.md
    ├── wireshark-analysis.md
    └── lessons-learned.md
```

---

# Future Improvements

Potential future enhancements include:

* SIEM Integration (Wazuh / Splunk)
* MFA
* Token Revocation
* Refresh Token Rotation
* NGINX Reverse Proxy
* Cloud Deployment
* Security Monitoring Dashboard
* Automated Incident Response

---

# Conclusion

This project demonstrates a complete cybersecurity lifecycle consisting of:

```text
Design
↓
Implementation
↓
Authentication
↓
Authorization
↓
Traffic Analysis
↓
Attack Simulation
↓
Detection
↓
Mitigation
```

The final architecture successfully combines application security, encrypted communication, network segmentation, intrusion prevention, attack detection, and packet-level analysis into a practical enterprise-style cybersecurity environment.

The project serves as a portfolio demonstration of security engineering principles applicable to SOC operations, network security, cybersecurity research, and enterprise defense architectures.

---

## Author

**Suhaib Kashif**

BS Software Engineering
Information Technology University (ITU), Lahore

Areas of Interest:

* Security Operations (SOC)
* Blue Teaming
* Network Security
* Cloud Security
* Security Engineering
* Governance, Risk & Compliance (GRC)

---

## License

This project is provided for educational, research, and portfolio purposes.