from fastapi import FastAPI, HTTPException  # Import FastAPI application and HTTP exception helper
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware for cross-origin requests
from pathlib import Path  # Import Path to work with filesystem paths
import pickle  # Import pickle for loading serialized movie metadata
import joblib  # Import joblib for loading the similarity matrix

BASE_DIR = Path(__file__).resolve().parent  # Determine the directory containing this script

# Load the movies data
with open(BASE_DIR / "movies.pkl", "rb") as m:
    movies = pickle.load(m)  # Deserialize movie metadata into memory

# Load the similarity matrix
similarity = joblib.load(BASE_DIR / "similarities.joblib")  # Load precomputed similarity scores from disk

app = FastAPI(title="Movie Recommendation API")  # Create the FastAPI application instance

app.add_middleware(
    CORSMiddleware,  # Apply CORS middleware to the app
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,  # Allow cookies and credentials in cross-origin requests
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

def get_recommendations(movie_name: str):  # Recommend movies based on a title lookup
    movie_name = movie_name.strip()  # Trim whitespace from the request value

    if not movie_name:  # Validate input is not empty
        raise HTTPException(status_code=400, detail="movie_name is required")

    movie_mask = movies["title"].str.lower() == movie_name.lower()  # Perform a case-insensitive title match

    if not movie_mask.any():  # If the movie does not exist, respond with a 404
        raise HTTPException(status_code=404, detail="Movie not found")

    movie_index = movies.index[movie_mask][0]  # Find the movie index in the dataset
    recommendations = similarity[movie_index]  # Get similarity scores for that movie

    top_movies = sorted(
        list(enumerate(recommendations)),  # Pair each score with its movie index
        reverse=True,  # Sort so highest scores appear first
        key=lambda x: x[1]  # Use similarity score as sorting key
    )[1:80]  # Exclude the movie itself and take the next 5 top matches

    recommended_movies = [movies.iloc[i[0]].to_dict() for i in top_movies]  # Convert matched movie rows to dictionaries
    return recommended_movies  # Return the final recommendation list


@app.get("/movies")
def get_movies():
    return {"movies": movies.to_dict(orient="records")}

@app.get("/recommend")
def recommend_movie(movie_name: str):
    return {
        "movie_name": movie_name,
        "recommendations": get_recommendations(movie_name)
    }