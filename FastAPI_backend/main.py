from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PatientModel.PatientModel import PatientModel
import pickle

# Load the trained model
with open('dectree_HCV_model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# Create a FastAPI app
app = FastAPI()

# Allow all origins (not recommended for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Define an endpoint to make predictions
@app.post("/predict")
def predict(data: PatientModel):
    # Convert input data to a format expected by the model
    input_data = [
        [
            data.Age,
            data.ALB,
            data.ALP,
            data.ALT,
            data.AST,
            data.BIL,
            data.CHE,
            data.CHOL,
            data.CREA,
            data.GGT,
            data.PROT,
            data.isMale
        ]
    ]

    # Make predictions using the loaded model
    prediction = loaded_model.predict(input_data)

    # Return the prediction
    return {"prediction": prediction[0]}


# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
