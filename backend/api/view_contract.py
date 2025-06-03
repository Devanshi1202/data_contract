from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# SQLAlchemy models
class Organization(Base):
    __tablename__ = "organization"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    org_name = Column(String(255), nullable=False)
    org_id = Column(Integer, nullable=False)
    is_producer = Column(Boolean, default=False)
    is_consumer = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP)

class ProducerContract(Base):
    __tablename__ = "producer_contracts"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False)
    version = Column(String(50), nullable=False)
    status = Column(Enum('draft', 'in_approval', 'approved', 'rejected'), default='draft')
    content = Column(Text, nullable=False)
    created_by = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP)

class ConsumerContract(Base):
    __tablename__ = "consumer_contracts"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False)
    producer_contract_id = Column(Integer, nullable=False)
    constraints = Column(Text, nullable=False)
    created_by = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP)

class ApprovalRequest(Base):
    __tablename__ = "approval_requests"
    id = Column(Integer, primary_key=True, index=True)
    target_contract_id = Column(Integer, nullable=False)
    proposed_changes = Column(Text, nullable=False)
    status = Column(Enum('pending', 'approved', 'rejected'), default='pending')
    initiator_id = Column(Integer, nullable=False)
    approvers_pending = Column(Text)
    approvers_approved = Column(Text)
    created_at = Column(TIMESTAMP)

# Pydantic models
class OrganizationOut(BaseModel):
    id: int
    name: str
    created_at: Optional[datetime]
    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    org_name: str
    org_id: int
    is_producer: bool
    is_consumer: bool
    is_admin: bool
    created_at: Optional[datetime]
    class Config:
        orm_mode = True

class ProducerContractOut(BaseModel):
    id: int
    org_id: int
    version: str
    status: str
    content: str
    created_by: str
    created_at: Optional[datetime]
    class Config:
        orm_mode = True

class ConsumerContractOut(BaseModel):
    id: int
    org_id: int
    producer_contract_id: int
    constraints: str
    created_by: str
    created_at: Optional[datetime]
    class Config:
        orm_mode = True

class ApprovalRequestOut(BaseModel):
    id: int
    target_contract_id: int
    proposed_changes: str
    status: str
    initiator_id: int
    approvers_pending: Optional[str]
    approvers_approved: Optional[str]
    created_at: Optional[datetime]
    class Config:
        orm_mode = True

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API endpoints
@app.get("/organizations", response_model=List[OrganizationOut])
def read_organizations(db=Depends(get_db)):
    return db.query(Organization).all()

@app.get("/users", response_model=List[UserOut])
def read_users(db=Depends(get_db)):
    return db.query(User).all()

@app.get("/producer_contracts", response_model=List[ProducerContractOut])
def read_producer_contracts(db=Depends(get_db)):
    return db.query(ProducerContract).all()

@app.get("/consumer_contracts", response_model=List[ConsumerContractOut])
def read_consumer_contracts(db=Depends(get_db)):
    return db.query(ConsumerContract).all()

@app.get("/approval_requests", response_model=List[ApprovalRequestOut])
def read_approval_requests(db=Depends(get_db)):
    return db.query(ApprovalRequest).all()