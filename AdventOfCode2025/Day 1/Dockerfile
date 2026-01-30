FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Day 1 directory contents
COPY . /app

# Set PYTHONPATH so imports work correctly
ENV PYTHONPATH=/app

# Default command runs tests
CMD ["pytest", "tests/", "-v"]

