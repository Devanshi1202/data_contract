from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from datetime import datetime

from .view_contract import (
    app,  # reuse the FastAPI app if you want to mount endpoints together, or create a new app
    get_db,
    ProducerContract,
    ConsumerContract,
)

# Pydantic models for update requests
class ProducerContractUpdate(BaseModel):
    version: Optional[str] = None
    status: Optional[str] = None
    content: Optional[str] = None

class ConsumerContractUpdate(BaseModel):
    constraints: Optional[str] = None

# Edit Producer Contract
@app.put("/producer_contracts/{contract_id}")
def update_producer_contract(
    contract_id: int,
    contract_update: ProducerContractUpdate,
    db: Session = Depends(get_db)
):
    contract = db.query(ProducerContract).filter(ProducerContract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Producer contract not found")
    for field, value in contract_update.dict(exclude_unset=True).items():
        setattr(contract, field, value)
    db.commit()
    db.refresh(contract)
    return {"message": "Producer contract updated successfully", "contract": contract.id}

# Edit Consumer Contract
@app.put("/consumer_contracts/{contract_id}")
def update_consumer_contract(
    contract_id: int,
    contract_update: ConsumerContractUpdate,
    db: Session = Depends(get_db)
):
    contract = db.query(ConsumerContract).filter(ConsumerContract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Consumer contract not found")
    for field, value in contract_update.dict(exclude_unset=True).items():
        setattr(contract, field, value)
    db.commit()
    db.refresh(contract)
    return {"message": "Consumer contract updated successfully", "contract": contract.id}