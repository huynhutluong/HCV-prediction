from pydantic import BaseModel


class PatientModel(BaseModel):
    # Define fields for your input data
    Age: int
    ALB: float
    ALP: float
    ALT: float
    AST: float
    BIL: float
    CHE: float
    CHOL: float
    CREA: float
    GGT: float
    PROT: float
    isMale: bool