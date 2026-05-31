# Architecture Overview

## Project Summary

This project implements an enterprise-style cybersecurity architecture using:

* EVE-NG
* FortiGate Firewall
* Node.js Web Application
* JSON Web Signature (JWS)
* Wireshark
* Kali Linux
* HTTPS/TLS

The objective is to demonstrate authentication, authorization, attack simulation, traffic analysis, intrusion prevention, and network segmentation.

---

## Security Zones

### DMZ

Hosts:

* WEB-API-SRV01

Purpose:

Public-facing application hosting.

---

### Internal LAN

Hosts:

* SOC-CLIENT01

Purpose:

Legitimate user access and monitoring.

---

### Red Team Network

Hosts:

* KALI-RED01

Purpose:

Attack simulation and security testing.

---

### Management Network

Hosts:

* FortiGate Management Interface

Purpose:

Administrative access.

---

## Security Controls

### Application Layer

* JWS Authentication
* Token Validation
* Authorization Enforcement

### Transport Layer

* HTTPS/TLS Encryption

### Network Layer

* FortiGate Firewall Policies
* IPS
* SYN Flood Detection
* Network Segmentation

### Monitoring Layer

* Wireshark Packet Analysis
* FortiGate Security Logs

---

## Threats Evaluated

* Unauthorized Access
* Token Tampering
* Replay Attack Exposure
* SYN Flood Attack

---

## Security Outcomes

* Tampered Tokens Rejected
* Unauthorized Requests Denied
* Replay Attack Risk Demonstrated
* HTTPS Encryption Validated
* SYN Flood Detected by FortiGate
* Segmentation Successfully Enforced
