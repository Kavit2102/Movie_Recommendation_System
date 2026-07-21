# Movie Recommendation System

A production-oriented movie recommendation platform built with a FastAPI backend and a modern React + TypeScript frontend. The application allows users to search for a movie title and receive related recommendations based on a precomputed similarity model.

## Overview

This project demonstrates a complete end-to-end recommendation experience with:

- A fast and lightweight backend API for serving recommendations
- A polished web interface for searching and exploring movies
- A similarity-based recommendation workflow powered by precomputed artifacts

The system is designed to be easy to run locally while also providing a strong foundation for future production hardening such as authentication, monitoring, caching, containerization, and CI/CD.

## Why This Project Matters

This application showcases a practical AI product pattern:

1. Recommendation data is precomputed and stored efficiently.
2. A backend serves results over a clean REST API.
3. A frontend consumes the API and presents the experience to end users.
4. The architecture can evolve into a robust production deployment with observability and scalability in mind.

## Key Features

- Movie search and recommendation workflow
- Responsive web UI built with React and Vite
- Fast recommendation responses from precomputed similarity data
- Health check endpoint for service monitoring
- CORS-enabled API for browser-based integration
- Structured state management for search and recommendation flows

## Architecture

The project is divided into two main services:

- Backend: FastAPI service in [fast-api/main.py](fast-api/main.py)
  - Loads movie metadata and similarity data
  - Exposes REST endpoints for health, movie listing, and recommendations

- Frontend: React + TypeScript application in [ui-showcase/src/App.tsx](ui-showcase/src/App.tsx)
  - Provides the user interface and recommendation experience
  - Calls the backend over HTTP

## Project Structure

```text
.
├── fast-api/
│   ├── main.py
│   ├── movies.pkl
│   └── similarities.joblib
├── ui-showcase/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── lib/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Tech Stack

### Backend
- Python 3.10+
- FastAPI
- joblib
- pandas

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-inspired component primitives

## Prerequisites

Before running the project locally, ensure the following are installed:

- Python 3.10 or newer
- Node.js 18 or newer
- pnpm or npm
- A terminal with package installation access

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Movie Recommendation System"
```

### 2. Set up the backend

```bash
cd fast-api
python -m venv .venv
source .venv/bin/activate
# On Windows PowerShell:
# .\.venv\Scripts\Activate.ps1
pip install fastapi uvicorn pandas joblib
```

Run the API server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- http://127.0.0.1:8000/health
- http://127.0.0.1:8000/docs

### 3. Set up the frontend

Open a second terminal:

```bash
cd ui-showcase
pnpm install
pnpm dev
```

The web application will be available at:

- http://localhost:5173

## API Reference

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

### List Movies

```http
GET /movies
```

### Get Recommendations

```http
GET /recommend?movie_name=Inception
```

Example response:

```json
{
  "movie_name": "Inception",
  "recommendations": [
    {
      "title": "Interstellar",
      "genre": "Sci-Fi"
    }
  ]
}
```

## Configuration Notes

The current frontend is configured to call the backend at http://127.0.0.1:8000. For a production deployment, this should be moved to environment variables so the API base URL can vary by environment.

## Development Notes

The backend uses precomputed similarity data and serialized movie metadata for fast recommendation responses. The frontend uses React context providers to manage search and recommendation state efficiently.

Recommended production hardening steps include:

- Request timeouts and retry policies
- Structured logging and monitoring
- Rate limiting and request validation
- Authentication and authorization for protected endpoints
- Caching for repeated recommendation queries
- Automated testing and CI/CD pipelines

## Production Readiness Considerations

To evolve this project into a more production-grade service, the following improvements are recommended:

1. Environment-based configuration management
2. Secure deployment behind a reverse proxy or load balancer
3. Containerization with Docker and Docker Compose
4. Database-backed metadata and recommendation pipelines
5. Metrics, tracing, and alerting integration
6. Automated regression tests for backend and frontend

## Contributing

Contributions are welcome. Please follow a standard GitHub workflow:

- Create a feature branch
- Keep changes focused and well documented
- Verify behavior locally before opening a pull request
- Include a clear summary of the change and its impact

## License

No license has been specified for this repository yet. Add an appropriate license before publishing or distributing the project publicly.
