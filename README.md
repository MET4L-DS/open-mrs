# OpenMRS Development Environment

This repository is configured for OpenMRS development using the **OpenMRS 3.x Reference Application (Docker)** distribution.

---

## Quick Start

A helper script [`openmrs.ps1`](./openmrs.ps1) is provided for convenience.

### Start the Stack
```powershell
.\openmrs.ps1 start
```

### Check Container Status
```powershell
.\openmrs.ps1 status
```

### Follow Logs
```powershell
# View all logs
.\openmrs.ps1 logs

# Or view a specific service (backend, frontend, gateway, db)
.\openmrs.ps1 logs backend
```

### Open in Browser
```powershell
.\openmrs.ps1 open
```

### Stop or Tear Down
```powershell
# Stop containers (preserves database state)
.\openmrs.ps1 stop

# Or remove containers completely
.\openmrs.ps1 down
```

---

## Endpoints & Credentials

| Service | URL | Description |
| :--- | :--- | :--- |
| **OpenMRS 3 (O3) SPA** | [http://localhost/openmrs/spa](http://localhost/openmrs/spa) | Modern microfrontend user interface |
| **OpenMRS Legacy UI** | [http://localhost/openmrs](http://localhost/openmrs) | Classic administration UI |
| **REST API** | [http://localhost/openmrs/ws/rest/v1](http://localhost/openmrs/ws/rest/v1) | OpenMRS REST web services |
| **FHIR API** | [http://localhost/openmrs/ws/fhir2/R4](http://localhost/openmrs/ws/fhir2/R4) | HL7 FHIR R4 endpoint |

* **Default Username**: `admin`
* **Default Password**: `Admin123`

---

## Architecture

The stack consists of 4 orchestrated Docker services configured in [`openmrs-distro-referenceapplication/docker-compose.yml`](./openmrs-distro-referenceapplication/docker-compose.yml):

1. **`gateway`** (`nginx` on port `80`): Reverse proxy routing `/openmrs/spa` to the frontend and `/openmrs` to the backend.
2. **`frontend`** (`nginx`): Hosts the OpenMRS 3.x microfrontend application (Single-SPA ESM modules).
3. **`backend`** (`tomcat`): OpenMRS Platform / Core running Java 21, Spring, and FHIR modules.
4. **`db`** (`mariadb:10.11.7`): Database container with persistent volume storage.
