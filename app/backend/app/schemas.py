# pydanticの使用

from pydantic import BaseModel, EmailStr, validator, field_validator
from typing import ClassVar

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls , value) -> str:
        if(len(value) < 8):
            raise ValueError('Password must be at least 8 characters')
        # 真の値が1つでもあればTrue
        if not any(char.isdigit() for char in value):
            raise ValueError('Password must contain at least one number')
        if not any(char.isupper() for char in value):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(char.islower() for char in value):
            raise ValueError('Password must contain at least one lowercase letter')

        return value
